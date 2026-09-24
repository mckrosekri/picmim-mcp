# OpenAI plugin submission notes

Picmim is submitted as a remote MCP-only plugin with no custom UI.

## MCP

- URL type: `Universal`
- MCP server URL: `https://picmim.com/mcp`
- Authentication: OAuth
- Challenge Base URL: `https://picmim.com`
- Challenge endpoint: `https://picmim.com/.well-known/openai-apps-challenge`
- Screenshots: none; the connector has no MCP App UI resource

The exact domain-verification token displayed by the OpenAI portal must be stored only in Picmim's production `OPENAI_APPS_CHALLENGE_TOKEN` environment variable. The endpoint returns only that token as plain text with `Cache-Control: no-store`.

## Listing

- Name: `Picmim`
- Subtitle: `Plan and schedule content`
- Category: `Productivity`
- Website: `https://picmim.com`
- Support: `info@picmim.com`
- Privacy: `https://picmim.com/privacy`
- Terms: `https://picmim.com/terms`
- Logo: `assets/picmim-logo-512.png`

## Starter prompts

1. `List my available Picmim workspaces and their permissions.`
2. `Create a two-day content plan starting tomorrow with one draft post per day.`
3. `Show open posting gaps for the next seven days.`
4. `Summarize the recent performance of my connected social accounts.`

## Release notes

`Initial public release of the Picmim remote MCP connector with workspace-scoped OAuth, social account and analytics discovery, draft and scheduling workflows, full Picmim content Plan generation, visual tools for eligible users, usage billing parity with Picmim Chat V2, and server-side safeguards for high-impact actions.`

## Reviewer credentials

Provide credentials only in the OpenAI submission portal. Use a fully populated account without MFA, SMS, or email-code requirements. Do not add the credentials to this repository.

The machine-readable annotations, justifications, five positive tests, and three negative tests are in [`chatgpt-app-submission.json`](chatgpt-app-submission.json).
