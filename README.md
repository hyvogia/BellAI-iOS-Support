# BellAI Support

A responsive support frontend built with React, Vite, and TypeScript. Content is based on the supplied BellAI iOS v1.0 documentation; layout follows the supplied Signal Support reference.

## Credits

Credit to [Signal Support](https://support.signal.org/hc/en-us) for the support website template and layout inspiration.

## Development

```sh
npm install
npm run dev
```

`npm run build` runs TypeScript checks and creates the production site in `dist`. `npm run preview` serves the build locally.

## Feature-based structure

- `src/app`: application shell, hash-based navigation, and global styling.
- `src/features/knowledge-base`: typed category/article content and article rendering.
- `src/features/search`: search UI and full-text matching.
- `src/shared/ui`: reusable visual primitives.

Add documentation in `src/features/knowledge-base/content.ts`. Category article lists update from this data. Every article is available through its category and full-text search. All links use hash routing so static hosts need no route rewrites. Search matches every query word across article titles, summaries, and sections. Feedback is acknowledged only for the current article session; it is not submitted to a backend. Only English documentation is provided.

No BellAI server connection or credentials are needed. This site documents the iOS app; it does not access health data, mail, or the user's Mac.
