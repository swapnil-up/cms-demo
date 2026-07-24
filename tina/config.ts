import { defineConfig } from "tinacms";

export default defineConfig({
  telemetry: "disabled",
  clientId: process.env.TINA_PUBLIC_CLIENT_ID,
  branch:
    process.env.TINA_PUBLIC_BRANCH ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD ||
    "main",
  token: process.env.TINA_TOKEN,
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },
  build: {
    publicFolder: "public",
    outputFolder: "admin",
  },
  schema: {
    collections: [
      {
        label: "Site Settings",
        name: "settings",
        path: "content/settings",
        format: "json",
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
      },
      {
        label: "Pages",
        name: "page",
        path: "content/page",
        format: "mdx",
        fields: [
          {
            type: "object",
            name: "sections",
            label: "Page Sections",
            description: "Add, remove, and reorder sections on this page",
            list: true,
            templates: [
              {
                name: "hero",
                label: "Hero Banner",
                fields: [
                  {
                    type: "string",
                    name: "headline",
                    label: "Headline",
                    isTitle: true,
                    required: true,
                  },
                  {
                    type: "string",
                    name: "subtext",
                    label: "Subtext",
                    ui: { component: "textarea" },
                  },
                  {
                    type: "string",
                    name: "ctaText",
                    label: "Button Text",
                  },
                  {
                    type: "string",
                    name: "ctaLink",
                    label: "Button Link",
                  },
                  {
                    type: "image",
                    name: "backgroundImage",
                    label: "Background Image",
                  },
                ],
              },
              {
                name: "about",
                label: "About Section",
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Title",
                    isTitle: true,
                    required: true,
                  },
                  {
                    type: "string",
                    name: "content",
                    label: "Content",
                    ui: { component: "textarea" },
                  },
                  {
                    type: "image",
                    name: "image",
                    label: "Image",
                  },
                ],
              },
              {
                name: "services",
                label: "Services Grid",
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Section Title",
                    isTitle: true,
                    required: true,
                  },
                  {
                    type: "string",
                    name: "subtitle",
                    label: "Subtitle",
                  },
                  {
                    type: "object",
                    name: "services",
                    label: "Services",
                    list: true,
                    fields: [
                      {
                        type: "string",
                        name: "title",
                        label: "Service Title",
                      },
                      {
                        type: "string",
                        name: "description",
                        label: "Description",
                        ui: { component: "textarea" },
                      },
                    ],
                  },
                ],
              },
              {
                name: "team",
                label: "Team Section",
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Section Title",
                    isTitle: true,
                    required: true,
                  },
                  {
                    type: "string",
                    name: "subtitle",
                    label: "Subtitle",
                  },
                  {
                    type: "object",
                    name: "members",
                    label: "Team Members",
                    description: "Select team members to display",
                    list: true,
                    fields: [
                      {
                        type: "reference",
                        name: "member",
                        label: "Team Member",
                        collections: ["team"],
                      },
                    ],
                  },
                ],
              },
              {
                name: "testimonials",
                label: "Testimonials Section",
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Section Title",
                    isTitle: true,
                    required: true,
                  },
                  {
                    type: "string",
                    name: "subtitle",
                    label: "Subtitle",
                  },
                  {
                    type: "object",
                    name: "items",
                    label: "Testimonials",
                    description: "Select testimonials to display",
                    list: true,
                    fields: [
                      {
                        type: "reference",
                        name: "item",
                        label: "Testimonial",
                        collections: ["testimonial"],
                      },
                    ],
                  },
                ],
              },
              {
                name: "contact",
                label: "Contact Section",
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Section Title",
                    isTitle: true,
                    required: true,
                  },
                  {
                    type: "string",
                    name: "subtitle",
                    label: "Subtitle",
                    ui: { component: "textarea" },
                  },
                ],
              },
              {
                name: "cta",
                label: "Call-to-Action Banner",
                fields: [
                  {
                    type: "string",
                    name: "text",
                    label: "Text",
                  },
                  {
                    type: "string",
                    name: "buttonText",
                    label: "Button Text",
                  },
                  {
                    type: "string",
                    name: "buttonLink",
                    label: "Button Link",
                  },
                ],
              },
            ],
          },
        ],
        ui: {
          router: ({ document }) =>
            document._sys.filename === "home"
              ? "/"
              : `/${document._sys.filename}`,
        },
      },
      {
        label: "Team Members",
        name: "team",
        path: "content/team",
        format: "md",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Name",
            required: true,
            isTitle: true,
          },
          {
            type: "string",
            name: "role",
            label: "Role",
          },
          {
            type: "image",
            name: "photo",
            label: "Photo",
          },
          {
            type: "string",
            name: "bio",
            label: "Biography",
            ui: { component: "textarea" },
          },
        ],
        ui: {
          filename: {
            readonly: false,
            slugify: (values) =>
              values?.name
                ?.toLowerCase()
                .replace(/\s+/g, "-"),
          },
        },
      },
      {
        label: "Testimonials",
        name: "testimonial",
        path: "content/testimonial",
        format: "md",
        fields: [
          {
            type: "string",
            name: "quote",
            label: "Quote",
            required: true,
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "author",
            label: "Author",
            required: true,
            isTitle: true,
          },
          {
            type: "string",
            name: "role",
            label: "Role",
          },
          {
            type: "string",
            name: "organization",
            label: "Organization",
          },
          {
            type: "image",
            name: "photo",
            label: "Photo",
          },
        ],
        ui: {
          filename: {
            readonly: false,
            slugify: (values) =>
              values?.author
                ?.toLowerCase()
                .replace(/\s+/g, "-"),
          },
        },
      },
    ],
  },
});
