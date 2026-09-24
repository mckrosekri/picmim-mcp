const origin = process.env.PICMIM_ORIGIN ?? "https://picmim.com";
const endpoint = new URL("/mcp", origin);

const results = [];

function record(name, ok, detail) {
  results.push({ name, ok, detail });
}

async function getJson(path) {
  const response = await fetch(new URL(path, origin), {
    headers: { Accept: "application/json" },
    redirect: "manual",
  });
  const text = await response.text();
  let body = null;
  try {
    body = JSON.parse(text);
  } catch {
    // The caller records a useful failure without echoing arbitrary response data.
  }
  return { response, body };
}

try {
  const discovery = await getJson("/.well-known/mcp.json");
  record(
    "MCP discovery",
    discovery.response.ok && discovery.body?.mcpServers?.picmim?.url === endpoint.href,
    `HTTP ${discovery.response.status}`,
  );

  const resource = await getJson("/.well-known/oauth-protected-resource");
  record(
    "OAuth protected resource",
    resource.response.ok &&
      Array.isArray(resource.body?.authorization_servers) &&
      resource.body.authorization_servers.length > 0,
    `HTTP ${resource.response.status}`,
  );

  const auth = await getJson("/.well-known/oauth-authorization-server");
  record(
    "OAuth authorization server",
    auth.response.ok &&
      typeof auth.body?.registration_endpoint === "string" &&
      auth.body?.code_challenge_methods_supported?.includes("S256") &&
      auth.body?.authorization_response_iss_parameter_supported === true,
    `HTTP ${auth.response.status}`,
  );

  const mcp = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json, text/event-stream",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/list" }),
    redirect: "manual",
  });
  record(
    "MCP OAuth challenge",
    mcp.status === 401 && /resource_metadata=/i.test(mcp.headers.get("www-authenticate") ?? ""),
    `HTTP ${mcp.status}`,
  );

  const challenge = await fetch(new URL("/.well-known/openai-apps-challenge", origin), {
    redirect: "manual",
  });
  const challengeBody = await challenge.text();
  record(
    "OpenAI domain challenge",
    challenge.ok &&
      challengeBody.trim().length > 0 &&
      !challengeBody.trim().startsWith("{") &&
      /no-store/i.test(challenge.headers.get("cache-control") ?? ""),
    `HTTP ${challenge.status}; token present=${challengeBody.trim().length > 0}`,
  );
} catch (error) {
  record("Network execution", false, error instanceof Error ? error.message : "Unknown error");
}

for (const result of results) {
  console.log(`${result.ok ? "PASS" : "FAIL"}  ${result.name} (${result.detail})`);
}

if (results.length === 0 || results.some((result) => !result.ok)) {
  process.exitCode = 1;
}
