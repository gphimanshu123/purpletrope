import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID ?? "zqpyokm8";
const dataset = process.env.SANITY_DATASET ?? "production";
const apiVersion = "2024-01-01";
const token =
  "skjSprqvEuKUSjIm6xZq5wBUQTQMazsTwTlO0kTCZwQmb5GCHyFGcG36w8mKlCox4CAbRqWFKNH4DN68qMaoOar6FOgvaJYVVaFR9QXugwrcp2KAsPz0Z627XqS5awX8H8qNs6KjUFXdC7XLUFIiFPPlwyqkFUoe519tBeuIskHk611K4uYD" ??
  process.env.SANITY_API_TOKEN ??
  process.env.SANITY_TOKEN;

if (!token) {
  console.error(
    "Missing a Sanity write token. Set SANITY_WRITE_TOKEN (or SANITY_API_TOKEN) before running this seed script."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const workProjects = [
  {
    _id: "work-mural-of-memories",
    _type: "work",
    title: "Mural of Memories",
    period: "2022",
    role: "Lead Mural Artist & Concept Developer",
    description:
      "A large-scale wall graffiti project capturing the folklore of Assam through layered murals and abstract doodle compositions. Painted across public walls to promote local storytelling and cultural pride.",
    cmsOptions: [
      "WALL GRAFFITI",
      "MURAL DESIGN",
      "CULTURAL ART",
      "ILLUSTRATION",
      "COMMUNITY PROJECT",
    ],
    images: [],
    order: 1,
  },
  {
    _id: "work-doodle-diaries",
    _type: "work",
    title: "Doodle Diaries",
    period: "2023 — Present",
    role: "Creative Director & Product Illustrator",
    description:
      "A handcrafted stationery line turning spontaneous doodles into playful, eco-conscious notebooks and art prints. Each product celebrates imperfection and personal storytelling through design.",
    cmsOptions: [
      "PRODUCT DESIGN",
      "ILLUSTRATION",
      "PACKAGING",
      "ECO MATERIALS",
      "SHOP LAUNCH",
    ],
    images: [],
    order: 2,
  },
  {
    _id: "work-echoes-of-earth",
    _type: "work",
    title: "Echoes of Earth",
    period: "2024",
    role: "Visual Identity & Motion Designer",
    description:
      "Designed the identity and animated visuals for an environmental art festival that combined live performances with digital projections. The project fused nature, technology, and storytelling.",
    cmsOptions: [
      "BRANDING",
      "MOTION GRAPHICS",
      "EVENT DESIGN",
      "STORYTELLING",
      "SUSTAINABILITY",
    ],
    images: [],
    order: 3,
  },
  {
    _id: "work-woven-tales",
    _type: "work",
    title: "Woven Tales",
    period: "2021 — 2022",
    role: "Textile Pattern Illustrator",
    description:
      "Collaborative textile art project reinterpreting Northeast Indian weaving traditions into modern illustrated patterns for eco-fabrics and fashion brands.",
    cmsOptions: [
      "TEXTILE DESIGN",
      "ILLUSTRATION",
      "PATTERN MAKING",
      "SUSTAINABLE ART",
      "COLLABORATION",
    ],
    images: [],
    order: 4,
  },
];

const galleryAltSuggestions = {
  "work-mural-of-memories": [
    "Wide shot of the completed folklore mural in Guwahati.",
    "Artist painting detailed Assamese motifs.",
    "Close-up of doodle textures blending into the mural.",
    "Community volunteers assisting with background painting.",
    "Final mural lit under evening streetlights.",
  ],
  "work-doodle-diaries": [
    "Flat lay of illustrated notebooks with doodle covers.",
    "Packaging design featuring hand-drawn patterns.",
    "Close-up of recycled paper texture.",
    "Product photoshoot with stationery props.",
    "Customer using the journal on a work desk.",
  ],
  "work-echoes-of-earth": [
    "Festival logo animation sequence.",
    "Stage projection visuals during performance.",
    "Festival posters and banners on display.",
    "Artist installation illuminated at night.",
    "Team working on on-site video mapping.",
  ],
  "work-woven-tales": [
    "Pattern mockup on fabric rolls.",
    "Illustrated weaving motifs inspired by folklore.",
    "Behind-the-scenes shot of fabric printing.",
    "Final product—scarves and totes with designs.",
    "Exhibition setup showcasing textile samples.",
  ],
};

async function seed() {
  console.log("Seeding work projects...");

  await Promise.all(
    workProjects.map((work) =>
      client.createOrReplace({
        ...work,
      })
    )
  );

  console.log("Seed complete ✅");
  console.log(
    "Add gallery assets manually in Studio. Suggested alt text per project:"
  );
  Object.entries(galleryAltSuggestions).forEach(([workId, suggestions]) => {
    console.log(`\n${workId}`);
    suggestions.forEach((alt, index) => {
      console.log(` ${index + 1}. ${alt}`);
    });
  });
}

seed().catch((error) => {
  console.error("Failed to seed work projects", error);
  process.exit(1);
});

