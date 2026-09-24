# Picmim MCP Connector

The Picmim connector gives compatible AI clients access to a user's explicitly approved Picmim workspaces for social-media planning, analytics, draft creation, scheduling, and content-plan management.

## Connect

- Full MCP endpoint (ChatGPT, custom connectors, and compatible clients): `https://picmim.com/mcp`
- Claude Connector Directory endpoint: `https://picmim.com/mcp/claude-directory`
- Transport: Streamable HTTP
- Authentication: OAuth 2.1 with Dynamic Client Registration and PKCE
- Public setup guide: <https://picmim.com/mcp-clients.md>
- Authentication guide: <https://picmim.com/auth.md>

Both URLs use the same Picmim MCP implementation, OAuth authority, workspace consent, billing, queues, auditing, and business logic. Each user signs in to Picmim, selects the workspaces to share, and grants only the requested capabilities. Access remains limited by the user's Picmim role and workspace-credit balance. OAuth tokens are bound to the exact resource URL approved during consent and cannot be replayed across the two endpoints.

## Platform behavior

The full endpoint exposes the complete Picmim catalog allowed by the user's OAuth scopes, workspace role, and available credits. This includes AI-assisted content Plans, image generation, image editing and variations, visual Plan actions, analytics, drafts, scheduling, publishing, inbox, media, and settings workflows.

The Claude Directory endpoint keeps those Picmim business capabilities but presents image creation, editing, and variation only as social-design workflows. Its `manage_social_visuals` and `start_social_visual_operation` tools require a design context tied to a social post, story, campaign, or content Plan. `start_video_analysis` analyzes existing workspace video and does not generate video or audio. Claude users who intentionally install Picmim as an elevated custom connector can use the full endpoint instead.

AI work runs on Picmim infrastructure. The MCP client requests an operation; Picmim checks permissions and credits, performs and bills the work through the same services used by Picmim Chat V2, stores the Plan or media in the user's workspace, and returns structured results for the client to present. High-impact actions keep Picmim's existing approval protections.

## Useful prompts

1. `List my available Picmim workspaces and show their permissions.`
2. `For my selected workspace, show the connected social accounts and their exact IDs.`
3. `Create a two-day content plan starting tomorrow with one visual draft post per day. Generate suitable images, but do not schedule or publish anything.`
4. `Show open posting gaps for the next seven days in my workspace timezone.`
5. `Retrieve the latest content plan and summarize each item's review status.`
6. `Generate a square social image for a product-launch post and save it to my Picmim media library.`

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

The script validates public discovery, OAuth metadata for both MCP resources, both authentication challenges, and the OpenAI domain-verification endpoint shape. It never requests or prints credentials.

## Privacy and support

- Privacy policy: <https://picmim.com/privacy>
- Terms: <https://picmim.com/terms>
- Support and security reports: <info@picmim.com>

Do not put Picmim access tokens, OAuth credentials, reviewer passwords, challenge tokens, or customer data in GitHub issues.

## Repository scope

This public repository contains connector metadata, platform-specific behavior documentation, submission copy, and a public readiness check for Picmim's hosted remote MCP service. The production SaaS implementation is maintained separately and is not distributed from this repository. Picmim is submitted to Claude as a remote MCP connector, not as a Claude plugin.
