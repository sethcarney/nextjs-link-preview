# Copilot Instructions for React Link Preview Package

## Project Overview

This is a React TypeScript npm package that provides a customizable link preview component. The component fetches and displays metadata (title, description, image) from URLs using Open Graph and meta tags.

**Package Name:** react-link-preview  
**Version:** 1.0.0  
**License:** MIT

## Architecture

### Project Structure

```
src/
  ├── index.ts              # Main export file
  ├── types.ts              # TypeScript type definitions
  ├── components/
  │   └── LinkPreview.tsx   # Main React component
  └── utils/
      └── metadata.ts       # Metadata fetching logic
```

### Key Technologies

- **React** (>=16.8.0) - Using hooks (useState, useEffect)
- **TypeScript** - Strict type checking enabled
- **Axios** - HTTP client for fetching URLs
- **Cheerio** - HTML parsing and metadata extraction
- **Rollup** - Module bundler for creating CJS and ESM outputs

## Core Components

### 1. LinkPreview Component (`src/components/LinkPreview.tsx`)

**Purpose:** Main React component that displays link preview cards

**Key Features:**
- Three size variants: small, medium, large
- Automatic metadata fetching on mount
- Loading and error states
- Callback functions (onLoad, onError)
- Inline styling for easy customization
- Click-through to original URL (opens in new tab)

**Size Configuration:**
- **Small:** 120px image, 14px title, 12px description, 1-line clamp
- **Medium:** 200px image, 16px title, 14px description, 2-line clamp (default)
- **Large:** 300px image, 20px title, 16px description, 3-line clamp

**Props Interface (LinkPreviewProps):**
- `url` (required): The URL to preview
- `size`: "small" | "medium" | "large" (default: "medium")
- `width`: string | number (default: "100%")
- `height`: string | number (default: "auto")
- `className`: string for custom CSS classes
- `onError`: Callback when metadata fetch fails
- `onLoad`: Callback when metadata is successfully loaded

### 2. Metadata Fetcher (`src/utils/metadata.ts`)

**Purpose:** Fetches and extracts metadata from URLs

**Extraction Priority:**
1. **Title:** og:title → <title> tag
2. **Description:** og:description → meta description
3. **Image:** og:image → twitter:image

**Error Handling:** Throws descriptive error if fetch fails

### 3. Type Definitions (`src/types.ts`)

**LinkPreviewData:**
- `title`: string
- `description`: string
- `image`: string
- `url`: string

**LinkPreviewSize:** "small" | "medium" | "large"

## Build System

### Rollup Configuration

**Outputs:**
- `dist/index.js` - CommonJS format
- `dist/index.esm.js` - ES Module format
- `dist/index.d.ts` - TypeScript declarations

**External Dependencies:** react, react-dom, axios, cheerio (not bundled)

**Build Command:** `npm run build`

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
- Update TypeScript types in `types.ts`
- Export new types from `index.ts` if public-facing
- Consider size variants when adding visual features

#### Modifying Metadata Extraction
- Work in `src/utils/metadata.ts`
- Maintain priority order for fallbacks (OG → standard meta tags)
- Test with various URLs (news sites, GitHub, social media)
- Ensure error messages are descriptive

#### Styling Updates
- Modify `sizeConfig` object in `LinkPreview.tsx`
- Keep size variants visually consistent
- Test responsiveness at different viewport sizes
- Maintain accessibility (color contrast, focus states)

#### Adding New Props
1. Add to `LinkPreviewProps` interface in `types.ts`
2. Destructure in component with default value if optional
3. Apply prop logic in component render or useEffect
4. Update README.md with usage examples

### Testing Considerations

- Test with various URL types (HTTPS required for most sites)
- Handle missing metadata gracefully (no image, no description, etc.)
- Verify loading states appear appropriately
- Check error states when URLs are invalid or unreachable
- Test all three size variants
- Verify TypeScript types compile without errors

### Common Patterns

**Adding a new size variant:**
```typescript
const sizeConfig = {
  // ... existing sizes
  xlarge: {
    imageHeight: "400px",
    titleSize: "24px",
    descriptionSize: "18px",
    padding: "20px",
    lineClamp: 4
  }
};

// Update type
export type LinkPreviewSize = "small" | "medium" | "large" | "xlarge";
```

**Adding new metadata field:**
```typescript
// 1. Update interface in types.ts
export interface LinkPreviewData {
  // ... existing fields
  siteName?: string;
}

// 2. Extract in metadata.ts
metadata.siteName = $('meta[property="og:site_name"]').attr("content") || "";

// 3. Display in LinkPreview.tsx
{data.siteName && (
  <span style={{ fontSize: "12px", color: "#999" }}>
    {data.siteName}
  </span>
)}
```

## Dependencies

### Production
- **axios** (^1.6.0) - HTTP client
- **cheerio** (^1.0.0-rc.12) - HTML parser
- **tslib** (^2.8.1) - TypeScript runtime helpers

### Peer Dependencies
- **react** (>=16.8.0)
- **react-dom** (>=16.8.0)

### Dev Dependencies
- Rollup plugins for bundling
- TypeScript compiler and types

## Publishing Guidelines

1. Run `npm run build` to create distribution files
2. Ensure `dist/` folder contains: index.js, index.esm.js, index.d.ts
3. Update version in package.json following semver
4. Test in demo app before publishing
5. Only `dist/` folder is published (defined in `files` field)

## Important Notes

- Component fetches metadata client-side (may hit CORS issues with some URLs)
- Links open in new tab with `rel="noopener noreferrer"` for security
- Loading state shows simple "Loading..." text (customizable)
- Error state shows "Error loading preview" (customizable)
- Component re-fetches metadata when `url` prop changes
- Images use background-image for better control over sizing/positioning

## Anti-Patterns to Avoid

❌ Don't bundle React or peer dependencies  
❌ Don't use class components (use hooks)  
❌ Don't ignore TypeScript errors  
❌ Don't make breaking changes to public API without major version bump  
❌ Don't add heavy dependencies (keep bundle size small)  
❌ Don't use external CSS files (keep it self-contained)  
❌ Don't forget to handle edge cases (missing metadata, network errors)

## Questions to Ask When Reviewing Code

- Does this maintain backward compatibility?
- Are TypeScript types properly defined and exported?
- Will this work with all three size variants?
- Is error handling comprehensive?
- Does this increase bundle size significantly?
- Are there any new peer dependencies?
- Is the API intuitive for end users?
