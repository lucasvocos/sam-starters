import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{ fontSize: '2em' }} symbol='🔍' />;

export default {
	name: 'seo',
	title: 'SEO',
	icon: Icon,
	type: 'object',
	options: {
		collapsible: true,
		collapsed: false,
	},
	fields: [
		{
			name: 'note',
			type: 'note',
			options: {
				icon: Icon,
				tone: 'positive',
				headline: 'Search Engine Optimization',
				message:
					'<p>The following fields help your search results, as well as show rich previews when the link is shared. (e.g. Twitter, Slack, Facebook, Text Messages, etc.)</p>',
			},
		},
		{
			name: 'metaTitle',
			title: 'Meta Title',
			type: 'string',
		},
		{
			name: 'metaDescription',
			title: 'Meta Description',
			type: 'text',
			rows: 2,
		},
		{
			name: 'metaKeywords',
			title: 'Meta Keywords',
			type: 'string',
		},

		//
		// === Opengraph ===
		//
		{
			name: 'openGraphTitle',
			title: 'OpenGraph Title',
			type: 'string',
		},
		{
			name: 'openGraphDescription',
			title: 'OpenGraph Description',
			type: 'text',
			rows: 2,
		},
		{
			name: 'openGraphImage',
			title: 'OpenGraph Image',
			type: 'image',
			description: 'Recommended size is 1200x630. No larger than 1mb.',
			fields: [
				{
					name: 'alt',
					type: 'string',
					title: 'Alt Text',
				},
			],
		},

		{
			name: 'twitterTitle',
			title: 'Twitter Title',
			type: 'string',
		},
		{
			name: 'twitterDescription',
			title: 'Twitter Description',
			type: 'text',
			rows: 2,
		},
		{
			name: 'twitterImage',
			title: 'Twitter Image',
			type: 'image',
			description: 'Recommended size is 1200x630. No larger than 1mb.',
			fields: [
				{
					name: 'alt',
					type: 'string',
					title: 'Alt Text',
				},
			],
		},
	],
};
