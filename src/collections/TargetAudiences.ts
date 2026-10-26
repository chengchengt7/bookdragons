import { CollectionConfig } from "payload";

export const TargetAudiences: CollectionConfig = {
  slug: "targetaudiences",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "targetaudiences",
      required: true,
    }
  ],
};