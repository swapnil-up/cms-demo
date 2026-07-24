import type { Collection } from "tinacms";

export default {
  label: "Site Settings",
  name: "settings",
  path: "content/settings",
  format: "json",
  ui: {
    global: true,
  },
  fields: [
    {
      type: "string",
      name: "siteName",
      label: "Site Name",
      required: true,
    },
    {
      type: "string",
      name: "tagline",
      label: "Tagline",
    },
    {
      type: "string",
      name: "contactEmail",
      label: "Contact Email",
    },
    {
      type: "string",
      name: "contactPhone",
      label: "Contact Phone",
    },
    {
      type: "string",
      name: "address",
      label: "Address",
      ui: { component: "textarea" },
    },
    {
      type: "string",
      name: "facebookUrl",
      label: "Facebook URL",
    },
    {
      type: "string",
      name: "instagramUrl",
      label: "Instagram URL",
    },
    {
      type: "string",
      name: "footerText",
      label: "Footer Copyright Text",
      ui: { component: "textarea" },
    },
  ],
} satisfies Collection;
