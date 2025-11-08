# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **nextjs-link-preview**, a Next.js component library for generating link preview cards with metadata extraction. The library uses a Next.js API route to fetch Open Graph and meta tags from URLs server-side, completely eliminating CORS issues. It displays rich preview cards with images, titles, and descriptions.

**Key Innovation:** Unlike browser-based solutions that face CORS restrictions, this library fetches metadata on the server using Next.js API routes, enabling it to work with any public URL (GitHub, Twitter, Reddit, etc.).

## Build System

### Next.js Component (Recommended)

The Next.js version doesn't require a separate build step - files are used directly in your Next.js project:

- **Component:** [src/nextjs/components/LinkPreview.tsx](src/nextjs/components/LinkPreview.tsx)
- **API Route:** [src/nextjs/app/api/preview/route.ts](src/nextjs/app/api/preview/route.ts)

Simply copy these files into your Next.js project and they'll be built as part of your Next.js build process.

### Legacy Build (Rollup)

The legacy version uses Rollup to build both CommonJS and ESM module formats:

```bash
npm run build
```

**Output:**

- `dist/index.js` - CommonJS format
- `dist/index.esm.js` - ES Module format
- `dist/index.d.ts` - TypeScript declarations

**Build Configuration:** [rollup.config.js](rollup.config.js) marks `react`, `react-dom`, `axios`, and `cheerio` as external dependencies (not bundled).

**Note:** The legacy build has CORS limitations and is not recommended for production use.

## Architecture

### Next.js Implementation Structure

The library follows a modern Next.js App Router architecture with server-side metadata fetching:

1. **Next.js API Route** ([src/nextjs/app/api/preview/route.ts](src/nextjs/app/api/preview/route.ts))
   - Server-side endpoint that handles metadata fetching
   - Uses axios to fetch HTML (with proper User-Agent headers)
   - Parses HTML with cheerio to extract Open Graph/meta tags
   - Returns JSON response with title, description, image, and URL
   - **Eliminates CORS issues** by fetching server-to-server

2. **Client Component** ([src/nextjs/components/LinkPreview.tsx](src/nextjs/components/LinkPreview.tsx))
   - 'use client' React component with hooks
   - Calls the API route instead of fetching URLs directly
   - Three size variants (small/medium/large) controlled by `sizeConfig` object
   - Manages loading/error states internally
   - Inline styling based on size configuration
   - Optional `apiEndpoint` prop to customize the API route URL

3. **Legacy Browser Version** (deprecated, has CORS issues)
   - [src/components/LinkPreview.tsx](src/components/LinkPreview.tsx) - Original client-side component
   - [src/utils/metadata.ts](src/utils/metadata.ts) - Direct URL fetching utility
   - [src/types.ts](src/types.ts) - Type definitions
   - **Not recommended for production** due to CORS limitations

### Key Design Patterns

- **Server-Side Metadata Fetching**: The Next.js API route fetches metadata on the server, completely eliminating CORS issues. The client component calls `/api/preview?url=...` which handles all fetching server-side.
- **Size Variants**: The `sizeConfig` object maps sizes to imageHeight, titleSize, descriptionSize, padding, and lineClamp values.
- **Error Boundaries**: Component handles loading and error states internally, with optional `onLoad` and `onError` callbacks.
- **Customizable API Endpoint**: The `apiEndpoint` prop allows overriding the default `/api/preview` route for custom implementations.

### Dependencies

**Next.js Version (Recommended):**

- `next` - Next.js framework with App Router support
- `react` >= 18.0.0, `react-dom` >= 18.0.0
- `axios` - HTTP requests for server-side fetching
- `cheerio` - Server-side HTML parsing and metadata extraction

**Legacy Version:**

- `axios` - HTTP requests for fetching URL content
- `cheerio` - HTML parsing (limited by CORS in browser)
- `tslib` - TypeScript runtime helpers
- `react` >= 16.8.0, `react-dom` >= 16.8.0

## Development Workflow

### Testing the Component

Use the Next.js demo application in [nextjs-demo/](nextjs-demo/) to test changes:

```bash
cd nextjs-demo
npm install
npm run dev
```

The demo runs on [http://localhost:3000](http://localhost:3000) and includes:

- Interactive URL input for testing any link
- Pre-configured example URLs (GitHub, Twitter, Reddit, etc.)
- All three size variants with side-by-side comparison
- Metadata viewer showing extracted data
- **No CORS issues** - works with any public URL

**Legacy Demo:** The [demo/](demo/) folder contains a Vite-based demo of the old client-side version, which has CORS limitations.

### Making Changes

When modifying the Next.js component:

1. Edit source files in [src/nextjs/](src/nextjs/):
   - [src/nextjs/app/api/preview/route.ts](src/nextjs/app/api/preview/route.ts) - API route logic
   - [src/nextjs/components/LinkPreview.tsx](src/nextjs/components/LinkPreview.tsx) - Client component
2. Test changes in the [nextjs-demo/](nextjs-demo/) application
3. The demo hot-reloads automatically during development
4. Verify metadata extraction works for various URL types

**For Legacy Version:**

1. Edit files in [src/components/](src/components/) and [src/utils/](src/utils/)
2. Run `npm run build` to compile
3. Test in [demo/](demo/) (note: CORS limitations apply)

### TypeScript Configuration

[tsconfig.json](tsconfig.json) is configured for:

- Target: ES6
- Module: ESNext (Rollup handles module format conversion)
- JSX: React
- Strict mode enabled

## Usage in a Next.js Project

To use the component in your own Next.js application:

### 1. Copy Required Files

```bash
# Copy the API route
cp src/nextjs/app/api/preview/route.ts YOUR_PROJECT/app/api/preview/route.ts

# Copy the component
cp src/nextjs/components/LinkPreview.tsx YOUR_PROJECT/components/LinkPreview.tsx
```

### 2. Install Dependencies

```bash
npm install axios cheerio
```

### 3. Use in Your Pages

```tsx
import { LinkPreview } from "@/components/LinkPreview";

export default function Page() {
  return (
    <LinkPreview
      url="https://github.com"
      size="medium"
      onLoad={(data) => console.log("Loaded:", data)}
      onError={(error) => console.error("Error:", error)}
    />
  );
}
```

### How It Works

1. The `LinkPreview` component renders on the client ('use client')
2. It calls `GET /api/preview?url=...` to fetch metadata
3. The API route runs on the server, fetches the URL, and parses metadata
4. No CORS issues because the fetching happens server-to-server
5. The component receives the metadata and displays the preview card
