import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "primeng-mcp-fixed",
  version: "1.0.0"
});

server.tool(
  "get_migration_guide",
  {
    // OPRAVA: .description zmenené na .describe
    from: z.string().describe("The version to migrate from (e.g., v17)"),
    to: z.string().describe("The version to migrate to (e.g., v18)")
  },
  async ({ from, to }) => {
    return {
      content: [{
        type: "text",
        text: `Migration guide from ${from} to ${to}: Please check the official PrimeNG documentation.`
      }]
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("Fixed PrimeNG MCP Server running...");
