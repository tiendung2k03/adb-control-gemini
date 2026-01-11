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

// Ensure the EXTENSION_PATH is set.
const extensionPath = process.env.EXTENSION_PATH;
if (!extensionPath) {
  console.error('FATAL: EXTENSION_PATH environment variable is not set.');
  process.exit(1);
}

// Initialize the MCP Server.
const server = new McpServer({
  name: 'adb-control-gemini',
  version: '1.4.0', // Final working version
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
  'Lấy trạng thái màn hình hiện tại của thiết bị Android dưới dạng JSON.',
  {},
  () => executeCommandAsTool(`python3 ${utilsPath('get_screen.py')}`)
);

server.tool(
  'execute_action',
  'Thực hiện một hành động trên thiết bị Android.',
  {
    action_json: z.string().describe('Đối tượng JSON mô tả hành động. Ví dụ: `{\"action\":\"tap\", \"coordinates\":[x,y]}`'),
  },
  ({ action_json }) => {
    const encodedJson = Buffer.from(action_json, 'utf8').toString('base64');
    return executeCommandAsTool(`echo '${encodedJson}' | base64 -d | python3 ${utilsPath('execute_action.py')}`);
  }
);

server.tool(
  'check_env',
  'Kiểm tra môi trường ADB và kết nối thiết bị Android.',
  {},
  () => executeCommandAsTool(`python3 ${utilsPath('check_env.py')}`)
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
      const execMatch = prompt.match(/Ví dụ thực thi: (.+)/);
      
      if (!execMatch || !execMatch[1]) continue;

      const commandTemplate = execMatch[1].trim();
      const paramMap = new Map<string, { original: string; clean: string }>();
      const paramRegex = /<([^>]+)>/g;
      let match;

      while ((match = paramRegex.exec(prompt)) !== null) {
        const original = match[1];
        const clean = original.replace('tên param ', '').split(' ')[0].replace(/:/g, '_');
        if (clean) paramMap.set(clean, { original, clean });
      }
      
      const shape: ZodRawShape = {};
      const numberKeywords = ['level', 'port', 'duration', 'limit', 'brightness', 'state', 'pid', 'width', 'height', 'giây', 'ms', 'dpi'];
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
  console.log('Starting MCP Server for ADB Control...');
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log('Server connected and ready.');
}

// Start the server.
startServer();
