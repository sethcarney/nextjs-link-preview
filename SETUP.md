# nextjs-link-preview - Complete Setup

## 🎉 What Changed

Your package is now a **professional bundled npm package** with a simple CLI setup tool!

## ✨ New User Experience

### Before (Manual Copy):

```bash
# Users had to manually copy files
cp src/nextjs/app/api/preview/route.ts YOUR_PROJECT/app/api/preview/route.ts
cp src/nextjs/components/LinkPreview.tsx YOUR_PROJECT/components/LinkPreview.tsx
```

### After (Professional npm Package):

```bash
# Install from npm
npm install nextjs-link-preview

# Automatic API route setup
npx nextjs-link-preview

# Import and use
import { LinkPreview } from 'nextjs-link-preview';
```

## 📦 Package Structure

```
nextjs-link-preview/
├── dist/                          # Bundled component (published)
│   ├── index.js                   # CommonJS bundle
│   ├── index.esm.js               # ES Module bundle
│   └── index.d.ts                 # TypeScript definitions
├── bin/                           # CLI tool (published)
│   └── setup.js                   # Copies API route to user's project
├── src/                           # Source files (not published)
│   └── nextjs/
│       ├── app/api/preview/route.ts
│       └── components/LinkPreview.tsx
├── nextjs-demo/                   # Demo app (not published)
├── package.json                   # npm metadata
├── rollup.config.js              # Build configuration
└── tsconfig.json                  # TypeScript config

Published: dist/, bin/, README.md, LICENSE
Excluded: src/, nextjs-demo/, config files
```

## 🔧 Build System

- **Bundler**: Rollup
- **Output Formats**: CommonJS (CJS) + ES Modules (ESM)
- **TypeScript**: Full type definitions included
- **Externals**: React, Next.js (peer dependencies)

## 🚀 Publishing to npm

1. **Update repository URL in package.json** (if not already done):

   ```json
   "repository": {
     "type": "git",
     "url": "https://github.com/sethcarney/nextjs-link-preview"
   }
   ```

2. **Build the package**:

   ```bash
   npm run build
   ```

3. **Test locally** with npm link:

   ```bash
   npm link

   # In a test Next.js project:
   npm link nextjs-link-preview
   npx nextjs-link-preview
   ```

4. **Login to npm**:

   ```bash
   npm login
   ```

5. **Publish**:
   ```bash
   npm publish --access public
   ```

See `PUBLISHING.md` for complete publishing guide.

## 📝 What Gets Published

When you run `npm publish`, only these files are included:

- ✅ `dist/` - Bundled component
- ✅ `bin/` - Setup CLI
- ✅ `README.md` - Documentation
- ✅ `LICENSE` - MIT License

Everything else (source files, demo app, configs) is excluded via `.npmignore`.

## 🎯 How Users Will Use It

### 1. Install

```bash
npm install nextjs-link-preview
```

### 2. Setup API Route

```bash
npx nextjs-link-preview
```

This creates `app/api/preview/route.ts` in their Next.js project.

### 3. Install Peer Dependencies

```bash
npm install axios cheerio
```

### 4. Use the Component

```tsx
import { LinkPreview } from "nextjs-link-preview";

export default function Page() {
  return <LinkPreview url="https://github.com" size="medium" />;
}
```

## 🔍 CLI Tool Details

The setup CLI (`bin/setup.js`):

- ✅ Validates Next.js project (checks for next in dependencies)
- ✅ Creates `app/api/preview/` directory structure
- ✅ Writes the API route file
- ✅ Checks if route already exists (won't overwrite)
- ✅ Provides helpful setup instructions

## 📚 Documentation Updates

- ✅ `README.md` - Updated with new install workflow
- ✅ `PUBLISHING.md` - Complete publishing guide
- ✅ `SETUP.md` - This file, explaining the new structure

## 🧪 Testing Locally

Before publishing, test the complete workflow:

```bash
# In nextjs-link-preview directory
npm run build
npm link

# In a test Next.js project
npm link nextjs-link-preview
npx nextjs-link-preview
npm install axios cheerio

# Create a test page
cat > app/test/page.tsx << 'EOF'
import { LinkPreview } from 'nextjs-link-preview';

export default function TestPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Testing Link Preview</h1>
      <LinkPreview url="https://github.com" size="medium" />
    </div>
  );
}
EOF

# Run the dev server
npm run dev
# Visit http://localhost:3000/test
```

## ⚙️ Build Scripts

- `npm run build` - Builds the bundled component
- `npm run demo` - Runs the demo app
- `npm run prepublishOnly` - Auto-runs before `npm publish`

## 🎨 Package Features

- ✅ **Bundled component** - Professional npm package
- ✅ **Simple CLI setup** - One command to set up API route
- ✅ **TypeScript support** - Full type definitions
- ✅ **Multiple formats** - CJS + ESM for compatibility
- ✅ **Tree-shakeable** - ESM bundle supports tree-shaking
- ✅ **Peer dependencies** - React & Next.js as peers (not bundled)
- ✅ **Small bundle size** - ~5KB (excluding React/Next.js)

## 📊 Bundle Analysis

```
dist/index.js        5.0 kB   (CommonJS)
dist/index.esm.js    4.9 kB   (ES Module)
dist/index.d.ts      1.1 kB   (TypeScript definitions)
```

## 🔄 Migration Guide for Existing Users

If someone was using the old manual copy method:

1. Remove manually copied files:

   ```bash
   rm app/api/preview/route.ts
   rm components/LinkPreview.tsx
   ```

2. Install from npm:

   ```bash
   npm install nextjs-link-preview
   npx nextjs-link-preview
   ```

3. Update imports:

   ```tsx
   // Old
   import { LinkPreview } from "@/components/LinkPreview";

   // New
   import { LinkPreview } from "nextjs-link-preview";
   ```

## 🎯 Benefits of This Approach

1. **Professional** - Standard npm workflow
2. **Simple** - One install command + one setup command
3. **Maintainable** - Users get updates via `npm update`
4. **Version control** - Proper semantic versioning
5. **No manual copying** - Automatic API route setup
6. **Type-safe** - Full TypeScript support
7. **Tree-shakeable** - ESM bundle for optimal builds

## 🚦 Ready to Publish!

Your package is now ready to publish to npm. Follow the steps in `PUBLISHING.md` to publish your first version!

After publishing, users can install with:

```bash
npm install nextjs-link-preview
```

Good luck! 🎉
