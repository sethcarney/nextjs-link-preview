# Quick Start Guide

## Test the Link Preview Component

To run the interactive test suite and start testing links:

```bash
# Install dependencies (first time only)
npm run demo:install

# Start the demo
npm run demo
```

This will:
1. Start a Next.js development server
2. Automatically open your browser at http://localhost:3000
3. Show you an interactive interface to test URLs

## What You Can Test

The demo application includes:

### 1. Custom URL Testing
- Enter any URL in the input field
- Click "Test Preview" to see the link preview
- **Works with ANY URL** - no CORS issues!

### 2. Example URLs
- Quick-test buttons for popular websites
- One-click testing of GitHub, Wikipedia, Stack Overflow, Twitter, Reddit, etc.
- ✅ All work perfectly (no CORS issues!)

### 3. Size Variants
- Toggle between **Small**, **Medium**, and **Large** sizes
- See how each size affects the preview display

### 4. Metadata Viewer
- View extracted title, description, and image URL
- Understand what data was scraped from the link

### 5. Side-by-Side Comparison
- Compare all three size variants at once
- See the differences in layout and text truncation

## Why Next.js? No CORS Issues!

Unlike browser-based React components, this Next.js implementation has **NO CORS issues** because:

✅ **Server-side fetching** - API route fetches metadata on the server
✅ **Server-to-server requests** - No browser CORS policies
✅ **Works with any public URL** - GitHub, Twitter, Reddit, etc.

**What works:**
- github.com ✅
- twitter.com ✅
- reddit.com ✅
- Any public website ✅

## Using in Your Own Next.js Project

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
  return (
    <LinkPreview url="https://github.com" size="medium" />
  );
}
```

That's it! No CORS issues, works with any URL.

## Features

- ✅ **No CORS issues** - Works with any public URL
- ✅ **Server-side rendering** - Fast initial page loads
- ✅ **Three size variants** - Small, Medium, Large
- ✅ **TypeScript support** - Full type safety
- ✅ **Customizable** - Props for width, className, callbacks
- ✅ **Production-ready** - Deploy to Vercel, Netlify, etc.

## Need Help?

- Check [README.md](README.md) for full documentation
- See [nextjs-demo/README.md](nextjs-demo/README.md) for demo-specific info
- Review the source code in `src/nextjs/` for implementation details
