# Picmim for Grok Build

Picmim is a hosted MCP integration for planning, drafting, scheduling, publishing, and analyzing social-media content in Picmim workspaces. This repository is a small, cross-client plugin package: it contains Grok Build and Claude Code metadata, Picmim's agent skills, public documentation, and checks. It does **not** contain the Picmim SaaS, OAuth credentials, social-network credentials, installers, hooks, or local executables.

## Install in Grok Build

Install this plugin source in Grok Build. Marketplace review is pending. The package exposes one remote Streamable HTTP MCP server:

```text
https://picmim.com/mcp
```

Grok Build discovers `.mcp.json` and opens the hosted OAuth flow. No token, client secret, shell command, or post-install step is needed. For manual setup or another compatible MCP client, use the same universal endpoint and consult [the client guide](https://picmim.com/mcp-clients.md). The historical `/mcp/claude-directory` path is not live and is not a supported installation URL.

## Authentication and permissions

Picmim uses OAuth 2.1 authorization code flow with PKCE (S256) and Dynamic Client Registration. A user signs in directly with Picmim and selects the workspaces to share. Picmim can include available capabilities in the consent request beyond the scopes initially requested by the client. Discovery metadata is authoritative for advertised scopes:

- MCP discovery: `https://picmim.com/.well-known/mcp.json`
- Protected-resource metadata: `https://picmim.com/.well-known/oauth-protected-resource`
- Authorization-server metadata: `https://picmim.com/.well-known/oauth-authorization-server`

New connections are not read-only by default. Consent can include available capabilities to create, publish or delete content, manage media and inbox activity, and change settings. Review the consent screen before connecting. Automatic execution is enabled by default; the connection owner can require approval for writes and restrict capabilities afterward in Picmim. Workspace membership, roles, gated feature eligibility, and credit limits still apply. The advertised scope list can change, so consult the discovery metadata above.

Social accounts are connected in Picmim. The plugin never receives or asks for social-provider passwords or credentials.

## Writes, approvals, and billing

Write tools can create or edit drafts, schedules, media, inbox activity, content plans, and workspace settings. Scheduling can cause future social publication; publishing, deleting, inbox replies, account changes, and settings changes are consequential. Resolve the workspace, target account, content, and timing before a write. Picmim enforces its server-side approval protections for high-impact actions, and a pending approval or queued operation is not completion.

Some AI-assisted operations—such as content plans, text generation, image generation or edits, and supported analyses—consume Picmim workspace **AI credits** and may use configured AI providers. Credit checks and billing happen on Picmim infrastructure at the same policies as the product. Ordinary deterministic MCP reads and writes are not represented as AI-credit purchases merely because they are called through an AI client.

## Data handling, telemetry, and retention

The only plugin network destination is `https://picmim.com`, including the MCP and OAuth discovery/authorization endpoints above. Picmim’s public [client guide](https://picmim.com/mcp-clients.md) links back to this repository. Picmim receives the structured tool inputs necessary to perform the requested operation, validates access, and returns structured results. It does not request Grok conversation memory, chat history, browser sessions, environment variables, or provider credentials.

Picmim records operation and audit data needed for authorization, billing, status recovery, and workspace accountability. This telemetry is limited to service-operation and audit records; it is not Grok conversation telemetry. Encrypted asynchronous MCP operation inputs and results are retained for seven days by default. MCP request metadata—method, status, duration, user/workspace identifiers, and tool name, without bearer credentials, tool inputs, or response content—is retained for six months. Generated workspace media, posts, and plans remain in the workspace under Picmim's normal product and account controls. Do not put tokens, customer data, or review credentials in this repository or public issues.

You can revoke access in Picmim's connected-app/authorization controls; workspace membership and role changes also take effect on subsequent server checks. For account or data-rights questions, use the links below.

- [Privacy](https://picmim.com/privacy)
- [Terms](https://picmim.com/terms)
- [Support and security reporting](mailto:info@picmim.com)
- [OAuth details](docs/authentication.md)

## Skills

`skills/` holds seven [Agent Skills](https://agentskills.io) that teach an agent Picmim's rules for its MCP tools. Each folder is a `SKILL.md` plus optional `references/`, and every skill opens with the same ground rules, so each one is safe on its own.

| Skill | Use it when the agent… |
| --- | --- |
| `picmim-essentials` | uses any Picmim tool: workspace and account discovery, capabilities, recovery, settings changes. |
| `picmim-posts` | creates, edits, schedules, publishes, approves, cancels, duplicates, or deletes posts. |
| `picmim-captions` | writes or edits a caption, hook, hashtags, or on-image text. |
| `picmim-visuals` | finds, imports, uploads, generates, or edits media. |
| `picmim-plans` | generates or works on a content plan or the weekly posts Pim writes. |
| `picmim-analytics` | reviews performance or builds analytics charts. |
| `picmim-inbox` | reads or replies to comments, reviews Pim's drafted replies, or manages inbox knowledge and settings. |

In Claude Code, this repository is also a plugin marketplace. The `picmim` plugin installs the skills together with the hosted MCP server:

```text
/plugin marketplace add mckrosekri/picmim-mcp
/plugin install picmim@picmim
```

Other clients that read a skills folder can copy the folders from `skills/`. The skills are generated from Picmim's source and synced here with each release; edit them in Picmim, not in this repository.

## Verify

Node.js 20+ is sufficient and no dependencies are installed:

```bash
npm run check
```

The check validates the local Grok and Claude Code manifests against the `package.json` version, every skill folder's `SKILL.md` name, and live universal MCP discovery, OAuth metadata, and unauthenticated OAuth challenge. It never prints or requests credentials.

## License

This package is licensed under [Apache-2.0](LICENSE). Picmim maintains the hosted service separately; marketplace availability is not xAI endorsement, verification, or a distribution of the private Picmim application.
