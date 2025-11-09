import { createClient, type QueryParams } from "@sanity/client";

const projectId = "zqpyokm8";
const dataset = "production";
const apiVersion = "2024-01-01";

if (!projectId) {
  throw new Error("Missing SANITY_PROJECT_ID environment variable");
}

if (!dataset) {
  throw new Error("Missing SANITY_DATASET environment variable");
}

if (!apiVersion) {
  throw new Error("Missing SANITY_API_VERSION environment variable");
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

export async function loadSanityQuery<QueryResponse>(
  query: string,
  params: QueryParams = {}
) {
  return sanityClient.fetch<QueryResponse>(query, params);
}
