/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z, ZodRawShape } from 'zod';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import toml from 'toml';
import { promisify } from 'util';

const execPromise = promisify(exec);

// Ensure the EXTENSION_PATH is set.
const extensionPath = process.env.EXTENSION_PATH;
if (!extensionPath) {
  console.error('FATAL: EXTENSION_PATH environment variable is not set.');
  process.exit(1);
}

// Initialize the MCP Server.
const server = new McpServer({
  name: 'adb-control-gemini',
  version: '0.0.7', // Updated version with adb-mcp integration
});

/**
 * Executes a shell command and wraps the result in a CallToolResult.
 * @param command The shell command to execute.
 * @returns A Promise that resolves to a CallToolResult.
 */
async function executeCommandAsTool(command: string): Promise<CallToolResult> {
  return new Promise((resolve) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        const errorMessage = `Command failed: ${command}\nError: ${error.message}\nStderr: ${stderr}`;
        console.error(errorMessage);
        // On failure, resolve with an error message in the tool output.
        resolve({
          content: [{
            type: 'text',
            text: JSON.stringify({ error: 'CommandExecutionError', message: stderr || error.message }),
          }],
        });
      } else {
        // On success, resolve with the command's output.
        resolve({
          content: [{
            type: 'text',
            text: stdout || stderr || 'Command executed successfully.',
          }],
        });
      }
    });
  });
}

// --- Register Core Python-based Tools ---

const utilsPath = (script: string) => path.join(extensionPath, 'utils', script);

server.tool(
  'get_screen',
  'Get the current screen state of the Android device as JSON.',
  {},
  () => executeCommandAsTool(`python3 ${utilsPath('get_screen.py')}`)
);

server.tool(
  'get_screen_summary',
  'Get a summarized version of the screen state. Faster and uses fewer tokens. Recommended for initial exploration.',
  {},
  () => executeCommandAsTool(`python3 ${utilsPath('get_screen_summary.py')}`)
);

server.tool(
  'execute_action',
  'Execute an action on the Android device.',
  {
    action_json: z.string().describe('JSON object describing the action. Example: `{"action":"tap", "coordinates":[x,y]}`'),
  },
  ({ action_json }) => {
    const encodedJson = Buffer.from(action_json, 'utf8').toString('base64');
    return executeCommandAsTool(`python3 ${utilsPath('execute_action.py')} '${encodedJson}'`);
  }
);

server.tool(
  'check_env',
  'Check the ADB environment and Android device connection.',
  {},
  () => executeCommandAsTool(`python3 ${utilsPath('check_env.py')}`)
);

server.tool(
  'run_ai_script',
  'Execute a Python script for complex ADB logic. Use this for multi-step actions to avoid round-trip latency. Available functions: click(text/id/point), type(text, enter=True), wait(seconds), wait_for(text, timeout), home(), back(), find(text/id).',
  {
    code: z.string().describe('Python code to execute.'),
  },
  ({ code }) => {
    const encodedCode = Buffer.from(code, 'utf8').toString('base64');
    return executeCommandAsTool(`python3 ${utilsPath('run_ai_script.py')} '${encodedCode}'`);
  }
);

server.tool(
  'execute_batch',
  'Execute a sequence of ADB actions in one go. Useful for simple multi-step tasks like filling a form.',
  {
    actions_json: z.string().describe('JSON array of actions. Example: `[{"action":"tap", "coordinates":[100,200]}, {"action":"type", "text":"hello"}]`'),
  },
  ({ actions_json }) => {
    const encodedJson = Buffer.from(actions_json, 'utf8').toString('base64');
    return executeCommandAsTool(`python3 ${utilsPath('execute_batch.py')} '${encodedJson}'`);
  }
);

// --- Register adb-mcp Tools ---

/**
 * Helper to format device argument for ADB commands
 */
function formatDeviceArg(device?: string): string {
  return device ? `-s ${device} ` : '';
}

server.tool(
  'adb_devices',
  'Lists all connected Android devices and emulators with their status and details.',
  {},
  () => executeCommandAsTool('adb devices -l')
);

server.tool(
  'inspect_ui',
  'Captures the complete UI hierarchy of the current screen as an XML document. Essential for UI automation and identifying interactive elements.',
  {
    device: z.string().optional().describe('Optional device ID'),
  },
  async ({ device }) => {
    const deviceArg = formatDeviceArg(device);
    const tempFile = `/tmp/view-${Date.now()}.xml`;
    try {
      await execPromise(`adb ${deviceArg}shell uiautomator dump ${tempFile}`);
      const { stdout } = await execPromise(`adb ${deviceArg}shell cat ${tempFile}`);
      await execPromise(`adb ${deviceArg}shell rm ${tempFile}`);
      return {
        content: [{ type: 'text', text: stdout }],
      };
    } catch (error: any) {
      return {
        content: [{ type: 'text', text: `Error inspecting UI: ${error.message}` }],
      };
    }
  }
);

server.tool(
  'adb_logcat',
  'Retrieves Android system and application logs from a connected device.',
  {
    device: z.string().optional().describe('Optional device ID'),
    lines: z.number().optional().default(50).describe('Number of lines to retrieve'),
    filter: z.string().optional().describe('Optional logcat filter expression'),
  },
  ({ device, lines, filter }) => {
    const deviceArg = formatDeviceArg(device);
    const filterArg = filter ? ` ${filter}` : '';
    return executeCommandAsTool(`adb ${deviceArg}logcat -d -t ${lines}${filterArg}`);
  }
);

// --- Dynamically Register TOML-based Tools ---

try {
  const commandsDir = path.join(extensionPath, 'commands', 'android');
  if (fs.existsSync(commandsDir)) {
    const files = fs.readdirSync(commandsDir);
    for (const file of files) {
      if (path.extname(file) !== '.toml') continue;

      const filePath = path.join(commandsDir, file);
      const tomlContent = fs.readFileSync(filePath, 'utf-8');
      const parsedToml = toml(tomlContent);

      const toolName = path.basename(file, '.toml');
      const description = parsedToml.description || `Tool for ${toolName}`;
      const prompt = parsedToml.prompt || '';
      const execMatch = prompt.match(/Example execution: (.+)/);
      
      if (!execMatch || !execMatch[1]) continue;

      const commandTemplate = execMatch[1].trim();
      const paramMap = new Map<string, { original: string; clean: string }>();
      const paramRegex = /<([^>]+)>/g;
      let match;

      while ((match = paramRegex.exec(prompt)) !== null) {
        const original = match[1];
        const clean = original.replace('param name', '').trim().replace(/\s/g, '_').replace(/:/g, '_');
        if (clean) paramMap.set(clean, { original, clean });
      }
      
      const shape: ZodRawShape = {};
      const numberKeywords = ['level', 'port', 'duration', 'limit', 'brightness', 'state', 'pid', 'width', 'height', 'seconds', 'ms', 'dpi'];
      paramMap.forEach(({ original, clean }) => {
        const isNumber = numberKeywords.some(k => clean.includes(k) || original.includes(k));
        shape[clean] = (isNumber ? z.number() : z.string()).describe(original.replace(/_/g, ' '));
      });

      server.tool(toolName, description, shape, (args: Record<string, string | number>) => {
        let finalCommand = commandTemplate;
        paramMap.forEach(({ original, clean }) => {
          if (clean in args) {
            const value = args[clean];
            finalCommand = finalCommand.split(`<${original}>`).join(String(value));
          }
        });
        
        finalCommand = finalCommand.replace(/<[^>]+>/g, '').trim();
        return executeCommandAsTool(finalCommand);
      });
    }
  }
} catch (e) {
  console.error('Failed during dynamic tool registration:', e);
}


/**
 * Starts the MCP server and connects the transport.
 */
async function startServer() {
  console.error('Starting MCP Server for ADB Control...');
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Server connected and ready.');
}

// Start the server.
startServer();
