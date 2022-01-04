import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{ fontSize: '2em' }} symbol='💡' />;

export default {
	name: 'information',
	_id: 'information',
	title: 'Information',
	icon: Icon,
	type: 'document',
	fields: [
		{
			name: 'content',
			title: 'Informationn Content',
			type: 'richText',
			validation: Rule => Rule.required(),
		},
		{
			name: 'seo',
			type: 'seo',
		},
	],
	preview: {
		select: {
			title: 'Information',
		},
		prepare({ title }) {
			return {
				title,
				media: <Icon />,
			};
		},
	},
};
