# Publishing Guide for nextjs-link-preview

This guide walks you through publishing the package to npm.

## Pre-Publishing Checklist

Before publishing, ensure you have:

1. ✅ **Built the package**: Run `npm run build` to create the `dist/` folder
2. ✅ **Updated version**: Increment version in `package.json` (follow semver)
3. ✅ **Updated README**: Ensure documentation is current
4. ✅ **Tested locally**: Use `npm link` to test in a real Next.js project
5. ✅ **Committed changes**: All changes should be committed to git
6. ✅ **npm account**: You must be logged in to npm (`npm login`)

## Version Numbering (Semantic Versioning)

- **Patch release** (1.0.0 → 1.0.1): Bug fixes, no breaking changes
- **Minor release** (1.0.0 → 1.1.0): New features, backward compatible
- **Major release** (1.0.0 → 2.0.0): Breaking changes

Update the version in `package.json`:

```json
{
  "version": "1.0.1"
}
```

## Testing Locally with npm link

Before publishing, test the package in a real Next.js project:

```bash
# In the nextjs-link-preview directory
npm run build
npm link

# In your test Next.js project
npm link nextjs-link-preview

# Test the setup CLI
npx nextjs-link-preview

# Test importing the component
import { LinkPreview } from 'nextjs-link-preview';
```

## Publishing Steps

### 1. Login to npm

```bash
npm login
```

Enter your npm credentials when prompted.

### 2. Build the Package

```bash
npm run build
```

This creates the `dist/` folder with bundled files.

### 3. Test What Will Be Published

```bash
npm pack --dry-run
```

This shows you exactly what files will be included in the package.

### 4. Publish to npm

For first-time publishing or public packages:

```bash
npm publish --access public
```

For subsequent updates:

```bash
npm publish
```

### 5. Verify the Package

After publishing, verify at: https://www.npmjs.com/package/nextjs-link-preview

Test installation in a fresh project:

```bash
npm install nextjs-link-preview
npx nextjs-link-preview
```

## What Gets Published

Based on the `files` field in `package.json`, the following are included:

- ✅ `dist/` - Bundled component files
- ✅ `bin/` - Setup CLI script
- ✅ `README.md` - Documentation
- ✅ `LICENSE` - License file
- ✅ `package.json` - Package metadata

Everything else is excluded via `.npmignore`.

## Post-Publishing

1. **Create a git tag** for the release:

   ```bash
   git tag v1.0.1
   git push origin v1.0.1
   ```

2. **Create a GitHub release** with changelog

3. **Test the published package** in a real project:
   ```bash
   npm install nextjs-link-preview@latest
   ```

## Troubleshooting

### "You do not have permission to publish"

Make sure you're logged in to the correct npm account:

```bash
npm whoami
npm login
```

### "Package name already exists"

The package name `nextjs-link-preview` must be unique. If it's taken, you'll need to:

- Choose a different name
- Or publish under a scope: `@yourusername/nextjs-link-preview`

### "Missing files in published package"

Check `.npmignore` and the `files` field in `package.json`. Run `npm pack --dry-run` to see what will be included.

## Updating After Publishing

To publish an update:

1. Make your changes
2. Update version in `package.json`
3. Run `npm run build`
4. Commit changes
5. Run `npm publish`
6. Create git tag and GitHub release

## Unpublishing (Emergency Only)

You can only unpublish within 72 hours of publishing:

```bash
npm unpublish nextjs-link-preview@1.0.1
```

**Note**: Unpublishing is discouraged. Instead, publish a patched version.

## Support

For issues with publishing, check:

- npm documentation: https://docs.npmjs.com/
- Package status: https://www.npmjs.com/package/nextjs-link-preview
