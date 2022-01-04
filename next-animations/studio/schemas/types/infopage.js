import React from 'react';
import Emoji from 'a11y-react-emoji';
// import Tabs from 'sanity-plugin-tabs';
import {FieldsetTabs} from 'sanity-plugin-fieldset-tabs'

const Icon = () => <Emoji style={{fontSize: '2em'}} symbol="📝" />;


export default {
	name: 'infopage',
	id: 'infopage',
	title: 'Information',
	icon: Icon,
	type: 'document',
	inputComponent: FieldsetTabs,
	fieldsets: [
		{name: 'main', title: 'Main'},
		{name: 'seo', title: 'SEO'},
	],
	fields: [
		//
		// === Main ===
		//
		{
			name: 'title',
			title: 'title',
			type: 'string',
			fieldset: 'main',
			hidden: true,
		},
		{
			name: 'description',
			title: 'Description',
			type: 'localeRichText',
			fieldset: 'main'
		},
		{
			name: 'links',
			title: 'Links',
			type: 'array',
			of: [{type: 'link'}],
			fieldset: 'main'
		},

		//
		// === Meta ===
		//
		{
			type: 'seo',
			name: 'seo',
			fieldset: 'seo',
		},
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'url',
		},
		prepare({title, subtitle}) {
			return {
				title,
				subtitle,
				media: <Icon />,
			};
		},
	},
};
