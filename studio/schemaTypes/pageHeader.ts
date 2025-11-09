import {defineField, defineType} from 'sanity'

const pageOptions = [
  {title: 'Work Page', value: 'work'},
  {title: 'Blog Page', value: 'blog'},
]

export default defineType({
  name: 'pageHeader',
  title: 'Page Header',
  type: 'document',
  fields: [
    defineField({
      name: 'page',
      title: 'Page',
      type: 'string',
      options: {
        list: pageOptions,
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Optional eyebrow label that appears above the heading.',
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Primary title shown on the page.',
      validation: (Rule) => Rule.required().min(3).max(120),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Supporting copy shown beneath the title.',
      rows: 4,
      validation: (Rule) => Rule.required().min(20).max(320),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'page',
    },
  },
})
