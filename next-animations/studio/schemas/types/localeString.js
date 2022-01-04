import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '2em'}} symbol="🌎" />;

export default {
	name: 'localeString',
	title: 'Locale String',
	icon: Icon,
	type: 'object',
	fieldsets: [
		{
			title: 'Translations',
			name: 'translations',
			options: {
				collapsible: true,
				collapsed: false,
			},
		},
	],
	fields: [
		{
			name: 'en',
			title: 'English',
			type: 'string',
		},
		{
			name: 'es',
			title: 'Spanish',
			type: 'string',
			fieldset: 'translations'
		},
	],
	preview: {
		select: {
			title: 'en',
			subtitle: 'es',
			media: 'image',
		},
		prepare({ title, subtitle }) {
			return {
				title: `EN: ${title}`,
				subtitle: `ES: ${subtitle}`,
			};
		},
	},
};
