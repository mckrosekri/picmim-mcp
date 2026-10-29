# Picmim post rules

## Media on posts

- Pass media as `media_ids` (numbers) or `media_uuids`, exactly as a tool returned them. Images and videos only; PDFs never go on posts.
- Bind each caption to the media it describes by ID, never by position in a list. Keep a carousel in the order the user chose.
- The same image may appear on one post's versions for different platforms.
- Videos the user selected are context by default. Call `analyze_video` before describing a video, and post it only when the user asks to post that video.
- An empty caption is allowed only with at least one image or video, and only when the user wants no caption.
- Saved hashtag sets come from `get_hashtag_groups` and saved post templates from `get_templates`. Use their text as returned.

## Stories

- Set `post_type: "story"` only for stories on Instagram or Facebook. Groups and other platforms can't take stories.
- A story holds at most one image or video and needs a connected account on one of those platforms (a Page, not a group).
- A story and a feed post may share a photo at the same time; two feed posts may not.

## YouTube

YouTube posts need at least one video. Find one with `find_library_assets` (`media_type: "video"`) or ask the user to upload one. Images and text-only drafts can't go to YouTube.

## TikTok

TikTok needs publishing options (such as who can see the video) that MCP can't send. `create_posts` keeps the drafts and returns `success: false` with an `edit_url`. Give the user that link so they can choose the options in Picmim. Don't retry the call.

## Duplicates and shared media

Picmim compares posts in slots of 60 minutes: two times less than 60 minutes apart are the same slot; exactly 60 minutes apart is a new one.

- **Exact copy.** A post with the same accounts, captions, media and options as one already scheduled in the same slot is not created again. It comes back in `created` with `already_scheduled: true` and is listed in `skipped_duplicates` (`reason` is `already_scheduled`, or `duplicate_in_batch` for a repeat inside one call). Don't call again for it. Unscheduled drafts and the same post on another day are always created.
- **Same photo or video.** A post that isn't a copy is refused when another scheduled or waiting post on the same account, of the same type, in the same slot, uses any of the same media. The refusal carries `conflicting_post` with its `post_uuid`, `scheduled_at` (UTC), account and `edit_url`. Pick another time or another photo. Text-only posts never conflict.
- **Busy schedule.** Only one request at a time can save scheduled posts for a workspace. When another one holds it too long, nothing is written and the result asks you to read `get_scheduled_and_published_posts` before trying again.

## Statuses

| Status | Meaning | What you can do |
| --- | --- | --- |
| `draft` | Saved, not scheduled | Edit, schedule, publish now, delete |
| `scheduled` | Will publish at its time | Edit, cancel, publish now, delete |
| `needs_approval` | Waiting for someone with approval rights | Edit, approve, reject, delete |
| `published` | On the social network | Duplicate, delete from Picmim |
| `failed` | Publishing failed | Tell the user; duplicate it and schedule the copy if they want |
