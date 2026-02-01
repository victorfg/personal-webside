// .tina/config.js
import { defineConfig } from "tinacms";

// .tina/collections/page.js
var page_default = {
  label: "Page Content",
  name: "page",
  path: "content/page",
  format: "json",
  fields: [
    {
      name: "rows",
      label: "Llista entrades del blog",
      type: "object",
      list: true,
      ui: {
        itemProps(item) {
          return { label: item?.title || "Entrada sense t\xEDtol" };
        }
      },
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
          description: "T\xEDtol opcional per gestionar millor les entrades del blog"
        },
        {
          type: "string",
          label: "Summary",
          name: "summary",
          description: "Resum de l'entrada"
        },
        {
          type: "object",
          name: "blocks",
          label: "Bloc configurable per cada entrada",
          list: true,
          ui: {
            itemProps(item) {
              return { label: item?.title || "Bloc sense t\xEDtol" };
            }
          },
          fields: [
            {
              type: "string",
              label: "Title",
              name: "title",
              description: "An optional title for this content-block to make it easier to edit."
            },
            {
              type: "rich-text",
              label: "Block",
              name: "block",
              templates: [
                {
                  name: "CodeBlock",
                  label: "blocs de codi",
                  fields: [
                    {
                      name: "children",
                      label: "Bloc de codi",
                      type: "string",
                      ui: {
                        component: "textarea"
                      }
                    },
                    {
                      name: "language",
                      label: "Llenguatge programaci\xF3",
                      type: "string"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label: "Etiquetes",
          name: "tags",
          type: "string",
          list: true
        },
        {
          label: "Data",
          name: "date",
          type: "datetime",
          ui: {
            dateFormat: "YYYY MM DD"
          }
        }
      ]
    }
  ]
};

// .tina/config.js
var branch = process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      page_default
    ]
  }
});
export {
  config_default as default
};
