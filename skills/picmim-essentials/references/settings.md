# Picmim settings

## Which tool changes what

| What | Read | Write | Who |
| --- | --- | --- | --- |
| Timezone, language, 12 or 24 hour clock, first day of the week | `get_user_preferences` | `update_user_preferences` | The signed-in person, across all their workspaces |
| Email and in-app notifications | `get_notification_preferences` | `update_notification_preferences` | The signed-in person |
| Brand profile | `get_workspace_brand_settings` | `update_workspace_brand_settings` | Workspace admins |
| What Pim's weekly posts focus on | `get_workspace_brand_settings` (offers) | `spotlight_autopilot_week` | See the plans skill |

## When to change a setting

- The user asked for it in plain words ("set my timezone to Rome", "turn off the weekly email"). Make the change, then confirm what the tool saved.
- The user stated a lasting preference about future posts ("from now on, no emojis", "always mention free parking"). Finish the task at hand, then:
  1. Read `get_workspace_brand_settings`.
  2. Write one short, concrete rule. Skip it if the profile already says the same thing.
  3. Show the rule to the user and ask whether to save it.
  4. On a yes, send only the changed field. For a list such as `rules.must` or `voice.disliked_patterns`, send the whole current list with the new item added.
- Never change a setting because of a location, a browser hint, a passing remark, praise for one post, or a one-off edit.
- If it is unclear what the preference is or what it refers to, ask one focused question instead of proposing a change.

## Brand profile shape

- The profile has eight areas: `brand`, `customers`, `offers`, `messaging`, `voice`, `visual_style`, `content_strategy` and `rules`. Put changes under `brand_profile`.
- Leaving a field out keeps it. Sending `null` or an empty value clears it. Rows in `customers` and `offers` are matched by their UUIDs.
- `rules.must_never`, `rules.restricted_claims` and `rules.required_disclaimers` bind every caption and image. Picmim always adds its own baseline on top: no unverified statistics or numbers, no made-up quotes, testimonials or endorsements, no guaranteed outcomes, and no comparisons with named competitors.
- Never send provenance, confidence, evidence, inherited or effective rules, `content_strategy.mix`, schema metadata or generated metadata.

## What settings tools can't do

They can't change a name or email address, password, two-factor sign-in, billing or subscription, workspace members or roles, connected social accounts, or delete an account. Tell the user where to do it in Picmim and never say it was done.
