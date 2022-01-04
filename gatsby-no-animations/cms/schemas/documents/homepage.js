import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{ fontSize: '2em' }} symbol='🏠' />;

export default {
	name: 'homepage',
	_id: 'homepage',
	title: 'Overview (Homepage)',
	icon: Icon,
	type: 'document',
	fields: [
		{
			name: 'content',
			title: 'Home Overview Slideshow',
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
			title: 'Overview (Homepage)',
		},
		prepare({ title }) {
			return {
				title,
				media: <Icon />,
			};
		},
	},
};
