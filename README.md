# Picmim MCP Connector

The Picmim connector gives compatible AI clients access to a user's explicitly approved Picmim workspaces for social-media planning, analytics, draft creation, scheduling, and content-plan management.

## Connect

- Remote MCP endpoint: `https://picmim.com/mcp`
- Transport: Streamable HTTP
- Authentication: OAuth 2.1 with Dynamic Client Registration and PKCE
- Public setup guide: <https://picmim.com/mcp-clients.md>
- Authentication guide: <https://picmim.com/auth.md>

Picmim uses one universal endpoint for ChatGPT, Claude, and other compatible clients. Each user signs in to Picmim, selects the workspaces to share, and grants only the requested capabilities. Access remains limited by the user's Picmim role and workspace-credit balance.

## Platform behavior

ChatGPT receives the full tool catalog allowed by the user's OAuth scopes and workspace role, including Picmim's AI-assisted Plan and visual workflows.

Claude hosted connections receive a directory-safe, text-only profile. Standalone AI image generation is not advertised, content Plans require `generate_images=false`, visual Plan actions are removed, and long-running operations exclude image generation. This keeps the public Claude listing aligned with Anthropic's directory policy while preserving the same OAuth and workspace security model.

## Useful prompts

1. `List my available Picmim workspaces and show their permissions.`
2. `For my selected workspace, show the connected social accounts and their exact IDs.`
3. `Create a two-day text-only content plan starting tomorrow with one draft post per day. Do not schedule or publish anything.`
4. `Show open posting gaps for the next seven days in my workspace timezone.`
5. `Retrieve the latest content plan and summarize each item's review status.`

## Public metadata

- Connector metadata: [`metadata/connector.json`](metadata/connector.json)
- Claude directory copy: [`claude/directory-submission.md`](claude/directory-submission.md)
- OpenAI submission notes: [`openai/submission-notes.md`](openai/submission-notes.md)
- OpenAI review JSON: [`openai/chatgpt-app-submission.json`](openai/chatgpt-app-submission.json)
- OAuth details: [`docs/authentication.md`](docs/authentication.md)

## Health check

Node.js 20 or newer is enough; the check has no third-party dependencies.

```bash
npm run check
```

The script validates public discovery, OAuth metadata, the MCP authentication challenge, and the OpenAI domain-verification endpoint shape. It never requests or prints credentials.

## Privacy and support

- Privacy policy: <https://picmim.com/privacy>
- Terms: <https://picmim.com/terms>
- Support and security reports: <info@picmim.com>

Do not put Picmim access tokens, OAuth credentials, reviewer passwords, challenge tokens, or customer data in GitHub issues.

## Repository scope

This public repository contains connector metadata, platform-specific behavior documentation, submission copy, and a public readiness check for Picmim's hosted remote MCP service. The production SaaS implementation is maintained separately and is not distributed from this repository. Picmim is submitted to Claude as a remote MCP connector, not as a Claude plugin.
