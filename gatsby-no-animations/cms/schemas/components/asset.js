import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{ fontSize: '2em' }} symbol='🖼' />;

export default {
	name: 'asset',
	title: 'Asset',
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
		{
			name: 'title',
			title: 'Title',
			type: 'richText',
		},
	],
	preview: {
		select: {
			title: 'title',
			media: 'image',
		},
		prepare({ title, media }) {
			const block = (title || []).find(block => block._type === 'block') || 'Asset';
			return {
				title: block.children[0].text || block,
				media,
			};
		},
	},
};
