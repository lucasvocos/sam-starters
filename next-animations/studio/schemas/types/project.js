import React from 'react';
import Emoji from 'a11y-react-emoji';
// import Tabs from 'sanity-plugin-tabs';
import {FieldsetTabs} from 'sanity-plugin-fieldset-tabs'


const Icon = () => <Emoji style={{fontSize: '2em'}} symbol="🏗" />;
const DesktopIcon = () => <Emoji style={{fontSize: '2em'}} symbol="🖥" />;
const MobileIcon = () => <Emoji style={{fontSize: '2em'}} symbol="📱" />;

const desktopAsset = {
	name: 'desktopAsset',
	title: 'Desktop Asset',
	type: 'object',
	icon: DesktopIcon,
	fields: [
		{
			name: 'contained',
			title: 'Contained',
			type: 'boolean',
			options: {layout: 'checkbox',},
		},
		{
			name: 'thumbnail',
			title: 'thumbnail',
			type: 'imageAlt',
			validation: Rule => Rule.required(),
		},
	],
	initialValue: {
		contained: false,
	},
	preview: {
		select: {
			media: 'thumbnail',
		},
		prepare({ media }) {
			return {
				title: 'Desktop Image',
				media,
			};
		},
	},
};

const mobileAssets = {
	name: 'mobileAssets',
	title: 'Mobile Assets',
	type: 'object',
	icon: MobileIcon,
	fields: [
		{
			name: 'thumbnailOne',
			title: 'Thumbnail One',
			type: 'imageAlt',
			validation: Rule => Rule.required(),
		},
		{
			name: 'thumbnailTwo',
			title: 'Thumbnail Two',
			type: 'imageAlt',
			validation: Rule => Rule.required(),
		},
	],
	preview: {
		select: {
			media: 'thumbnailOne',
		},
		prepare({ media }) {
			return {
				title: 'Mobile Images',
				media,
			};
		},
	},
};

export default {
	name: 'project',
	title: 'Project',
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
			name: 'client',
			title: 'Client',
			type: 'string',
			validation: Rule => Rule.required(),
			fieldset: 'main'
		},
		{
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			options: {
				source: 'client',
				maxLength: 200, // will be ignored if slugify is set
				slugify: input => input
									.toLowerCase()
									.replace(/\s+/g, '-')
									.slice(0, 200)
			},
			fieldset: 'main'
		},
		{
			name: 'subtitle',
			title: 'Subtitle',
			type: 'localeRichText',
			fieldset: 'main'
		},
		{
			name: 'year',
			title: 'Year Completed',
			type: 'string',
			validation: Rule => Rule.required(),
			fieldset: 'main'
		},
		{
			name: 'thumbnail',
			title: 'Thumbnail',
			type: 'imageAlt',
			validation: Rule => Rule.required(),
			fieldset: 'main'
		},
		{
			name: 'url',
			title: 'URL',
			type: 'url',
			validation: Rule => Rule.required(),
			fieldset: 'main'
		},
		{
			name: 'description',
			title: 'Description',
			type: 'localeRichText',
			validation: Rule => Rule.required(),
			fieldset: 'main'
		},
		{
			name: 'technology',
			title: 'Technology',
			type: 'array',
			of: [{type: 'localeString'}],
			fieldset: 'main'
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
			fieldset: 'main'
		},
		{
			name: 'assets',
			title: 'Assets',
			type: 'array',
			of: [
				desktopAsset, mobileAssets
			],
			fieldset: 'main'
		},
		{
			name: 'relatedProjects',
			title: 'Related Projects',
			type: 'array',
			of: [{type: 'reference', to: [{type: 'project'}]}],
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
			title: 'client',
			subtitle: 'year',
			media: 'thumbnail'
		},
		prepare({title, subtitle, media}) {
			return {
				title,
				subtitle,
				media
			};
		},
	},
};
