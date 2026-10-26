import { CollectionConfig, slugField } from "payload";

export const Authors: CollectionConfig = {
  slug: "authors",
  admin: {
    useAsTitle: "slug",
  },
  fields: [
    {
      name: "firstName",
      type: "text",
      required: true,
    },
    {
      name: "lastName",
      type: "text",
      required: true,
    },
    slugField({
      useAsSlug: "firstName",
      slugify: ({ data }) =>
        `${data.firstName}-${data.lastName}`.trim().toLowerCase(),
    }),
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "about",
      type: "textarea",
      required: true,
    },
  ],
};
