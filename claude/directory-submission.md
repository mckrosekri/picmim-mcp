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

Picmim helps social media teams inspect connected accounts and performance, find calendar gaps, create content Plans and social visuals, manage draft posts, and review or reschedule Plan items in explicitly approved Picmim workspaces. Users authenticate with Picmim OAuth, choose which workspaces to share, and grant only the capabilities they need. Access is always limited by the user's current Picmim role.

Claude can request the same capability-scoped Picmim workflows as other compatible MCP clients, including social image generation, image editing and variations, content Plans with generated visuals, and Plan-item visual regeneration. Picmim performs, bills, and stores this work on its own infrastructure, then returns operation status and workspace media or Plan results to Claude. Draft creation and scheduling remain permission-scoped; publishing, deletion, and other high-impact actions retain Picmim's approval protections.

## Use cases

### 1. Plan two days of draft social content

Prompt: `Create a two-day Picmim content plan starting tomorrow with one visual draft post per day for my connected Facebook account. Generate suitable images, but do not schedule or publish anything.`

Expected behavior: Claude first resolves the workspace and connected account, then creates a draft Plan with `generate_images=true`. Picmim queues and bills its normal Plan and image workflows, stores the generated media in the workspace, and returns the Plan identifier and status without scheduling or publishing.

### 2. Generate a social visual

Prompt: `Generate a square Picmim social image for a product-launch post, using my workspace brand style, and save it to my media library.`

Expected behavior: Claude starts Picmim's asynchronous image operation and polls it to completion. Picmim performs and bills the generation, stores the result in the approved workspace, and returns the media identifier and URL.

### 3. Find calendar gaps

Prompt: `Show the open posting gaps in my selected Picmim workspace for the next seven days.`

Expected behavior: Claude returns available periods in the workspace timezone and does not modify any posts.

### 4. Review a generated Plan

Prompt: `Retrieve my latest Picmim content plan and summarize each item's caption, date, and review status.`

Expected behavior: Claude reads the latest Plan and its items without approving, rewriting, rescheduling, or publishing them.

### 5. Inspect performance

Prompt: `Summarize the recent performance of my connected accounts and identify the strongest account.`

Expected behavior: Claude reads bounded analytics data from the selected workspace and provides a concise summary without changing any content.

## Prerequisites and access

- The user needs a Picmim account and at least one workspace.
- Social accounts must already be connected inside Picmim.
- The user selects workspaces and permissions during OAuth consent.
- The connector reads data and can write drafts or schedules only when the user grants the matching scope and has an eligible workspace role.
- AI-backed text, image, video, and Plan work uses Picmim workspace credits at the same rates and policies as Picmim Chat V2.

## Data handling

- Underlying API: Picmim's first-party API.
- Personal health data: No.
- Sponsored content or advertising: No.
- Conversation collection: Picmim receives only the structured tool inputs needed to execute the requested operation; it does not request Claude memory, chat history, or conversation summaries.
- AI media generation: Picmim can generate and edit social-content visuals and content-Plan media when the user grants the corresponding capability. Picmim performs, bills, stores, and returns the result; Claude does not receive Picmim's provider credentials.

## Test and launch

Provide reviewer credentials privately in Claude's portal. The account must be fully populated, must not require MFA or one-time email confirmation, and should include:

- A workspace named `Picmim Review Workspace`.
- At least one connected test social account.
- Recent analytics data.
- Calendar entries and at least one open gap.
- At least one completed visual content Plan.
- Enough workspace credits to run the submitted AI-backed Plan and image tests.

State in the access instructions: `Sign in with the supplied credentials, approve Picmim Review Workspace, grant the requested draft, media-generation, and Plan scopes, then run the listed use cases. No social content needs to be published.`

## Compliance confirmations

Before checking the portal boxes, verify the deployed server still satisfies each statement:

- The connector complies with Anthropic's Software Directory policy and terms.
- It uses Picmim's first-party API.
- It does not transfer money or financial assets.
- AI-generated visuals are part of Picmim's social-content and content-Plan design workflows; the listing does not present Picmim as a general-purpose model or media-generation marketplace.
- Tool descriptions do not contain prompt-injection instructions.
- It does not collect Claude conversation data beyond explicit tool inputs.
- Public documentation, privacy policy, support contact, and this repository are live.
