import axios from "axios";
import cheerio from "cheerio";
import { LinkPreviewData } from "../types";

export async function fetchMetadata(url: string): Promise<LinkPreviewData> {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const metadata: LinkPreviewData = {
      url,
      title: "",
      description: "",
      image: ""
    };

    // Try OpenGraph title, then regular title
    metadata.title = $('meta[property="og:title"]').attr("content") || $("title").text() || "";

    // Try OpenGraph description, then regular description
    metadata.description =
      $('meta[property="og:description"]').attr("content") || $('meta[name="description"]').attr("content") || "";

    // Try OpenGraph image, then any other image
    metadata.image =
      $('meta[property="og:image"]').attr("content") || $('meta[property="twitter:image"]').attr("content") || "";

    return metadata;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to fetch metadata: ${errorMessage}`);
  }
}
