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
            label: 'Blocks',
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
                ],
              }
            ]
          },
        ]
      }
    ]
}