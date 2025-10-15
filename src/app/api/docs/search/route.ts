import { source } from "@/lib/source";
import { createFromSource } from "fumadocs-core/search/server";
import { NextRequest } from "next/server";

// Create search API with English language (Orama doesn't support Chinese)
const searchAPI = createFromSource(source, {
  // https://docs.orama.com/open-source/supported-languages
  language: "english",
});

export async function GET(request: NextRequest) {
  // Always use English tokenization since Orama doesn't support Chinese
  // This allows Chinese content to be searched using English tokenization
  return searchAPI.GET(request);
}
