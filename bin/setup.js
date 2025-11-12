#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const API_ROUTE_CONTENT = `import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

// Simple in-memory cache with 1 hour TTL
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json(
      { error: "URL parameter is required" },
      { status: 400 }
    );
  }

  // Check cache first
  const cached = cache.get(targetUrl);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return NextResponse.json(cached.data);
  }

  try {
    const response = await axios.get(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; LinkPreviewBot/1.0)",
      },
      timeout: 10000,
    });

    const $ = cheerio.load(response.data);

    const metadata = {
      title:
        $('meta[property="og:title"]').attr("content") ||
        $('meta[name="twitter:title"]').attr("content") ||
        $("title").text() ||
        "",
      description:
        $('meta[property="og:description"]').attr("content") ||
        $('meta[name="twitter:description"]').attr("content") ||
        $('meta[name="description"]').attr("content") ||
        "",
      image:
        $('meta[property="og:image"]').attr("content") ||
        $('meta[name="twitter:image"]').attr("content") ||
        "",
      url: targetUrl,
    };

    // Store in cache
    cache.set(targetUrl, { data: metadata, timestamp: Date.now() });

    return NextResponse.json(metadata);
  } catch (error) {
    console.error("Error fetching preview:", error);
    return NextResponse.json(
      { error: "Failed to fetch preview" },
      { status: 500 }
    );
  }
}
`;

function setupApiRoute() {
  const cwd = process.cwd();

  // Check if we're in a Next.js project
  const packageJsonPath = path.join(cwd, "package.json");
  if (!fs.existsSync(packageJsonPath)) {
    console.error(
      "❌ Error: package.json not found. Make sure you're in a Next.js project directory."
    );
    process.exit(1);
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  if (!packageJson.dependencies?.next && !packageJson.devDependencies?.next) {
    console.error(
      "❌ Error: Next.js not found in dependencies. Make sure this is a Next.js project."
    );
    process.exit(1);
  }

  // Detect if project uses src/app or app directory structure
  const hasSrcApp = fs.existsSync(path.join(cwd, "src", "app"));
  const appDir = hasSrcApp ? path.join(cwd, "src", "app") : path.join(cwd, "app");
  const relativePath = hasSrcApp ? "src/app/api/preview/route.ts" : "app/api/preview/route.ts";

  // Create the API route directory structure
  const apiRoutePath = path.join(appDir, "api", "preview");
  const routeFilePath = path.join(apiRoutePath, "route.ts");

  // Check if route already exists
  if (fs.existsSync(routeFilePath)) {
    console.log(`⚠️  API route already exists at ${relativePath}`);
    console.log("To reinstall, delete the existing file and run this command again.");
    process.exit(0);
  }

  // Create directories
  fs.mkdirSync(apiRoutePath, { recursive: true });

  // Write the route file
  fs.writeFileSync(routeFilePath, API_ROUTE_CONTENT);

  console.log(`✅ Successfully created API route at ${relativePath}`);
  console.log("");
  console.log("📦 Make sure you have the required dependencies:");
  console.log("   npm install axios cheerio");
  console.log("");
  console.log("🎉 Setup complete! You can now use the LinkPreview component:");
  console.log("");
  console.log('   import { LinkPreview } from "nextjs-link-preview";');
  console.log("");
  console.log("   export default function Page() {");
  console.log('     return <LinkPreview url="https://github.com" />;');
  console.log("   }");
}

setupApiRoute();
