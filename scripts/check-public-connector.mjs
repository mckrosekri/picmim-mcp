import fs from "node:fs";
import path from "node:path";

const origin = process.env.PICMIM_ORIGIN ?? "https://picmim.com";
const endpoint = new URL("/mcp", origin);
const packageRoot = path.resolve(import.meta.dirname, "..");
const results = [];

function record(name, ok, detail) {
  results.push({ name, ok, detail });
}

function validatePackage() {
  try {
    const plugin = JSON.parse(fs.readFileSync(path.join(packageRoot, ".grok-plugin", "plugin.json"), "utf8"));
    const mcp = JSON.parse(fs.readFileSync(path.join(packageRoot, ".mcp.json"), "utf8"));
    const server = mcp.mcpServers?.picmim;
    record("Grok plugin manifest", plugin.name === "picmim" && plugin.version === "1.2.0" && plugin.license === "Apache-2.0" && fs.existsSync(path.join(packageRoot, "LICENSE")) && fs.existsSync(path.join(packageRoot, "skills", "social-workspace", "SKILL.md")), "local manifest, license, and skill");
    record("Grok MCP configuration", server?.type === "http" && server?.url === endpoint.href && !/token|secret|password|api[_-]?key/i.test(JSON.stringify(mcp)), "hosted HTTPS endpoint without credentials");
  } catch (error) {
    record("Grok package files", false, error instanceof Error ? error.message : "Invalid package files");
  }
}

async function getJson(resource) {
  const response = await fetch(new URL(resource, origin), { headers: { Accept: "application/json" }, redirect: "manual" });
  const text = await response.text();
  let body = null;
  try { body = JSON.parse(text); } catch { /* failures are reported by the caller */ }
  return { response, body };
}

validatePackage();

try {
  const discovery = await getJson("/.well-known/mcp.json");
  record("MCP discovery", discovery.response.ok && discovery.body?.mcpServers?.picmim?.url === endpoint.href, `HTTP ${discovery.response.status}`);

  const resource = await getJson("/.well-known/oauth-protected-resource");
  record("OAuth protected resource", resource.response.ok && Array.isArray(resource.body?.authorization_servers) && resource.body.authorization_servers.length > 0, `HTTP ${resource.response.status}`);

  const auth = await getJson("/.well-known/oauth-authorization-server");
  record("OAuth authorization server", auth.response.ok && typeof auth.body?.registration_endpoint === "string" && auth.body?.code_challenge_methods_supported?.includes("S256") && auth.body?.authorization_response_iss_parameter_supported === true, `HTTP ${auth.response.status}`);

  const mcp = await fetch(endpoint, { method: "POST", headers: { Accept: "application/json, text/event-stream", "Content-Type": "application/json" }, body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/list" }), redirect: "manual" });
  record("MCP OAuth challenge", mcp.status === 401 && /resource_metadata=/i.test(mcp.headers.get("www-authenticate") ?? ""), `HTTP ${mcp.status}`);
} catch (error) {
  record("Network execution", false, error instanceof Error ? error.message : "Unknown error");
}

for (const result of results) console.log(`${result.ok ? "PASS" : "FAIL"}  ${result.name} (${result.detail})`);
if (results.length === 0 || results.some((result) => !result.ok)) process.exitCode = 1;
