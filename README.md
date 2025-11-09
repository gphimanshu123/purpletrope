# Debjani Portfolio · Astro + Sanity Blog

This project is an Astro-powered portfolio that now includes a Sanity-backed blog. Sanity provides an authoring experience for long-form content, while Astro renders a performant, static site with React UI components.

## Requirements

- Node.js 20.18 or newer (Sanity Studio warns when the version is outside the supported range — consider upgrading to 20.19+)
- A Sanity project with a dataset (the default `production` dataset works well)

## Setup

1. **Install dependencies**

   ```sh
   npm install
   ```

2. **Configure environment variables**

   Copy `env.example` to `.env.local` (or `.env`) and fill in the values from your Sanity project:

   ```
    SANITY_PROJECT_ID=<your-project-id>
    SANITY_DATASET=production
    SANITY_API_VERSION=2024-01-01
    SANITY_API_READ_TOKEN=<optional-read-token>
    PUBLIC_SANITY_VISUAL_EDITING_ENABLED=false
   ```

   - `SANITY_API_READ_TOKEN` is only required if you plan to enable Visual Editing or query drafts.
   - Update `SANITY_API_VERSION` to the API version you prefer.

3. **Populate Sanity Studio (optional)**

   The repo already contains `sanity.config.ts` and schema definitions under `sanity/schemaTypes`. To work inside Studio:

   ```sh
   npm exec sanity dev
   ```

   This runs the Studio at `http://localhost:3333` using the dataset configured above. Publish a few `Post` documents to populate the blog.

## Available Scripts

All commands run from the project root:

| Command                | Description                            |
| :--------------------- | :------------------------------------- |
| `npm run dev`          | Start Astro at `http://localhost:4321` |
| `npm run build`        | Generate the production build          |
| `npm run preview`      | Preview the production build locally   |
| `npm exec sanity dev`  | Start Sanity Studio with hot reloading |
| `npm exec sanity help` | Inspect additional Sanity CLI commands |

## Project Highlights

- **Blog listing** at `/blog` with React-based cards, Sanity imagery, and author metadata.
- **Dynamic post pages** at `/blog/[slug]` fetched from Sanity and rendered with a custom Portable Text renderer.
- **Sanity Studio configuration** ready for the included `post` and `author` schemas.
- **Reusable UI primitives** in `src/components/ui` for cards, badges, and typography styling.

## Next Steps

- Tailor the Sanity schemas (`sanity/schemaTypes`) to match your content model.
- Update the styling in `src/components/blog` to better match your brand.
- Configure deployment (e.g., Vercel, Netlify) and add the production domain to the Sanity CORS settings.
