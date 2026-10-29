# Picmim images in detail

## The scene

Image tools take a structured `scene`, never a free-text prompt.

| Field | What to put in it |
| --- | --- |
| `goal` (required) | What the picture must do for the post, in one sentence. |
| `subject` (required) | The real product, place, person or object to show. |
| `action`, `background`, `lighting`, `style` | Short, concrete descriptions. |
| `composition`, `camera` | Framing and lens, when it matters. |
| `photo_register` | `ugc` (honest phone photo, not product photography), `editorial` (mood, room to breathe) or `commercial` (polished, real-camera look). Leave it out to let Picmim choose. |
| `image_prompt_template_id` | One template from the schema when it clearly fits. Leave it out for a custom picture. |
| `text_blocks` | Exact on-image words the user gave or approved, at most 3 (headline, supporting line, call to action), each at most 90 characters. Keep them short. |
| `references` | Each reference image with its role: `subject`, `style`, `background`, `composition`, `material`, `palette` or `identity`. |
| `preserve_rules` | For edits: what must not change. |
| `platform_format`, `aspect_ratio` | The target placement, for example `instagram_story` or `9:16`. |

When the user supplies a reference for the background or the composition, keep it as the main reference and don't overwrite it with invented details.

## Templates

- Pick a template only when the fit is clear from the goal, platform, brand and references. If two very different directions are both plausible, offer the user two or three short options in plain words before generating.
- Templates for a brand, a product or a person need that real photo as a reference. A brand style guide alone doesn't count. Never invent a product, team member or face to fit a template.
- Promotional templates are for genuine offers only, never for an ordinary post.
- Never combine templates, invent a template ID, or show template IDs to the customer.

## What a Picmim picture may show

- Only subjects supported by the brand profile, the brief, the caption or a supplied photo. No unrelated products, packaging, appliances, food or props.
- Real photos decide identity, proportions, materials, labels and scale. Keep real text, logos, labels and packaging as they are; never add packaging or labels that don't exist.
- Brand colours win over any colour in the description.
- Never show or imply anything the brand's restricted claims forbid.
- For a value post: no price badges, sale layouts, discount signs, false urgency, pushy buying cues or offer framing. A product appears only as a natural detail.
- For an audience of children or families: family-appropriate, parent-led scenes.
- On-image text: only the exact supplied words, in the caption's language, with no added labels or numbers. Text-only design cards are flat graphics.
- Generated pictures should read as editorial and genuine, never like an ad, unless the post is a real offer.

## Matching the customer's feed

When the user wants pictures like their Instagram, and the library has no good references:

1. Call `get_instagram_recent_media`.
2. Import the chosen stills with `save_external_media` (`source: "instagram"`, each item's `url` set to the returned `import_url`).
3. Generate with those images as references, then attach the result to a post.

Never say you looked at their profile unless a tool returned its images.

## Videos

- `analyze_video` reads a library video (`focus`: one of `general`, `marketing`, `transcript`, `visuals`, `cta`). It uses AI credits. Never describe a video's content, speech or on-screen text without it.
- `create_caption_video` makes a captioned version of a short library video (its description gives the length limit). It returns a queued project, not a finished video. Keep `request_key` the same on retries.
- `get_caption_video` reports progress and gives the editor link. Queued or rendering is not done; check again later, not in a tight loop.
- `render_caption_video` makes a new preview, or a final export only when the user asks for the final video. None of these publish anything.

## Library housekeeping

`create_folder`, `move_media_to_folder`, `create_tag` and `assign_tags_to_media` organise the library. `assign_tags_to_media` replaces a picture's tags rather than adding to them, so send the full set. `show_media` shows one library image again without spending credits.
