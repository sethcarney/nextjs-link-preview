# Copilot Instructions for Next.js Link Preview Package

## Project Overview

This is a Next.js TypeScript component library that provides a customizable link preview component with server-side metadata fetching. The component fetches and displays metadata (title, description, image) from URLs using Open Graph and meta tags, eliminating CORS issues by using Next.js API routes.

**Package Name:** nextjs-link-preview
**Version:** 1.0.0
**License:** MIT

## Architecture

### Project Structure

```
nextjs-link-preview/
├── src/
│   └── nextjs/
│       ├── app/
│       │   └── api/
│       │       └── preview/
│       │           └── route.ts       # Server-side API route
│       └── components/
│           └── LinkPreview.tsx        # Client component
├── nextjs-demo/                       # Interactive demo app
└── package.json
```

### Key Technologies

- **Next.js** (>=14.0.0) - App Router with server-side API routes
- **React** (>=18.0.0) - Client components with hooks (useState, useEffect)
- **TypeScript** - Strict type checking enabled
- **Axios** - HTTP client for server-side metadata fetching
- **Cheerio** - Server-side HTML parsing and metadata extraction

## Core Components

### 1. Next.js API Route (`src/nextjs/app/api/preview/route.ts`)

**Purpose:** Server-side endpoint that fetches and extracts metadata without CORS issues

**Key Features:**

- Server-side metadata fetching (eliminates CORS issues)
- Accepts URL as query parameter: `GET /api/preview?url=...`
- Uses axios to fetch HTML with proper User-Agent headers
- Parses HTML with cheerio to extract Open Graph and meta tags
- Returns JSON response with metadata

**Metadata Extraction Priority:**

1. **Title:** og:title → twitter:title → `<title>` tag
2. **Description:** og:description → twitter:description → meta description
3. **Image:** og:image → twitter:image

**Response Format:**

```json
{
  "title": "Page Title",
  "description": "Page description",
  "image": "https://example.com/image.jpg",
  "url": "https://example.com"
}
```

**Error Handling:** Returns 400 for missing URL, 500 for fetch failures

### 2. LinkPreview Client Component (`src/nextjs/components/LinkPreview.tsx`)

**Purpose:** Client-side React component that displays link preview cards

**Key Features:**

- 'use client' component with React hooks
- Calls API route instead of fetching URLs directly (no CORS!)
- Three size variants: small, medium, large
- Two layout options: vertical (image top) and horizontal (image left)
- Automatic metadata fetching on mount
- Loading and error states
- Callback functions (onLoad, onError)
- Inline styling based on size configuration
- Click-through to original URL (opens in new tab)

**Size Configuration:**

- **Small:** 120px image, 14px title, 12px description, 1-line clamp, 8px padding
- **Medium:** 200px image, 16px title, 14px description, 2-line clamp, 12px padding (default)
- **Large:** 300px image, 20px title, 16px description, 3-line clamp, 16px padding

**Props Interface (LinkPreviewProps):**

- `url` (required): The URL to preview
- `size`: "small" | "medium" | "large" (default: "medium")
- `layout`: "vertical" | "horizontal" (default: "vertical")
- `width`: string | number (default: "100%")
- `height`: string | number (default: "auto")
- `className`: string for custom CSS classes
- `apiEndpoint`: string (default: "/api/preview") - custom API route URL
- `onError`: Callback when metadata fetch fails
- `onLoad`: Callback when metadata is successfully loaded

### 3. Type Definitions

**LinkPreviewData:**

- `title`: string - Page title
- `description`: string - Page description
- `image`: string - Preview image URL
- `url`: string - Original URL

**LinkPreviewSize:** "small" | "medium" | "large"

**LinkPreviewLayout:** "vertical" | "horizontal"

## Build System

### Next.js Component (Recommended)

The Next.js version **doesn't require a separate build step** - files are copied directly into your Next.js project:

- **API Route:** `src/nextjs/app/api/preview/route.ts`
- **Component:** `src/nextjs/components/LinkPreview.tsx`

These files are built as part of your Next.js application's build process (`next build`).

### Testing the Component

Use the interactive demo application in `nextjs-demo/` to test changes:

```bash
cd nextjs-demo
npm install
npm run dev
```

The demo runs on http://localhost:3000 with live reload during development.

### Legacy Build (Rollup)

The legacy React-only version uses Rollup to build CommonJS and ESM formats, but has CORS limitations and is **not recommended for production**. The legacy files are in `src/components/` and `src/utils/`.

## Development Guidelines

### Code Style

1. **TypeScript:**

   - Use strict mode
   - Explicit type annotations for function parameters and return types
   - Interface over type for object shapes
   - No implicit any

2. **React:**

   - Functional components with hooks
   - Use React.FC for component typing
   - Optional callback chaining with `?.()` syntax
   - Proper dependency arrays for useEffect

3. **Error Handling:**

   - Wrap async operations in try-catch
   - Provide user-friendly error messages
   - Call error callbacks when provided

4. **Styling:**
   - Inline styles for component-level styling
   - Support custom className for user overrides
   - Responsive design with percentage-based widths

### When Making Changes

#### Adding New Features

- Maintain backward compatibility with existing props
- Update TypeScript types inline in component files
- Consider both size variants and layout options when adding visual features
- Test in the `nextjs-demo/` application before finalizing

#### Modifying Metadata Extraction

- Work in `src/nextjs/app/api/preview/route.ts` (server-side)
- Maintain priority order for fallbacks (OG → Twitter → standard meta tags)
- Test with various URLs (news sites, GitHub, social media, Reddit)
- Ensure error messages are descriptive and return proper HTTP status codes
- Remember: This runs on the server, not in the browser!

#### Styling Updates

- Modify `sizeConfig` object in `src/nextjs/components/LinkPreview.tsx`
- Keep size variants visually consistent
- Test both vertical and horizontal layouts
- Test responsiveness at different viewport sizes
- Maintain accessibility (color contrast, focus states, ARIA labels)

#### Adding New Props

1. Add to `LinkPreviewProps` interface in the component file
2. Destructure in component with default value if optional
3. Apply prop logic in component render or useEffect
4. Update README.md and CLAUDE.md with usage examples
5. Test in the demo application

### Testing Considerations

- Test with various URL types in the `nextjs-demo/` application
- Verify **no CORS issues** with GitHub, Twitter, Reddit, etc.
- Test with URLs that have missing metadata (no image, no description, etc.)
- Verify loading states appear appropriately
- Check error states when URLs are invalid or unreachable
- Test all three size variants (small, medium, large)
- Test both layout options (vertical, horizontal)
- Verify server-side API route returns proper HTTP status codes
- Ensure TypeScript types compile without errors
- Test with very long URLs and long metadata text

### Common Patterns

**Adding a new size variant:**

```typescript
// In src/nextjs/components/LinkPreview.tsx
const sizeConfig = {
  small: { ... },
  medium: { ... },
  large: { ... },
  xlarge: {
    imageHeight: "400px",
    titleSize: "24px",
    descriptionSize: "18px",
    padding: "20px",
    lineClamp: 4
  }
};

// Update type
type LinkPreviewSize = "small" | "medium" | "large" | "xlarge";
```

**Adding new metadata field:**

```typescript
// 1. Update interface in src/nextjs/components/LinkPreview.tsx
interface LinkPreviewData {
  title: string;
  description: string;
  image: string;
  url: string;
  siteName?: string; // New field
}

// 2. Extract in API route: src/nextjs/app/api/preview/route.ts
const metadata = {
  title: $('meta[property="og:title"]').attr("content") || $("title").text(),
  description: $('meta[property="og:description"]').attr("content") || "",
  image: $('meta[property="og:image"]').attr("content") || "",
  url: targetUrl,
  siteName: $('meta[property="og:site_name"]').attr("content") || "" // Extract here
};

// 3. Display in component: src/nextjs/components/LinkPreview.tsx
{data.siteName && (
  <span style={{ fontSize: "12px", color: "#999" }}>
    {data.siteName}
  </span>
)}
```

**Adding a custom API endpoint handler:**

```typescript
// User can override the default /api/preview endpoint
<LinkPreview
  url="https://example.com"
  apiEndpoint="/api/custom-preview"
/>
```

## Dependencies

### Required for Next.js Version

- **Next.js** (>=14.0.0) - Framework with App Router support
- **React** (>=18.0.0) - UI library
- **React DOM** (>=18.0.0) - React renderer
- **axios** (^1.6.0) - HTTP client for server-side fetching
- **cheerio** (^1.0.0-rc.12) - Server-side HTML parser

### Dev Dependencies

- **TypeScript** (^5.0.0) - Type checking
- **@types/node** - Node.js type definitions
- **@types/react** - React type definitions

## Usage in Your Next.js Project

### 1. Copy Files

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

### 3. Use the Component

```tsx
import { LinkPreview } from '@/components/LinkPreview';

export default function Page() {
  return <LinkPreview url="https://github.com" size="medium" />;
}
```

## Important Notes

- **No CORS issues!** Metadata is fetched server-side via Next.js API route
- Server-to-server requests bypass browser CORS policies
- Works with GitHub, Twitter, Reddit, and any public URL
- Links open in new tab with `rel="noopener noreferrer"` for security
- Loading state shows "Loading preview..." text
- Error state shows "Error loading preview" text
- Component re-fetches metadata when `url` prop changes
- Images use `background-image` for better control over sizing/positioning
- API route runs on the server, component runs on the client ('use client')
- Supports both vertical (image top) and horizontal (image left) layouts

## Anti-Patterns to Avoid

❌ Don't fetch metadata directly in the component (use API route)
❌ Don't bypass the API route (will cause CORS issues)
❌ Don't use class components (use hooks)
❌ Don't ignore TypeScript errors
❌ Don't make breaking changes to public API without major version bump
❌ Don't add heavy dependencies (keep bundle size reasonable)
❌ Don't use external CSS files (keep it self-contained with inline styles)
❌ Don't forget to handle edge cases (missing metadata, network errors, malformed URLs)
❌ Don't hardcode the API endpoint (use the `apiEndpoint` prop for customization)
❌ Don't forget to test both layouts and all size variants

## Questions to Ask When Reviewing Code

- Does this maintain backward compatibility with existing props?
- Are TypeScript types properly defined?
- Will this work with all three size variants (small, medium, large)?
- Will this work with both layouts (vertical, horizontal)?
- Is error handling comprehensive in both API route and component?
- Does the API route return proper HTTP status codes?
- Are we properly handling CORS by using server-side fetching?
- Is the metadata extraction priority correct (OG → Twitter → standard)?
- Is the API intuitive for Next.js developers?
- Have we tested with various URLs (GitHub, Twitter, Reddit, etc.)?
