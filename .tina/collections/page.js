export default {
    label: "Page Content",
    name: "page",
    path: "content/page",
    format: "json",
    fields: [
      {
        name:'title',
        label: 'Title',
        type: 'string',
        isTitle: true,
        required: true
      },
      {
        name: "rows",
        label: "Content Rows",
        type: "object",
        list: true,
        fields: [
          {
            type: 'rich-text',
            label: 'Block',
            name: 'block',
          }
        ]
      }
    ]
}