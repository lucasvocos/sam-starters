import React from 'react';
import Emoji from 'a11y-react-emoji';
// import Tabs from 'sanity-plugin-tabs';
import {FieldsetTabs} from 'sanity-plugin-fieldset-tabs';

const Icon = () => <Emoji style={{fontSize: '2em'}} symbol="🚀" />;
const ProjectIcon = () => <Emoji style={{fontSize: '2em'}} symbol="🏗" />;

const project = {
	name: 'project',
	title: 'Project',
	type: 'object',
	icon: ProjectIcon,
	fields: [
		{
			name: 'client',
			title: 'Client',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			name: 'year',
			title: 'Year Completed',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			name: 'url',
			title: 'URL',
			type: 'url',
			validation: Rule => Rule.required(),
		},
		{
			name: 'technology',
			title: 'Technology',
			type: 'localeRichText',
			validation: Rule => Rule.required(),
		},
		{
			name: 'credits',
			title: 'Credits',
			type: 'object',
			fields: [
				{
					name: 'description',
					title: 'Credits',
					type: 'localeRichText',
				},
			],
		},
	],
	preview: {
		select: {
			title: 'client',
			year: 'year',
		},
		prepare({ title, year }) {
			return {
				title,
				subtitle: `${year}`,
			};
		},
	},
};


export default {
	name: 'archivepage',
	id: 'archivepage',
	title: 'Archive Page',
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
			name: 'list',
			title: 'Projects',
			type: 'array',
			of: [project],
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
