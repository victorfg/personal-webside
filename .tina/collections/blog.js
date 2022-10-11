export default {
    label: "Blog Posts",
    name: "blog",
    path: "content/blog",
    format: "mdx",
    fields: [
      {
        type: "string",
        label: "Title",
        name: "title",
      },
      {
        type: "string",
        label: "Blog Post Body",
        name: "body",
        isBody: true,
        ui: {
          component: "textarea",
        },
      },
    ],
}