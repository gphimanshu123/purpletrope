import { defineConfig } from "sanity";
import { visionTool } from "@sanity/vision";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;

if (!projectId) {
  throw new Error(
    "Missing SANITY_PROJECT_ID environment variable for Sanity Studio."
  );
}

if (!dataset) {
  throw new Error(
    "Missing SANITY_DATASET environment variable for Sanity Studio."
  );
}

export default defineConfig({
  name: "default",
  title: "Debjani Portfolio Content",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
