import { CollectionConfig, slugField } from "payload";

export const Books: CollectionConfig = {
  slug: "books",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Book title",
      required: true,
    },
    slugField(),
    {
      name: "summary",
      type: "textarea",
      label: "Book summary",
      required: true,
    },
    {
      name: "price",
      type: "number",
      label: "Price",
      required: true,
    }
  ],
};
