# Local Development Testing Guide

## Using npm link for Local Testing

Instead of creating tarballs and installing with version numbers, use `npm link`:

### 1. Link the package (from the package root):

```bash
cd /c/development/nextjs-link-preview
npm run build
npm link
```

### 2. Use the linked package in demo:

```bash
cd /c/development/nextjs-link-preview/nextjs-demo
npm link nextjs-link-preview
```

### 3. After making changes:

```bash
cd /c/development/nextjs-link-preview
npm run build
# Changes are immediately available in the demo!
```

### 4. To unlink when done testing:

```bash
cd /c/development/nextjs-link-preview/nextjs-demo
npm unlink nextjs-link-preview
npm install nextjs-link-preview@latest  # Install from npm again
```

## Quick Development Workflow

```bash
# Terminal 1 - Build on file changes (optional)
cd /c/development/nextjs-link-preview
npm run build -- --watch

# Terminal 2 - Run demo
cd /c/development/nextjs-link-preview/nextjs-demo
npm run dev
```

## Tracking Changes with Git

Don't forget to commit and push your changes:

```bash
cd /c/development/nextjs-link-preview
git add .
git commit -m "Fix: CLI now detects src/app directory structure"
git push origin main
```
