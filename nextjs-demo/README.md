# Next.js Link Preview Demo

An interactive test suite for the Next.js Link Preview component with **server-side metadata fetching** - No CORS issues!

## Why Next.js?

The original React component had CORS limitations when fetching metadata directly in the browser. This Next.js implementation solves that by:

1. **Server-side fetching**: The API route fetches metadata on the server
2. **No CORS issues**: Server-to-server requests bypass browser CORS policies
3. **Works with any URL**: Test GitHub, Twitter, Reddit, and more!

## Running the Demo

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

### Interactive Testing Interface

- **Custom URL Input**: Test any URL you want
- **Example URLs**: Quick-test buttons for popular sites
- **Size Variants**: Toggle between Small, Medium, and Large
- **Metadata Viewer**: See extracted title, description, and image URL
- **Side-by-Side Comparison**: Compare all three sizes at once

### No CORS Issues!

Unlike the browser-based version, this Next.js implementation:

- ✅ Works with GitHub
- ✅ Works with Twitter
- ✅ Works with Reddit
- ✅ Works with any public URL

## How It Works

### API Route (`src/app/api/preview/route.ts`)

- Receives URL as query parameter
- Fetches HTML server-side using axios
- Extracts metadata using Cheerio
- Returns JSON response

### Client Component (`src/components/LinkPreview.tsx`)

- Calls the API route (no CORS!)
- Displays loading/error states
- Renders preview card with metadata

## Project Structure

```
nextjs-demo/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── preview/
│   │   │       └── route.ts      # API endpoint for metadata
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Demo interface
│   │   └── page.css              # Styles
│   └── components/
│       └── LinkPreview.tsx       # Link preview component
├── package.json
├── tsconfig.json
└── next.config.js
```

## Using in Your Own Next.js Project

### 1. Copy the files

```bash
# Copy the API route
cp src/app/api/preview/route.ts YOUR_PROJECT/app/api/preview/route.ts

# Copy the component
cp src/components/LinkPreview.tsx YOUR_PROJECT/components/LinkPreview.tsx
```

### 2. Install dependencies

```bash
npm install axios cheerio
```

### 3. Use in your page

```tsx
import { LinkPreview } from "@/components/LinkPreview";

export default function Page() {
  return <LinkPreview url="https://github.com" size="medium" />;
}
```

That's it! No CORS issues, works with any URL.

## Customization

### Change API Endpoint

```tsx
<LinkPreview url="https://example.com" apiEndpoint="/api/custom-preview" />
```

### Add Callbacks

```tsx
<LinkPreview
  url="https://example.com"
  onLoad={(data) => console.log("Loaded:", data)}
  onError={(error) => console.error("Error:", error)}
/>
```

### Custom Styling

```tsx
<LinkPreview url="https://example.com" width="400px" className="my-custom-class" />
```

## Production Deployment

This demo can be deployed to:

- Vercel (recommended for Next.js)
- Netlify
- Any Node.js hosting platform

```bash
npm run build
npm run start
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
