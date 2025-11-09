// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sanity from "@sanity/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    sanity({
      projectId: "zqpyokm8",
      dataset: "production",
      apiVersion: "2024-01-01",
      useCdn: true,
    }),
  ],
});
