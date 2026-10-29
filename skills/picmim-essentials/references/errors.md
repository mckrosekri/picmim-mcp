# Picmim errors, approvals and recovery

## Result shapes

- Every tool result carries an `audit_event_uuid`. Keep it: it is the exact key for `get_recent_tool_results`.
- Validation errors look like `{success: false, error_code: "invalid_input", error: "..."}`.
- A tool that needs other reads first returns `required_tools` (and sometimes `missing_tool_groups`). Call one tool from each group, then repeat the call.
- Internal errors look like `{success: false, error: "mcp_internal_error", incident_id, retryable: true}`.
- A refused action (for example a week that has already closed, or a post that is being rewritten) returns `success: false` with a plain sentence in `error`. Pass that sentence on in your own words.

## Retries and duplicates

MCP calls carry no message ID, so Picmim can't tell a retry from a new request. A retried write runs again unless that tool protects itself:

| Tool | Protection |
| --- | --- |
| `create_posts` | An identical post (same accounts, caption, media and options) less than 60 minutes from an existing scheduled one comes back with `already_scheduled: true` instead of a copy. |
| `generate_content_plan` | The same `request_id` with the same input returns the existing plan. Changed input with an old `request_id` is refused. |
| `upload_media` | The same `upload_id` returns the same upload. Reusing it for a different file is refused. |
| `start_mcp_operation` | The same operation and parameters return the same operation. |
| `create_inbox_knowledge` | The same `request_id` returns the same source. |

Every other write, including `reply_to_comment` and the image tools, runs again on a retry. Recover first:

1. Call `get_recent_tool_results` with the `audit_event_uuid` you have, or with `tool_name` and a small `limit`.
2. It only sees calls made with this same connection, user and workspace.
3. If a matching result shows `success: true`, use its `output` and don't call the tool again.
4. If nothing matches, the call didn't run. Retry once.

## Approvals

- When the connection's owner turns off automatic execution for it, every write goes to an approval queue in Picmim. Reads always run.
- A queued write returns `approval_requested: true`, `approval_request_uuid`, `status: "pending"` and a `preview` of what will happen.
- Tell the user it is waiting for the owner's approval in Picmim, on the **AI assistants** settings page under "Waiting for your OK". Don't call the tool again; that would queue a second request.
- Approvals expire if nobody acts in time, and are refused if the connection was revoked or the person's role changed.
- After the owner approves, check the outcome with a read tool (for example `find_posts`) before reporting it.
- `upload_media` is the exception: `prepare`, `import`, `status`, `link` and `link_status` never wait. With approvals on, `import` stages the file and returns `awaiting_approval`; the `complete` step is what waits.

## Credits

- Paid tools (image generation, edits and variations, caption videos, plan generation, plan post rewrites, new pictures, picture options and polishing, new words on a post's picture and Story switches, hashtag suggestions, page analysis and video analysis) spend the workspace's AI credits. Reads, polling and recovery are free.
- `ai_credits_exhausted` has `retryable: false`. Stop paid work for the rest of the run, keep any free work going, and tell the user once.
