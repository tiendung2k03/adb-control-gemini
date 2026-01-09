import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new McpServer({
  name: 'test-server',
  version: '1.0.0',
});

async function startServer() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

startServer();
