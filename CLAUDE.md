# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **nextjs-link-preview**, a simple Next.js component library for displaying link preview cards. It's a pure presentational component that accepts title, description, and image props to render beautiful preview cards.

**Key Features:**
- Pure presentational component - no data fetching
- Preset image support for GitHub and npm
- Three size variants (small, medium, large)
- Two layout options (vertical, horizontal)
- Fully customizable styling
- Zero dependencies (only peer dependencies: React, React DOM, Next.js)

## Build System

The component uses Rollup to build both CommonJS and ESM module formats:

```bash
npm run build
```

**Output:**

- `dist/index.js` - CommonJS format
- `dist/index.esm.js` - ES Module format
- `dist/index.d.ts` - TypeScript declarations

**Build Configuration:** [rollup.config.js](rollup.config.js) marks `react`, `react-dom`, and `next` as external peer dependencies (not bundled).

## Architecture

### Component Structure

The library contains a single pure presentational component:

**Component:** [src/nextjs/components/LinkPreview.tsx](src/nextjs/components/LinkPreview.tsx)
- Pure 'use client' React component
- No hooks, no state, no side effects
- Accepts title, description, and image/preset as props
- Three size variants (small/medium/large) controlled by `sizeConfig` object
- Inline styling based on size configuration

### Key Design Patterns

- **Pure Presentational Component**: No data fetching - you provide all the data via props
- **Preset Images**: Built-in support for common platforms (GitHub, npm)
- **Size Variants**: The `sizeConfig` object maps sizes to imageHeight, titleSize, descriptionSize, padding, and lineClamp values
- **Flexible Image Source**: Use either custom `image` URL or `preset` for common platforms

### Dependencies

**Runtime Dependencies:** None

**Peer Dependencies:**
- `next` >= 14.0.0
- `react` >= 18.0.0
- `react-dom` >= 18.0.0

**Dev Dependencies:**
- Rollup build tooling
- TypeScript and type definitions
- Prettier for formatting

## Development Workflow

### Testing the Component

To test the component:

```bash
npm test
```

This builds the component and starts the demo at [http://localhost:3000](http://localhost:3000).

Alternatively, for development:

```bash
npm run dev
```

### Making Changes

1. Edit [src/nextjs/components/LinkPreview.tsx](src/nextjs/components/LinkPreview.tsx)
2. Run `npm test` or `npm run dev` to see changes
3. The component is rebuilt automatically

### TypeScript Configuration

[tsconfig.json](tsconfig.json) is configured for:

- Target: ES6
- Module: ESNext (Rollup handles module format conversion)
- JSX: React
- Strict mode enabled

## Usage

### Installation

```bash
npm install nextjs-link-preview
```

### Basic Usage

```tsx
import { LinkPreview } from 'nextjs-link-preview';

export default function Page() {
  return (
    <LinkPreview
      url="https://example.com"
      title="Example Site"
      description="This is an example website"
      image="https://example.com/preview.png"
      size="medium"
    />
  );
}
```

### With Presets

```tsx
// GitHub preset
<LinkPreview
  url="https://github.com/user/repo"
  title="My Repository"
  description="A cool open source project"
  preset="github"
  size="medium"
/>

// npm preset
<LinkPreview
  url="https://npmjs.com/package/my-package"
  title="my-package"
  description="An awesome npm package"
  preset="npm"
  layout="horizontal"
/>
```

### Size Variants

```tsx
// Small
<LinkPreview url="..." title="..." image="..." size="small" />

// Medium (default)
<LinkPreview url="..." title="..." image="..." size="medium" />

// Large
<LinkPreview url="..." title="..." image="..." size="large" />
```

### Layout Options

```tsx
// Vertical (default) - image on top
<LinkPreview url="..." title="..." image="..." layout="vertical" />

// Horizontal - image on left
<LinkPreview url="..." title="..." image="..." layout="horizontal" />
```

## Component Props

```typescript
interface LinkPreviewProps {
  url: string;              // Link destination
  title: string;            // Preview card title
  description?: string;     // Preview card description (optional)
  image?: string;          // Custom image URL (optional)
  preset?: "github" | "npm"; // Use preset image (optional)
  size?: "small" | "medium" | "large"; // Card size (default: "medium")
  layout?: "vertical" | "horizontal"; // Layout direction (default: "vertical")
  width?: string | number;  // Custom width (default: "100%")
  height?: string | number; // Custom height (default: "auto")
  className?: string;       // Additional CSS classes
}
```

**Note:** Either `image` or `preset` should be provided. If both are provided, `image` takes precedence.
