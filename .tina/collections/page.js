export default {
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
          itemProps (item) {
            return {label: item?.title || 'Entrada sense títol'}
          }
        },     
        fields: [
          {
            type: 'string',
            label: 'Title',
            name: 'title',
            description: 'Títol opcional per gestionar millor les entrades del blog',
          },
          {
            type: 'object',
            name: 'blocks',
            label: 'Bloc configurable per cada entrada',
            list: true,
            ui: {
              itemProps (item) {
                return { label: item?.title || 'Bloc sense títol' }
              }
            },
            fields: [
              {
                type: 'string',
                label: 'Title',
                name: 'title',
                description: 'An optional title for this content-block to make it easier to edit.'
              },
              {
                type: 'rich-text',
                label: 'Block',
                name: 'block',
                templates: [
                  {
                    name: "NewsletterSignup",
                    label: "Newsletter Sign Up",
                    fields: [
                      {
                        name: "children",
                        label: "CTA",
                        type: "rich-text",
                      },
                      {
                        name: "buttonText",
                        label: "Button Text",
                        type: "string",
                      }
                    ],
                  },
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
                        label: "Llenguatge programació",
                        type: "string",
                      }
                    ],
                  },
                ],
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
              dateFormat: 'YYYY MM DD'
            }
          }
        ]
      }
    ]
}