# Testing Guide

## Quick Test

To test the component with the interactive demo:

```bash
npm test
```

This will:
1. Build the component from `src/nextjs/components/LinkPreview.tsx`
2. Start the demo server at http://localhost:3000
3. Show the component with various configurations

## What You'll See

The demo includes:
- **GitHub Preset Examples** - Using the built-in GitHub logo
- **npm Preset Examples** - Using the built-in npm logo
- **Custom Image Example** - Using a custom image URL
- **Size Comparison** - All three sizes (small, medium, large)
- **Interactive Controls** - Toggle between sizes and layouts
- **Code Samples** - View the code for each example

## Development Workflow

1. Make changes to `src/nextjs/components/LinkPreview.tsx`
2. Run `npm run dev` to rebuild and start the demo
3. The demo will reload automatically
4. Test your changes in the browser

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm test` | Build and run demo |
| `npm run dev` | Same as test (alias for convenience) |
| `npm run build` | Build the component only |

## Manual Testing

If you want to test manually without the demo:

1. Build the component:
   ```bash
   npm run build
   ```

2. Check the output in `dist/`:
   - `dist/index.js` - CommonJS format
   - `dist/index.esm.js` - ES Module format
   - `dist/index.d.ts` - TypeScript types

3. Link locally to test in your own Next.js project:
   ```bash
   npm link
   cd /path/to/your/project
   npm link nextjs-link-preview
   ```
