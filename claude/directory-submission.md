# Claude Connectors Directory submission

This file contains copy-ready values for the Claude.ai remote connector submission portal.

## Connection

- Connector type: `Remote MCP server`
- URL configuration: `Universal URL`
- Server URL: `https://picmim.com/mcp`
- Transport: `Streamable HTTP`
- Authentication: `OAuth with Dynamic Client Registration (oauth_dcr)`
- OAuth client ID: leave blank
- OAuth client secret: leave blank

## Listing

- Name: `Picmim`
- Tagline: `Plan and manage social content`
- Suggested categories: `Productivity`, `Marketing`
- Documentation URL: `https://picmim.com/mcp-clients.md`
- Privacy policy URL: `https://picmim.com/privacy`
- Support contact: `info@picmim.com`
- Website: `https://picmim.com`
- Requested permanent slug: `picmim`
- Icon: `assets/picmim-logo-512.png`

### Description

Picmim helps social media teams inspect connected accounts and performance, find calendar gaps, create text-first content Plans, manage draft posts, and review or reschedule Plan items in explicitly approved Picmim workspaces. Users authenticate with Picmim OAuth, choose which workspaces to share, and grant only the capabilities they need. Access is always limited by the user's current Picmim role.

The Claude directory connection is text-only. It does not expose standalone AI image generation, requires generated content Plans to use `generate_images=false`, and removes visual-generation Plan actions. Draft creation and scheduling remain permission-scoped; publishing, deletion, and other high-impact actions retain Picmim's approval protections.

## Use cases

### 1. Plan two days of draft social content

Prompt: `Create a two-day text-only Picmim content plan starting tomorrow with one draft post per day for my connected Facebook account. Do not schedule or publish anything.`

Expected behavior: Claude first resolves the workspace and connected account, then creates a draft text-only Plan with `generate_images=false`. It returns the Plan identifier and status without scheduling or publishing.

### 2. Find calendar gaps

Prompt: `Show the open posting gaps in my selected Picmim workspace for the next seven days.`

Expected behavior: Claude returns available periods in the workspace timezone and does not modify any posts.

### 3. Review a generated Plan

Prompt: `Retrieve my latest Picmim content plan and summarize each item's caption, date, and review status.`

Expected behavior: Claude reads the latest Plan and its items without approving, rewriting, rescheduling, or publishing them.

### 4. Inspect performance

Prompt: `Summarize the recent performance of my connected accounts and identify the strongest account.`

Expected behavior: Claude reads bounded analytics data from the selected workspace and provides a concise summary without changing any content.

## Prerequisites and access

- The user needs a Picmim account and at least one workspace.
- Social accounts must already be connected inside Picmim.
- The user selects workspaces and permissions during OAuth consent.
- The connector reads data and can write drafts or schedules only when the user grants the matching scope and has an eligible workspace role.
- AI-backed text work uses Picmim workspace credits at the same rates and policies as Picmim Chat V2.

## Data handling

- Underlying API: Picmim's first-party API.
- Personal health data: No.
- Sponsored content or advertising: No.
- Conversation collection: Picmim receives only the structured tool inputs needed to execute the requested operation; it does not request Claude memory, chat history, or conversation summaries.
- AI media generation: Not available in the hosted Claude directory profile.

## Test and launch

Provide reviewer credentials privately in Claude's portal. The account must be fully populated, must not require MFA or one-time email confirmation, and should include:

- A workspace named `Picmim Review Workspace`.
- At least one connected test social account.
- Recent analytics data.
- Calendar entries and at least one open gap.
- At least one completed text-only content Plan.
- Enough workspace credits to run the submitted AI-backed text test.

State in the access instructions: `Sign in with the supplied credentials, approve Picmim Review Workspace, grant the requested draft and Plan scopes, then run the listed use cases. No social content needs to be published.`

## Compliance confirmations

Before checking the portal boxes, verify the deployed server still satisfies each statement:

- The connector complies with Anthropic's Software Directory policy and terms.
- It uses Picmim's first-party API.
- It does not transfer money or financial assets.
- The Claude-hosted profile does not generate AI images, video, or audio.
- Tool descriptions do not contain prompt-injection instructions.
- It does not collect Claude conversation data beyond explicit tool inputs.
- Public documentation, privacy policy, support contact, and this repository are live.
