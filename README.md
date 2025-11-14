# Next.js Link Preview

A simple, lightweight Next.js component for displaying beautiful link preview cards.

## Quick Start

```bash
npm install nextjs-link-preview
```

```tsx
import { LinkPreview } from "nextjs-link-preview";

<LinkPreview
  url="https://github.com/vercel/next.js"
  title="Next.js"
  description="The React Framework for the Web"
  preset="github"
/>
```

## Features

- ✅ Pure presentational component - no data fetching
- ✅ Preset image support for GitHub and npm
- ✅ Three size variants (small, medium, large)
- ✅ Two layouts (vertical, horizontal)
- ✅ TypeScript support
- ✅ Fully customizable styling
- ✅ Zero dependencies (only peer deps: React, Next.js)

## Usage

### Basic Usage

```tsx
import { LinkPreview } from "nextjs-link-preview";

export default function Page() {
  return (
    <LinkPreview
      url="https://example.com"
      title="Example Site"
      description="This is an example website"
      image="https://example.com/preview.png"
    />
  );
}
```

### With Presets

Use built-in presets for popular platforms:

```tsx
// GitHub
<LinkPreview
  url="https://github.com/user/repo"
  title="My Repository"
  description="A cool open source project"
  preset="github"
/>

// npm
<LinkPreview
  url="https://npmjs.com/package/my-package"
  title="my-package"
  description="An awesome npm package"
  preset="npm"
/>
```

### Size Variants

```tsx
<LinkPreview url="..." title="..." image="..." size="small" />
<LinkPreview url="..." title="..." image="..." size="medium" /> {/* default */}
<LinkPreview url="..." title="..." image="..." size="large" />
```

### Layouts

```tsx
{/* Vertical (default) - image on top */}
<LinkPreview url="..." title="..." image="..." layout="vertical" />

{/* Horizontal - image on left */}
<LinkPreview url="..." title="..." image="..." layout="horizontal" />
```

### Custom Styling

```tsx
<LinkPreview
  url="https://example.com"
  title="Example"
  image="..."
  width="400px"
  className="my-custom-class"
/>
```

## Props

| Prop          | Type                                 | Default      | Description                            |
| ------------- | ------------------------------------ | ------------ | -------------------------------------- |
| `url`         | `string`                             | **required** | Link destination                       |
| `title`       | `string`                             | **required** | Preview card title                     |
| `description` | `string`                             | `undefined`  | Preview card description (optional)    |
| `image`       | `string`                             | `undefined`  | Custom image URL (optional)            |
| `preset`      | `"github"` \| `"npm"`                | `undefined`  | Use preset image (optional)            |
| `size`        | `"small"` \| `"medium"` \| `"large"` | `"medium"`   | Preview card size                      |
| `layout`      | `"vertical"` \| `"horizontal"`       | `"vertical"` | Image position                         |
| `width`       | `string` \| `number`                 | `"100%"`     | Card width                             |
| `height`      | `string` \| `number`                 | `"auto"`     | Card height                            |
| `className`   | `string`                             | `""`         | Additional CSS classes                 |

**Note:** Either `image` or `preset` should be provided. If both are provided, `image` takes precedence.

## Presets

Available presets:

- `github` - GitHub logo
- `npm` - npm logo

## Examples

### GitHub Repository Preview

```tsx
<LinkPreview
  url="https://github.com/vercel/next.js"
  title="Next.js"
  description="The React Framework for the Web"
  preset="github"
  size="large"
/>
```

### npm Package Preview

```tsx
<LinkPreview
  url="https://npmjs.com/package/react"
  title="react"
  description="React is a JavaScript library for building user interfaces."
  preset="npm"
  layout="horizontal"
/>
```

### Custom Article Preview

```tsx
<LinkPreview
  url="https://example.com/article"
  title="How to Build Amazing Web Apps"
  description="Learn the best practices for modern web development"
  image="https://example.com/article-cover.jpg"
  size="medium"
/>
```

## Testing

To test the component locally:

```bash
npm test
```

This will:
1. Build the component
2. Start the demo at http://localhost:3000
3. Open your browser to see the interactive demo

That's it!

## License

MIT

## Links

- [GitHub](https://github.com/sethcarney/nextjs-link-preview)
- [npm](https://www.npmjs.com/package/nextjs-link-preview)
