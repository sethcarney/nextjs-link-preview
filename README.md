# Next.js Link Preview

A customizable Next.js component for generating beautiful link preview cards with images, titles, and descriptions extracted from URL metadata.

## Why Next.js?

**Browser CORS limitations** prevent client-side link preview components from fetching metadata from most websites. This Next.js implementation solves that problem by:

- ✅ **Server-side fetching**: API route fetches metadata on the server
- ✅ **No CORS issues**: Works with GitHub, Twitter, Reddit, and any public URL
- ✅ **Production-ready**: Deploy to Vercel, Netlify, or any Node.js platform

## Features

- Automatically extracts Open Graph and meta tags from URLs
- Three size variants: small, medium, and large
- Two layout options: vertical (image top) and horizontal (image left)
- Fully customizable styling
- TypeScript support
- Loading and error states
- Callback functions for load and error events
- Responsive design
- **No CORS issues** - works with any public URL!

## Quick Start

### 1. Copy Files to Your Next.js Project

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
    <div>
      <LinkPreview url="https://github.com" size="medium" />
    </div>
  );
}
```

That's it! No CORS issues, works with any URL.

## Usage Examples

### Basic Example

```tsx
import { LinkPreview } from '@/components/LinkPreview';

export default function Page() {
  return (
    <LinkPreview url="https://github.com" />
  );
}
```

### With Size Variants

```tsx
import { LinkPreview } from '@/components/LinkPreview';

export default function Page() {
  return (
    <div>
      {/* Small preview - compact view with 1 line description */}
      <LinkPreview url="https://github.com" size="small" />

      {/* Medium preview (default) - balanced view with 2 line description */}
      <LinkPreview url="https://github.com" size="medium" />

      {/* Large preview - detailed view with 3 line description */}
      <LinkPreview url="https://github.com" size="large" />
    </div>
  );
}
```

### With Horizontal Layout

```tsx
import { LinkPreview } from '@/components/LinkPreview';

export default function Page() {
  return (
    <div>
      {/* Horizontal layout - image on left, text on right */}
      <LinkPreview url="https://github.com" layout="horizontal" size="medium" />

      {/* Vertical layout (default) - image on top, text below */}
      <LinkPreview url="https://github.com" layout="vertical" size="medium" />
    </div>
  );
}
```

### With Custom Styling

```tsx
<LinkPreview
  url="https://github.com"
  width="400px"
  className="my-custom-class"
/>
```

### With Callbacks

```tsx
<LinkPreview
  url="https://github.com"
  onLoad={(data) => console.log('Loaded:', data)}
  onError={(error) => console.error('Error:', error)}
/>
```

## API

### LinkPreview Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `url` | `string` | **required** | The URL to generate a preview for |
| `size` | `"small"` \| `"medium"` \| `"large"` | `"medium"` | Size variant of the preview card |
| `layout` | `"vertical"` \| `"horizontal"` | `"vertical"` | Layout: vertical (image top, text below) or horizontal (image left, text right) |
| `width` | `string` \| `number` | `"100%"` | Width of the preview card |
| `height` | `string` \| `number` | `"auto"` | Height of the preview card |
| `className` | `string` | `""` | Additional CSS class name |
| `apiEndpoint` | `string` | `"/api/preview"` | Custom API endpoint (if you moved the route) |
| `onLoad` | `(data: LinkPreviewData) => void` | `undefined` | Callback when metadata is loaded |
| `onError` | `(error: Error) => void` | `undefined` | Callback when loading fails |

### Size Variants

| Size | Image Height | Title Size | Description Lines | Padding |
|------|--------------|------------|------------------|---------|
| `small` | 120px | 14px | 1 line | 8px |
| `medium` | 200px | 16px | 2 lines | 12px |
| `large` | 300px | 20px | 3 lines | 16px |

### LinkPreviewData Type

```typescript
interface LinkPreviewData {
  title: string;       // Page title (from og:title or <title>)
  description: string; // Page description (from og:description or meta description)
  image: string;       // Preview image URL (from og:image or twitter:image)
  url: string;         // Original URL
}
```

## Testing & Demo

This project includes an interactive test suite built with Next.js to help you experiment with different URLs and size variants.

### Run the Demo

```bash
# Install demo dependencies (first time only)
npm run demo:install

# Start the demo server
npm run demo
```

The demo application will open in your browser at http://localhost:3000 with:
- Interactive URL input for testing any link
- Pre-configured example URLs for popular sites
- Toggle between small, medium, and large sizes
- View extracted metadata
- Side-by-side comparison of all size variants
- **No CORS issues** - test GitHub, Twitter, Reddit, and more!

## How It Works

### 1. API Route (`app/api/preview/route.ts`)

The Next.js API route runs on the server and:
- Receives the URL as a query parameter
- Fetches the HTML using axios
- Parses metadata using Cheerio
- Returns JSON response

This bypasses CORS because it's a server-to-server request.

### 2. Client Component (`components/LinkPreview.tsx`)

The React component:
- Calls the API route (no CORS!)
- Handles loading and error states
- Renders the preview card with metadata

## Deployment

### Vercel (Recommended)

```bash
npm run build
vercel deploy
```

### Other Platforms

This works on any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Any Node.js hosting

## Project Structure

```
link-preview/
├── src/
│   └── nextjs/
│       ├── app/
│       │   └── api/
│       │       └── preview/
│       │           └── route.ts       # Server-side API route
│       └── components/
│           └── LinkPreview.tsx        # Client component
├── nextjs-demo/                       # Interactive demo app
│   ├── src/
│   │   ├── app/
│   │   │   ├── api/preview/
│   │   │   ├── page.tsx              # Demo interface
│   │   │   └── layout.tsx
│   │   └── components/
│   │       └── LinkPreview.tsx
│   └── package.json
└── package.json
```

## Dependencies

### Required
- **Next.js** >= 14.0.0
- **React** >= 18.0.0
- **axios** - For HTTP requests
- **cheerio** - For HTML parsing and metadata extraction

### Dev Dependencies
- TypeScript
- Node types

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Troubleshooting

### "Module not found" errors

Make sure you've installed all dependencies:
```bash
npm install axios cheerio
```

### API route not found

Ensure the API route is at `app/api/preview/route.ts` in your Next.js project.

### Still getting CORS errors

Make sure you're using the Next.js component, not the old React-only version. The component should be calling `/api/preview`, not fetching URLs directly.

## Need Help?

- Check the [demo README](nextjs-demo/README.md) for more details
- Review the source code in `src/nextjs/`
- Open an issue on GitHub
