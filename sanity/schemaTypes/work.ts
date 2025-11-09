import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "work",
  title: "Work Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(3).max(160),
    }),
    defineField({
      name: "period",
      title: "Period",
      type: "string",
      description: "Displayed above the title (e.g. “2024 — Present”).",
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: "Primary role or responsibility for the project.",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      description: "Short summary that appears inside the card.",
      validation: (Rule) => Rule.max(320),
    }),
    defineField({
      name: "cmsOptions",
      title: "Highlights",
      type: "array",
      description:
        "Keywords such as “Wall Painting” or “Graffiti” shown as badges.",
      of: [
        defineArrayMember({
          type: "string",
          validation: (Rule) => Rule.min(1).max(60),
        }),
      ],
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: "images",
      title: "Gallery",
      type: "array",
      description: "Optional gallery supporting up to five images.",
      of: [
        defineArrayMember({
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
              description: "Describe the image for screen readers.",
              validation: (Rule) =>
                Rule.max(160).warning(
                  "Aim to keep alt text under 160 characters."
                ),
            }),
          ],
        }),
      ],
      options: {
        layout: "grid",
      },
      validation: (Rule) => Rule.max(5),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first on the Work page.",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [
        { field: "order", direction: "asc" },
        { field: "_createdAt", direction: "desc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "role",
      media: "images.0",
    },
  },
});
