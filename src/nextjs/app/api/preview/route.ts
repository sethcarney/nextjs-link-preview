/**
 * Next.js API Route for fetching link preview metadata
 *
 * This route handles server-side fetching to bypass CORS restrictions
 * Usage: GET /api/preview?url=https://example.com
 */

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL parameter is required" }, { status: 400 });
  }

  try {
    // Fetch the URL with a proper user agent
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      },
      timeout: 10000
    });

    // Parse HTML
    const $ = cheerio.load(data);

    // Extract metadata
    const metadata = {
      url,
      title: $('meta[property="og:title"]').attr("content") || $("title").text() || "",
      description:
        $('meta[property="og:description"]').attr("content") ||
        $('meta[name="description"]').attr("content") ||
        "",
      image:
        $('meta[property="og:image"]').attr("content") ||
        $('meta[property="twitter:image"]').attr("content") ||
        ""
    };

    return NextResponse.json(metadata);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to fetch metadata", details: errorMessage },
      { status: 500 }
    );
  }
}
