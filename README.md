# React Link Preview

A customizable React component for generating beautiful link preview cards with images, titles, and descriptions extracted from URL metadata.

## Features

- Automatically extracts Open Graph and meta tags from URLs
- Three size variants: small, medium, and large
- Fully customizable styling
- TypeScript support
- Loading and error states
- Callback functions for load and error events
- Responsive design

## Installation

```bash
npm install react-link-preview
```

or

```bash
yarn add react-link-preview
```

## Usage

### Basic Example

```tsx
import { LinkPreview } from 'react-link-preview';

function App() {
  return (
    <LinkPreview url="https://github.com" />
  );
}
```

### With Size Variants

```tsx
import { LinkPreview } from 'react-link-preview';

function App() {
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

### With Custom Styling

```tsx
import { LinkPreview } from 'react-link-preview';

function App() {
  return (
    <LinkPreview
      url="https://github.com"
      width="400px"
      height="auto"
      className="my-custom-class"
    />
  );
}
```

### With Callbacks

```tsx
import { LinkPreview } from 'react-link-preview';

function App() {
  const handleLoad = (data) => {
    console.log('Loaded metadata:', data);
  };

  const handleError = (error) => {
    console.error('Failed to load preview:', error);
  };

  return (
    <LinkPreview
      url="https://github.com"
      onLoad={handleLoad}
      onError={handleError}
    />
  );
}
```

## API

### LinkPreview Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `url` | `string` | **required** | The URL to generate a preview for |
| `size` | `"small"` \| `"medium"` \| `"large"` | `"medium"` | Size variant of the preview card |
| `width` | `string` \| `number` | `"100%"` | Width of the preview card |
| `height` | `string` \| `number` | `"auto"` | Height of the preview card |
| `className` | `string` | `""` | Additional CSS class name |
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

## Important Notes

### CORS Limitations

This package fetches URL metadata on the client side, which may be blocked by CORS policies. For production use, consider one of these approaches:

1. **Use a proxy server**: Set up a backend endpoint that fetches the metadata and forwards it to your React app
2. **Use a metadata service**: Services like [link-preview-generator](https://www.linkpreview.net/) or similar APIs
3. **Server-side rendering**: Fetch metadata during SSR to avoid CORS issues

### Example Proxy Implementation

```javascript
// Backend (Express example)
app.get('/api/preview', async (req, res) => {
  const { url } = req.query;
  // Fetch metadata using the same logic
  // Return JSON to frontend
});

// Frontend
// Modify fetchMetadata to call your proxy instead
```

## Development

### Setup

```bash
# Clone the repository
git clone <your-repo-url>

# Install dependencies
npm install

# Build the package
npm run build
```

### Build

The package is built using Rollup and outputs both CommonJS and ES Module formats:

```bash
npm run build
```

Output files:
- `dist/index.js` - CommonJS format
- `dist/index.esm.js` - ES Module format
- `dist/index.d.ts` - TypeScript declarations

## Dependencies

- React >= 16.8.0
- axios - For HTTP requests
- cheerio - For HTML parsing and metadata extraction

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.