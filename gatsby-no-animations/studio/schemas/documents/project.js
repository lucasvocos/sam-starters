import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{ fontSize: '2em' }} symbol='🎬' />;

export default {
	name: 'project',
	title: 'Project',
	icon: Icon,
	type: 'document',
	fields: [
		{
			name: 'draft',
			title: 'Draft?',
			type: 'boolean',
			description: 'If turned on, these projects will not be published',
		},
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			name: 'url',
			title: 'URL',
			type: 'slug',
			description: `/projects/TITLE`,
			options: {
				source: 'title',
				maxLength: 96,
			},
			validation: Rule => Rule.required(),
		},
		{
			name: 'thumbnail',
			title: 'Project Thumbnail',
			type: 'object',
			fields: [
				{
					name: 'note',
					type: 'note',
					options: {
						icon: Icon,
						headline: 'Asset',
						message:
							'<p>All images should be at least 1600px wide and under 1MB in size. Titles should be in the following format: Title, <em>Publication, Year</em></p>',
					},
				},
				{
					name: 'image',
					title: 'Image',
					type: 'image',
					validation: Rule => Rule.required(),
				},
			],
			validation: Rule => Rule.required(),
		},
		{
			name: 'content',
			title: 'Project Assets',
			type: 'array',
			of: [{ type: 'asset' }],
			validation: Rule => Rule.required().min(1).max(99),
		},
		{
			name: 'seo',
			type: 'seo',
		},
	],
	preview: {
		select: {
			title: 'title',
		},
		prepare({ title }) {
			return {
				title,
				media: <Icon />,
			};
		},
	},
};
