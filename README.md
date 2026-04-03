# Text Atlas (GitHub Pages + Obsidian CMS)

## Obsidian workflow
- Open this repository folder as an Obsidian vault
- Write texts in `_texts/*.md`
- Use frontmatter for `title`, `tags`, `reflection`, and `contexts`
- Store sentence annotations in `data/comments/texts/<slug>.json`
- Sync using the Obsidian Git plugin

## CSS customization
Edit `assets/styles.css`
- palette variables are in `:root`
- accent already set to your fuchsia OKLCH
- font uses Chillax via Fontshare

## Private questionnaire answers
Current starter uses browser localStorage.
For login + private answers:
1. Create Firebase project
2. Add Auth + Firestore config to `assets/questions.js` (or extend `comments.js`)
3. Restrict reads/writes by authenticated user UID
