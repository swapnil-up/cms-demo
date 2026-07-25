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
      type: "object",
      name: "navLinks",
      ui: {
        itemProps(item) {
          return { label: item?.label || "Nav Link" };
        },
        defaultItem: {
          label: "About",
          url: "#about",
        },
      },
      label: "Navigation Links",
      description: "Links shown in the header nav and footer quick links",
      list: true,
      fields: [
        {
          type: "string",
          name: "label",
          label: "Label",
          required: true,
        },
        {
          type: "string",
          name: "url",
          label: "URL",
          required: true,
        },
      ],
    },
    {
      type: "object",
      name: "socialLinks",
      ui: {
        itemProps(item) {
          return { label: item?.label || "Social Link" };
        },
        defaultItem: {
          label: "Facebook",
          url: "#",
        },
      },
      label: "Social Links",
      description: "Links shown in the footer Connect section",
      list: true,
      fields: [
        {
          type: "string",
          name: "label",
          label: "Label",
          required: true,
        },
        {
          type: "string",
          name: "url",
          label: "URL",
          required: true,
        },
      ],
    },
    {
      type: "string",
      name: "formEndpoint",
      label: "Contact Form Endpoint",
      description: "URL for form submissions (e.g. Formspree endpoint)",
    },
    {
      type: "string",
      name: "footerText",
      label: "Footer Copyright Text",
      ui: { component: "textarea" },
    },
  ],
} satisfies Collection;
