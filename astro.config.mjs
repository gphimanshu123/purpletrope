// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sanity from "@sanity/astro";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: "server", // Required for embedded Sanity Studio
  adapter: vercel({}),
  integrations: [
    react(),
    sanity({
      projectId: "zqpyokm8",
      dataset: "production",
      apiVersion: "2024-01-01",
      useCdn: true,
      studioBasePath: "/studio", // Enables embedded Sanity Studio at /studio route
    }),
  ],
  vite: {
    optimizeDeps: {
      exclude: ["sanity", "@sanity/vision", "sanity/structure"],
    },
    ssr: {
      noExternal: ["sanity", "@sanity/vision"],
    },
  },
});
