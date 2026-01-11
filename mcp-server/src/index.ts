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
import * as fs from 'fs';
import * as path from 'path';
import * as toml from 'toml';

const server = new McpServer({
  name: 'android-gemini-extension',
  version: '1.0.0',
});

// --- Shell command execution ---
function executeShellCommand(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Command failed: ${command}`);
        console.error(`Error: ${error.message}`);
        reject(JSON.stringify({ error: 'CommandExecutionError', message: stderr || error.message }));
        return;
      }
      if (stderr) {
        console.warn(`Command produced stderr: ${stderr}`);
      }
      resolve(stdout || stderr || 'Command executed successfully.');
    });
  });
}

async function registerCommand(command: string): Promise<CallToolResult> {
  try {
    const output = await executeShellCommand(command);
    return { content: [{ type: 'text', text: output }] };
  } catch (error) {
    return { content: [{ type: 'text', text: typeof error === 'string' ? error : JSON.stringify(error) }] };
  }
}

// --- Core Python-based tools ---

server.tool(
  'get_screen',
  'Lấy trạng thái màn hình hiện tại của thiết bị Android dưới dạng JSON.',
  z.object({}),
  () => registerCommand(`python ${process.env.EXTENSION_PATH}/utils/get_screen.py`)
);

server.tool(
  'execute_action',
  'Thực hiện một hành động trên thiết bị Android (tap, type, swipe, v.v.) dựa trên đối tượng JSON.',
  z.object({
    action_json: z.string().describe('Đối tượng JSON mô tả hành động cần thực hiện.'),
  }),
  ({ action_json }) =>
    registerCommand(`python ${process.env.EXTENSION_PATH}/utils/execute_action.py --json '${action_json.replace(/'/g, `\'`)}'`)
);

server.tool(
  'check_env',
  'Kiểm tra môi trường ADB và kết nối thiết bị Android.',
  z.object({}),
  () => registerCommand(`python ${process.env.EXTENSION_PATH}/utils/check_env.py`)
);

server.tool(
  'find_element',
  'Tìm kiếm phần tử UI trên màn hình Android theo văn bản.',
  z.object({ text: z.string().describe('Văn bản của phần tử UI cần tìm.') }),
  ({ text }) => registerCommand(`python ${process.env.EXTENSION_PATH}/utils/find_element.py --text '${text}'`)
);

server.tool(
  'manage_app',
  'Quản lý ứng dụng Android (cài đặt, gỡ bỏ, liệt kê).',
  z.object({
    action: z.enum(['install', 'uninstall', 'list']).describe('Hành động quản lý ứng dụng.'),
    package_name: z.string().optional().describe('Tên gói ứng dụng (cho uninstall, list).'),
    file_path: z.string().optional().describe('Đường dẫn đến tệp APK (cho install).'),
  }),
  ({ action, package_name, file_path }) => {
    let command = `python ${process.env.EXTENSION_PATH}/utils/manage_app.py --action ${action}`;
    if (package_name) command += ` --package_name '${package_name}'`;
    if (file_path) command += ` --file_path '${file_path}'`;
    return registerCommand(command);
  }
);

// --- Dynamically register TOML tools ---
function registerToolsFromToml() {
  const commandsDir = path.join(process.env.EXTENSION_PATH!, 'commands', 'android');
  if (!fs.existsSync(commandsDir)) return;

  const files = fs.readdirSync(commandsDir);
  for (const file of files) {
    if (path.extname(file) !== '.toml') continue;

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
    const paramNames = new Set<string>();
    while ((match = paramRegex.exec(prompt)) !== null) {
      const cleanName = match[1].split(' ')[0].replace('tên param ', '').replace(/:/g, '_');
      paramNames.add(cleanName);
    }

    const schemaObj: Record<string, any> = {};
    paramNames.forEach((name) => {
      if (['level', 'port', 'duration', 'limit', 'brightness', 'state', 'pid', 'width', 'height'].some(k => name.includes(k))) {
        schemaObj[name] = z.number().describe(name.replace(/_/g, ' '));
      } else {
        schemaObj[name] = z.string().describe(name.replace(/_/g, ' '));
      }
    });

    const zodSchema = z.object(schemaObj);

    // Determine command template
    let commandTemplate = prompt;
    const execMatch = prompt.match(/Ví dụ thực thi: (.+)/);
    if (execMatch) commandTemplate = execMatch[1];

    server.tool(
      toolName,
      fullDescription,
      zodSchema, // pass the object directly, no .shape
      (args: any) => {
        let finalCommand = commandTemplate;
        for (const key in args) {
          const placeholderRegex = new RegExp(`<[^>]*${key}[^>]*>`, 'g');
          finalCommand = finalCommand.replace(placeholderRegex, String(args[key]));
        }
        finalCommand = finalCommand.replace(/<[^>]+>/g, '').trim();
        return registerCommand(finalCommand);
      }
    );
  }
}

// --- Start server ---
async function startServer() {
  try {
    registerToolsFromToml();
    console.log('Successfully registered tools from TOML files.');
  } catch (error) {
    console.error('Failed to register tools from TOML files:', error);
    process.exit(1);
  }

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

startServer();