# Next.js Link Preview

A Next.js component for generating beautiful link preview cards with server-side metadata fetching.

**No CORS issues** - Works with GitHub, Twitter, Reddit, and any public URL!

## Features

- ✅ Server-side fetching via Next.js API routes (no CORS!)
- ✅ Automatic Open Graph and meta tag extraction
- ✅ Three size variants (small, medium, large)
- ✅ Two layouts (vertical, horizontal)
- ✅ TypeScript support
- ✅ Loading and error states
- ✅ Fully customizable styling

## Installation

```bash
npm install nextjs-link-preview axios cheerio
```

## Setup

Run the setup command to create the API route:

```bash
npx nextjs-link-preview
```

This creates the API route at `src/app/api/preview/route.ts` (or `app/api/preview/route.ts` depending on your project structure).

## Usage

```tsx
import { LinkPreview } from "nextjs-link-preview";

export default function Page() {
  return <LinkPreview url="https://github.com" />;
}
```

That's it! The component handles everything automatically.

## Examples

### Size Variants

```tsx
<LinkPreview url="https://github.com" size="small" />
<LinkPreview url="https://github.com" size="medium" /> {/* default */}
<LinkPreview url="https://github.com" size="large" />
```

### Layouts

```tsx
<LinkPreview url="https://github.com" layout="vertical" /> {/* default */}
<LinkPreview url="https://github.com" layout="horizontal" />
```

### With Callbacks

```tsx
<LinkPreview
  url="https://github.com"
  onLoad={(data) => console.log("Loaded:", data)}
  onError={(error) => console.error("Error:", error)}
/>
```

### Custom Styling

```tsx
<LinkPreview url="https://github.com" width="400px" className="my-custom-class" />
```

## Props

| Prop          | Type                                 | Default          | Description                |
| ------------- | ------------------------------------ | ---------------- | -------------------------- |
| `url`         | `string`                             | **required**     | URL to preview             |
| `size`        | `"small"` \| `"medium"` \| `"large"` | `"medium"`       | Preview card size          |
| `layout`      | `"vertical"` \| `"horizontal"`       | `"vertical"`     | Image position             |
| `width`       | `string` \| `number`                 | `"100%"`         | Card width                 |
| `height`      | `string` \| `number`                 | `"auto"`         | Card height                |
| `className`   | `string`                             | `""`             | CSS class name             |
| `apiEndpoint` | `string`                             | `"/api/preview"` | Custom API route path      |
| `onLoad`      | `(data) => void`                     | `undefined`      | Called when metadata loads |
| `onError`     | `(error) => void`                    | `undefined`      | Called when loading fails  |

## Development

```bash
# Run demo
npm run demo

# Build package
npm run build

# Format code
npm run format
```

## How It Works

1. **API Route**: Next.js API route fetches HTML server-side (no CORS!)
2. **Metadata Extraction**: Cheerio parses Open Graph and meta tags
3. **Component**: React component displays the preview card

## License

MIT

## Links

- [GitHub](https://github.com/sethcarney/nextjs-link-preview)
- [npm](https://www.npmjs.com/package/nextjs-link-preview)
