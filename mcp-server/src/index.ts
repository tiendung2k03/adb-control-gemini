/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { exec } from 'child_process';
import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
// Import Node.js modules for file system, path manipulation, and TOML parsing
import * as fs from 'fs';
import * as path from 'path';
import * as toml from 'toml';

const server = new McpServer({
  name: 'android-gemini-extension',
  version: '1.0.0', // Version from package.json
});

// Enhanced shell command execution with better error handling
function executeShellCommand(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Command failed: ${command}`);
        console.error(`Error: ${error.message}`);
        // Return a structured error message for the AI to understand
        reject(JSON.stringify({ error: 'CommandExecutionError', message: stderr || error.message }));
        return;
      }
      if (stderr) {
        // Stderr is not always an error, sometimes it's progress or warnings
        console.warn(`Command produced stderr: ${stderr}`);
      }
      // Resolve with stdout, which might be empty for some commands
      resolve(stdout || stderr || 'Command executed successfully.');
    });
  });
}

// Re-purposed the registerPythonTool to be a general command registration function
async function registerCommand(command: string): Promise<CallToolResult> {
  try {
    const output = await executeShellCommand(command);
    return {
      content: [
        {
          type: 'text',
          text: output,
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: typeof error === 'string' ? error : JSON.stringify(error),
        },
      ],
    };
  }
}

// --- Core Python-based Tools ---

// Register get_screen tool
server.tool(
  'get_screen',
  'Lấy trạng thái màn hình hiện tại của thiết bị Android dưới dạng JSON.',
  z.object({}).shape,
  () => registerCommand(`python ${process.env.EXTENSION_PATH}/utils/get_screen.py`)
);

// Register execute_action tool
server.tool(
  'execute_action',
  'Thực hiện một hành động trên thiết bị Android (tap, type, swipe, v.v.) dựa trên đối tượng JSON.',
  z.object({
    action_json: z.string().describe('Đối tượng JSON mô tả hành động cần thực hiện, ví dụ: `{\"action\":\"tap\", \"coordinates\":[x,y], \"reason\":...}`'),
  }).shape,
  ({ action_json }) => registerCommand(`python ${process.env.EXTENSION_PATH}/utils/execute_action.py --json '${action_json.replace(/'/g, `\'`)}'`)
);

// Register check_env tool
server.tool(
  'check_env',
  'Kiểm tra môi trường ADB và kết nối thiết bị Android.',
  z.object({}).shape,
  () => registerCommand(`python ${process.env.EXTENSION_PATH}/utils/check_env.py`)
);

// Register find_element tool
server.tool(
  'find_element',
  'Tìm kiếm phần tử UI trên màn hình Android theo văn bản.',
  z.object({
    text: z.string().describe('Văn bản của phần tử UI cần tìm.'),
  }).shape,
  ({ text }) => registerCommand(`python ${process.env.EXTENSION_PATH}/utils/find_element.py --text '${text}'`)
);

// Register manage_app tool
server.tool(
  'manage_app',
  'Quản lý ứng dụng Android (cài đặt, gỡ bỏ, liệt kê).',
  z.object({
    action: z.enum(['install', 'uninstall', 'list']).describe('Hành động quản lý ứng dụng.'),
    package_name: z.string().optional().describe('Tên gói ứng dụng (cho uninstall, list).'),
    file_path: z.string().optional().describe('Đường dẫn đến tệp APK (cho install).'),
  }).shape,
  ({ action, package_name, file_path }) => {
    let command = `python ${process.env.EXTENSION_PATH}/utils/manage_app.py --action ${action}`;
    if (package_name) {
      command += ` --package_name '${package_name}'`;
    }
    if (file_path) {
      command += ` --file_path '${file_path}'`;
    }
    return registerCommand(command);
  }
);


// --- Dynamically register tools from TOML files ---

function registerToolsFromToml() {
    const commandsDir = path.join(process.env.EXTENSION_PATH!, 'commands', 'android');
    const files = fs.readdirSync(commandsDir);

    for (const file of files) {
        if (path.extname(file) === '.toml') {
            const filePath = path.join(commandsDir, file);
            const tomlContent = fs.readFileSync(filePath, 'utf-8');
            const parsedToml = toml.parse(tomlContent);

            const toolName = path.basename(file, '.toml');
            const description = parsedToml.description || '';
            const prompt = parsedToml.prompt || '';
            const fullDescription = `${description}\n${prompt}`.trim();

            // Regex to find parameters like <name> or <name (description)>
            const paramRegex = /<([a-zA-Z0-9_:\s\(\)]+?)>/g;
            let match;
            let commandTemplate = prompt;

            // Extract execution example to build the command template
            const execMatch = prompt.match(/Ví dụ thực thi: (.+)/);
            if (execMatch) {
                commandTemplate = execMatch[1];
            }
            
            // Find all unique parameter names from the prompt
            const paramNames = new Set<string>();
            while ((match = paramRegex.exec(prompt)) !== null) {
                // Sanitize the parameter name, removing descriptions and prefixes
                const cleanName = match[1].split(' ')[0].replace('tên param ','').replace(/:/g, '_');
                paramNames.add(cleanName);
            }

            const schema: { [key: string]: any } = {};
            paramNames.forEach(name => {
                // A simple heuristic for type, defaulting to string. 
                // This could be enhanced if the TOML provided type info.
                if (name.includes('level') || name.includes('port') || name.includes('duration') || name.includes('limit') || name.includes('brightness') || name.includes('state') || name.includes('pid') || name.includes('width') || name.includes('height')) {
                    schema[name] = z.number().describe(name.replace(/_/g, ' '));
                } else {
                    schema[name] = z.string().describe(name.replace(/_/g, ' '));
                }
            });
            
            const zodSchema = z.object(schema);

            server.tool(
                toolName,
                fullDescription,
                zodSchema.shape as any,
                (args: any) => {
                    let finalCommand = commandTemplate;
                    // Replace placeholders with actual arguments
                    for (const key in args) {
                        // Build a more robust regex to find the correct placeholder
                        const placeholderRegex = new RegExp(`<[^>]*${key}[^>]*>`, 'g');
                        finalCommand = finalCommand.replace(placeholderRegex, String(args[key]));
                    }
                    // Clean up any remaining optional placeholders that were not filled
                    finalCommand = finalCommand.replace(/<[^>]+>/g, '').trim();
                    return registerCommand(finalCommand);
                }
            );
        }
    }
}


async function startServer() {
    // Dynamically register tools before starting the server
    try {
        registerToolsFromToml();
        console.log('Successfully registered tools from TOML files.');
    } catch (error) {
        console.error('Failed to register tools from TOML files:', error);
        // We might want to exit gracefully if tool registration fails
        process.exit(1);
    }

    const transport = new StdioServerTransport();
    await server.connect(transport);
}

startServer();