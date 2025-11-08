# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **react-link-preview**, a React component library for generating link preview cards with metadata extraction. The library fetches Open Graph and meta tags from URLs to display rich preview cards with images, titles, and descriptions.

## Build System

The project uses Rollup to build both CommonJS and ESM module formats:

```bash
npm run build
```

**Output:**
- `dist/index.js` - CommonJS format
- `dist/index.esm.js` - ES Module format
- `dist/index.d.ts` - TypeScript declarations

**Build Configuration:** [rollup.config.js](rollup.config.js) marks `react`, `react-dom`, `axios`, and `cheerio` as external dependencies (not bundled).

## Architecture

### Module Structure

The codebase follows a clean three-layer architecture:

1. **Component Layer** ([src/components/LinkPreview.tsx](src/components/LinkPreview.tsx))
   - React functional component with hooks
   - Three size variants (small/medium/large) controlled by `sizeConfig` object
   - Manages loading/error states internally
   - Inline styling based on size configuration

2. **Utility Layer** ([src/utils/metadata.ts](src/utils/metadata.ts))
   - `fetchMetadata()` function fetches URL and parses HTML
   - Uses axios for HTTP requests, cheerio for HTML parsing
   - Extraction priority: Open Graph tags → standard meta tags → fallbacks
   - Returns `LinkPreviewData` with title, description, image, and url

3. **Type Definitions** ([src/types.ts](src/types.ts))
   - `LinkPreviewData` - metadata structure
   - `LinkPreviewProps` - component props interface
   - `LinkPreviewSize` - size variant type

**Entry Point:** [src/index.ts](src/index.ts) exports the component and all types.

### Key Design Patterns

- **Client-Side Metadata Fetching**: The component fetches metadata on the client using axios/cheerio. This creates CORS limitations for production use (see README for proxy/SSR solutions).
- **Size Variants**: The `sizeConfig` object maps sizes to imageHeight, titleSize, descriptionSize, padding, and lineClamp values.
- **Error Boundaries**: Component handles loading and error states internally, with optional `onLoad` and `onError` callbacks.

### Dependencies

**Runtime:**
- `axios` - HTTP requests for fetching URL content
- `cheerio` - Server-side jQuery-like HTML parsing (works in browser via bundling)
- `tslib` - TypeScript runtime helpers

**Peer Dependencies:**
- `react` >= 16.8.0, `react-dom` >= 16.8.0

## Development Workflow

### Testing the Component

Use the demo application in [demo/](demo/) to test changes:

```bash
cd demo
npm install
npm run dev
```

The demo uses Vite and includes examples from the README.

### Making Changes

When modifying the component:
1. Edit source files in [src/](src/)
2. Run `npm run build` to compile
3. Test in the demo app by linking or installing locally
4. Ensure both CommonJS and ESM outputs work correctly

### TypeScript Configuration

[tsconfig.json](tsconfig.json) is configured for:
- Target: ES6
- Module: ESNext (Rollup handles module format conversion)
- JSX: React
- Strict mode enabled
