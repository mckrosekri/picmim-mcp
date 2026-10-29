# Picmim plans in detail

## Plan statuses

| `status` | Meaning | What to tell the user |
| --- | --- | --- |
| `draft`, `generating` | Picmim is still writing it | "Your posts are being written." Check again later. |
| `reviewing`, `ready` | Posts are ready to look at | Show them and ask what to keep. |
| `finalizing`, `finalized` | Every accepted post is being, or has been, handed to the calendar | The accepted posts are scheduled or waiting for an approver. Check them with `find_posts`. |
| `cancelled` | Stopped | Nothing will be posted from it. |
| `failed` | Couldn't be written | Say so in one sentence and ask whether to try again. |

`get_content_plans` also returns generation progress and the accepted and declined counts. Polling it is free.

## Generation options

- `story_mix`: how many posts go out as stories on Instagram or Facebook, `none`, `some` (about one in three, the default) or `half`. Ignored without an account on one of those platforms.
- `emoji_level`: one of `none`, `minimal`, `balanced`, `expressive`, `max`. Match the brand voice; when unsure, leave it out.
- `content_balance_mode`: `balanced` mixes helpful posts with offers. `conversion_campaign` leans on offers; use it only when the user asks for a sales push.
- `asset_media_ids`: library photos Picmim may use, as a reference for new pictures. `as_is_media_ids`: the photos the user wants posted unchanged.
- `source_urls`: pages about the topic, such as the product page or an event page.
- `caption_language`: set it only when the user wants a language other than the brand's.

## Declining with a reason

Only when the user said why, pass the closest `reason` (one of `not_my_style`, `wrong_topic`, `wrong_product`, `bad_image`, `bad_timing`, `too_salesy`, `too_long`, `wrong_tone`, `weak_cta`, `other`) and their words as `note`. Pim learns from these, so a guessed reason teaches it the wrong thing.

## Why a change is refused

A post change that can't happen returns `success: false`, an `error_code` and a sentence in `error`. Pass the sentence on in your own words, then offer the next step.

| `error_code` | What happened | Next step |
| --- | --- | --- |
| `week_archived` | The week or plan is archived. | Its posts can't change any more. |
| `week_closed` | The week or plan has closed. | Its posts can't change here any more. For a content plan's post, if it's on the calendar (`find_posts`), edit it with `update_post`. |
| `post_already_published` | The post has gone out. | It can't change; offer a new post instead. |
| `post_publishing` | The post is going out right now. | It can't change; check it with `find_posts` in a minute. |
| `post_already_scheduled` | A content plan's accepted post is on the calendar. | Edit the calendar post with `update_post`. |
| `post_being_rewritten` | Pim is still writing a new version of the post. | Try again in a minute. |
| `not_approved` | There was no approval to take back. | Read the post again with `get_content_plans`, then retry once. |
| `approval_rights_required` | The post is approved, and taking it back needs approval rights for the business. | Someone with approval rights has to make the change. |

## Other answers to a change

- `invalid_input`: a required value is missing or empty, such as the photo's `media_id` or `media_uuid`, or the words in `image_text`. Fix it and call once more.
- `nothing_to_change`: `edit_plan_item` got no `content`, `title` or `platform_captions`.
- `unchanged`: the post already is what was asked (the same words on the picture, already a Story or a feed post). Nothing to do.
- `headline_on_picture`: the headline is drawn on the picture, so `edit_plan_item` can't change it. Offer `edit_plan_item_image_text`, which redraws the picture and uses AI credits, and call it only if the user agrees.
- `picture_has_no_words`: the picture has no words to change. Offer a new picture with `request_plan_item_visual` (it uses AI credits; call it only if the user agrees), or a caption change.
- `picture_in_progress`: Pim is still making a picture for this post. Wait a minute, then check with `get_content_plans`.
- `ai_pictures_off`: Pim doesn't draw pictures for this plan, so picture options and polishing are off. Offer one of the customer's photos with `use_plan_item_photo`.
- `not_a_picture_option`: that `media_id` isn't one of this post's picture options. Use a `cover_media_id` from its `visual_variants`.
- `photo_not_found`: the photo isn't in this business's media library. Find it with `find_library_assets`.
- `not_a_photo`: the file is a video or another file, so it can't be the post's picture.
- `post_type_unavailable`: the post can't change format, for example a Story on a post with no Instagram or Facebook account. Pass on the sentence.
- `change_failed`: the change didn't land. With `back_to_waiting_for_approval: true`, the post was approved and now waits for the customer's OK again; tell them both.

## Approval requests

On a connection whose owner approves writes first, every plan post change is queued (`approval_requested: true`) with a preview of the request: what is asked, the post's caption, the change itself (the new words, what the picture should show, the photo, the style and note, or the new time), when the post goes out and, for an approved post of Pim's week, that the change takes its approval back. A new time that has already passed, for a week post waiting for approval, shows where it moves to, as it does when the customer approves it. Tell the user it waits for the owner's approval and don't call the tool again.

## The weekly mode

- New workspaces start in Picmim: each week Pim offers a few directions, writes the week, and the customer approves or skips each post. Pim then publishes the approved posts on schedule.
- The customer can pause and resume Pim, and switch to Picmim Manager at any time; switching never deletes posts or plans.
- Auto-approve is an opt-in, off by default, and warns the owner before it approves anything. Extra posts asked for later in the week are always approved one by one.
- Over MCP you can approve or skip the week's posts, change their words, rewrite them, move them, turn them into Stories, change their picture or the words on it, and choose what the week focuses on. Pausing, switching mode and auto-approve stay in Picmim.
- The week is found without a `plan_id`: the live week, or the first-posts preview standing in for the first week.
