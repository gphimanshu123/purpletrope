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

const pageHeaders = [
  {
    _id: "pageHeader-work",
    _type: "pageHeader",
    page: "work",
    label: "Selected work",
    title: "Creative collaborations & commissions",
    description:
      "From bespoke brand stories to immersive installations, these partnerships highlight the range of multidisciplinary projects crafted with Purple Trope.",
  },
  {
    _id: "pageHeader-blog",
    _type: "pageHeader",
    page: "blog",
    label: null,
    title: "Stories from the studio",
    description:
      "Inspiration, behind-the-scenes process, and the lessons we discover while building vibrant visual worlds.",
  },
];

async function seed() {
  console.log("Seeding page header documents...");

  await Promise.all(
    pageHeaders.map((header) =>
      client.createOrReplace({
        ...header,
      })
    )
  );

  console.log("Seed complete ✅");
}

seed().catch((error) => {
  console.error("Failed to seed page headers", error);
  process.exit(1);
});
