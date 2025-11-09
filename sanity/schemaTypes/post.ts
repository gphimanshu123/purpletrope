import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'post',
	title: 'Post',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (rule) => rule.required().min(5).max(120),
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96,
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'excerpt',
			title: 'Excerpt',
			type: 'text',
			rows: 3,
			validation: (rule) => rule.max(160),
		}),
		defineField({
			name: 'publishedAt',
			title: 'Published At',
			type: 'datetime',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'heroImage',
			title: 'Hero Image',
			type: 'image',
			options: {
				hotspot: true,
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'author',
			title: 'Author',
			type: 'reference',
			to: [{ type: 'author' }],
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'body',
			title: 'Body',
			type: 'array',
			of: [
				{ type: 'block' },
				{
					type: 'image',
					options: { hotspot: true },
				},
			],
		}),
		defineField({
			name: 'tags',
			title: 'Tags',
			type: 'array',
			of: [{ type: 'string' }],
			options: {
				layout: 'tags',
			},
		}),
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'author.name',
			media: 'heroImage',
		},
	},
});

