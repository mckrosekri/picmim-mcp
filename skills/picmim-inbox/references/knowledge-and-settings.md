# Inbox knowledge and settings

Replying, reviewing, knowledge and settings changes need a workspace admin or member; viewers can only read. The tools for Pim's drafted replies, knowledge and inbox settings also need Pim's inbox replies to be available for the workspace.

| Permission | Tools |
| --- | --- |
| `inbox:reply` | `reply_to_comment` |
| `inbox:review` | `reject_inbox_ai_decision`, `regenerate_inbox_ai_decision`, and `approve_inbox_ai_decision` (which also needs `inbox:reply`) |
| `inbox:knowledge` | `create_inbox_knowledge`, `update_inbox_knowledge`, `reindex_inbox_knowledge`, `delete_inbox_knowledge` |
| `inbox:settings` | `update_inbox_ai_settings` |

Reads (`read_inbox_comments`, `get_inbox_ai_settings`, `read_inbox_knowledge`) need no extra permission.

## Knowledge

Knowledge is what Pim may quote when it drafts replies: FAQs, short texts, web pages and PDFs.

1. List what exists with `read_inbox_knowledge` (filters `type`, `status`). It returns names and status, never the content.
2. Add a source with `create_inbox_knowledge`:
   - a new UUID as `request_id`, sent unchanged on every retry
   - `type` `faq` or `text` with `content`, `url` with `source_url`, or `pdf` with the `media_id` of an uploaded PDF
   - a `name` the customer will recognise
3. For a PDF, upload it first with `upload_media` and poll `status` until `ready: true`.
4. Never put a user name, password or token in a `source_url`.
5. `update_inbox_knowledge` replaces a source and indexes it again. `reindex_inbox_knowledge` refreshes one (for example after the web page changed). Both take `source_uuid`.
6. `delete_inbox_knowledge` removes a source for good and always waits for the owner's approval in Picmim. Confirm with the customer first, then tell them it is waiting for approval.

Only add facts the customer gave you or confirmed. Knowledge Pim quotes in public must be true.

## Settings

1. Read the current settings with `get_inbox_ai_settings` (add `account_id` for one account). It returns the settings in effect and the shared AI credit budget.
2. Change only what the customer asked for. `mode` is required on every update, so send the current mode unchanged unless they asked to change it.
3. Modes:
   - `off`: Pim doesn't draft replies.
   - `suggest`: Pim drafts replies for a person to approve. The safe default.
   - `auto_safe`: Pim may reply on its own to safe, simple comments. Only when the customer explicitly asks, and only where automatic replies are available.
   - `paused`: stopped for now.
4. Other fields: topics to answer or avoid, hand-over rules, languages, reply goals, confidence threshold, daily and hourly reply limits, AI credit limit and period, reply delay, working hours and timezone. Credit limits apply to the whole workspace only. `apply_mode_to_accounts` copies the workspace mode onto accounts that have their own setting; use it only when the customer asks for every account.
5. Never raise reply limits or the credit budget, or lower the confidence threshold, unless the customer explicitly asks.
6. Confirm what was saved from the result.
