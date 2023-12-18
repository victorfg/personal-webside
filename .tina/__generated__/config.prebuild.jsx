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
var config = defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || process.env.HEAD,
  token: process.env.TINA_TOKEN,
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  build: {
    publicFolder: "public",
    // The public asset folder for your framework
    outputFolder: "admin"
    // within the public folder
  },
  schema: {
    collections: [page_default]
  }
  /*cmsCallback: (cms) => {
      const RouteMapping = new RouteMappingPlugin((collection, document) => {
        if (["page"].includes(collection.name)) {
          if (document._sys.filename === "home") {
            return "/";
          }
        }
  
        if (["blog"].includes(collection.name)) {
          return `/blog/${document._sys.filename}`;
        }
  
        return undefined;
      });
  
      cms.plugins.add(RouteMapping);
  
      return cms;
    },*/
});
var config_default = config;
export {
  config,
  config_default as default
};
