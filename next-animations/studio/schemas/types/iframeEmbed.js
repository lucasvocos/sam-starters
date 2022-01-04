import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '2em'}} symbol="🧑‍💻" />;

export default {
	name: 'iframeEmbed',
	title: 'Iframe Embed',
	icon: Icon,
	type: 'object',
	fields: [
		{
			name: 'content',
			title: 'Content',
			type: 'code',
			options: {
				language: 'html',
			},
		},
	],
	preview: {
		select: {
			title: 'title',
			media: 'image',
		},
		prepare: () => ({title: 'Iframe Embed'}),
	},
};
