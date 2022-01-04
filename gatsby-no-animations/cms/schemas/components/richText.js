import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{ fontSize: '2em' }} symbol='📝' />;

export default {
	name: 'richText',
	title: 'Rich Text',
	icon: Icon,
	type: 'array',
	of: [
		{
			type: 'block',
			styles: [
				{
					title: 'Normal',
					value: 'normal',
				},
			],
			marks: {
				decorators: [
					{
						title: 'Strong',
						value: 'strong',
					},
					{
						title: 'Emphasis',
						value: 'em',
					},
				],
				annotations: [
					{
						name: 'link',
						type: 'object',
						title: 'Link',
						fields: [
							{
								name: 'href', // this is for blocks only
								title: 'URL',
								type: 'url',
								validation: Rule =>
									Rule.required().uri({
										allowRelative: true,
										scheme: ['http', 'https', 'tel', 'mailto'],
									}),
							},
							{
								name: 'openInNewWindow',
								title: 'Open In New Window',
								type: 'boolean',
								layout: 'checkbox',
							},
						],
					},
				],
			},
		},
	],
};
