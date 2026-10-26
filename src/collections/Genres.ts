import { CollectionConfig, slugField } from "payload";

export const Genres: CollectionConfig = {
  slug: "genres",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Genres",
      required: true,
    },
    slugField({ useAsSlug: "title" }),
  ],
};
