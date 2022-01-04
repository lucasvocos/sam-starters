import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '2em'}} symbol="🌎" />;

export default {
	name: 'localeRichText',
	title: 'Locale Rich Text',
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
			type: 'richText',
		},
		{
			name: 'es',
			title: 'Spanish',
			type: 'richText',
			fieldset: 'translations'
		},
	],
};
