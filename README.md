# Picmim for Grok Build

Picmim is a hosted MCP integration for planning, drafting, scheduling, publishing, and analyzing social-media content in Picmim workspaces. This repository is a small, cross-client plugin package: it contains Grok Build metadata, a bounded workspace skill, public documentation, and checks. It does **not** contain the Picmim SaaS, OAuth credentials, social-network credentials, installers, hooks, or local executables.

## Install in Grok Build

Install this reviewed plugin source through Grok Build or the xAI plugin marketplace. The package exposes one remote Streamable HTTP MCP server:

```text
https://picmim.com/mcp
```

Grok Build discovers `.mcp.json` and opens the hosted OAuth flow. No token, client secret, shell command, or post-install step is needed. For manual setup or another compatible MCP client, use the same universal endpoint and consult [the client guide](https://picmim.com/mcp-clients.md). The historical `/mcp/claude-directory` path is not live and is not a supported installation URL.

## Authentication and permissions

Picmim uses OAuth 2.1 authorization code flow with PKCE (S256) and Dynamic Client Registration. A user signs in directly with Picmim, selects the workspaces to share, and approves only the requested scopes. Discovery metadata is authoritative:

- MCP discovery: `https://picmim.com/.well-known/mcp.json`
- Protected-resource metadata: `https://picmim.com/.well-known/oauth-protected-resource`
- Authorization-server metadata: `https://picmim.com/.well-known/oauth-authorization-server`

Connections begin read-only. The currently advertised scopes are `mcp:use`, `content:drafts`, `media:generate`, `plans:generate`, `plans:manage`, `openid`, and `email`; the consent screen requests only the capabilities needed for the chosen workflow. Typical read access covers approved workspaces, connected accounts, calendar, posts, media metadata, content plans, analytics, and help. Write-capable access is separately consented, including `content:drafts` for draft management and the media or plan scopes for those operations. Picmim checks the current workspace membership and role on every request; OAuth scope does not bypass those permissions.

Social accounts are connected in Picmim. The plugin never receives or asks for social-provider passwords or credentials.

## Writes, approvals, and billing

Write tools can create or edit drafts, schedules, media, inbox activity, content plans, and workspace settings. Scheduling can cause future social publication; publishing, deleting, inbox replies, account changes, and settings changes are consequential. Resolve the workspace, target account, content, and timing before a write. Picmim enforces its server-side approval protections for high-impact actions, and a pending approval or queued operation is not completion.

Some AI-assisted operations—such as content plans, text generation, image generation or edits, and supported analyses—consume Picmim workspace **AI credits** and may use configured AI providers. Credit checks and billing happen on Picmim infrastructure at the same policies as the product. Ordinary deterministic MCP reads and writes are not represented as AI-credit purchases merely because they are called through an AI client.

## Data handling, telemetry, and retention

The only plugin network destination is `https://picmim.com`, including the MCP and OAuth discovery/authorization endpoints above. Picmim receives the structured tool inputs necessary to perform the requested operation, validates access, and returns structured results. It does not request Grok conversation memory, chat history, browser sessions, environment variables, or provider credentials.

Picmim records operation and audit data needed for authorization, billing, status recovery, and workspace accountability. This telemetry is limited to service-operation and audit records; it is not Grok conversation telemetry. Encrypted asynchronous MCP operation inputs and results are retained for seven days by default. MCP request metadata—method, status, duration, user/workspace identifiers, and tool name, without bearer credentials, tool inputs, or response content—is retained for six months. Generated workspace media, posts, and plans remain in the workspace under Picmim's normal product and account controls. Do not put tokens, customer data, or review credentials in this repository or public issues.

You can revoke access in Picmim's connected-app/authorization controls; workspace membership and role changes also take effect on subsequent server checks. For account or data-rights questions, use the links below.

- [Privacy](https://picmim.com/privacy)
- [Terms](https://picmim.com/terms)
- [Support and security reporting](mailto:info@picmim.com)
- [OAuth details](docs/authentication.md)

## Skill behavior

The included `social-workspace` skill tells Grok to list available workspaces first, discover real account and media identifiers, respect returned approval and operation states, and never fabricate access or retry an uncertain write blindly. It distinguishes drafting from scheduling and publishing, which require explicit user authorization.

## Verify

Node.js 20+ is sufficient and no dependencies are installed:

```bash
npm run check
```

The check validates the local Grok package and live universal MCP discovery, OAuth metadata, and unauthenticated OAuth challenge. It never prints or requests credentials.

## License

This package is licensed under [Apache-2.0](LICENSE). Picmim maintains the hosted service separately; marketplace availability is not xAI endorsement, verification, or a distribution of the private Picmim application.
