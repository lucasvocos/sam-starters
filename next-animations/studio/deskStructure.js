import S from '@sanity/desk-tool/structure-builder';
import React from 'react';
import Emoji from 'a11y-react-emoji';
import EyeIcon from 'part:@sanity/base/eye-icon';
import EditIcon from 'part:@sanity/base/edit-icon';
import IframePreview from './admin/components/IframePreview.jsx';

const PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL;
const PREVIEW_TOKEN = process.env.SANITY_STUDIO_CMS_PREVIEW_TOKEN;

const InfoPageIcon = () => <Emoji style={{fontSize: '2em'}} symbol="📇" />;
const ProjectListIcon = () => <Emoji style={{fontSize: '2em'}} symbol="🏭" />;
const ProjectIcon = () => <Emoji style={{fontSize: '2em'}} symbol="🏗" />;
const ArchiveIcon = () => <Emoji style={{fontSize: '2em'}} symbol="🗄" />;

const infoPageItem = S.listItem()
	.title('Information')
	.icon(InfoPageIcon)
	.child(
		S.document()
			.schemaType('infopage')
			.documentId('infopage')
			.views([
				S.view.form().icon(EditIcon),
				S.view
					.component(IframePreview)
					.options({
						previewURL: PREVIEW_URL,
						token: PREVIEW_TOKEN
					})
					.title('Draft Preview')
					.icon(EyeIcon),
			]),
	);

const workpageItem = S.listItem()
	.title('Work Page')
	.icon(ProjectListIcon)
	.child(
		S.document()
			.schemaType('projectlist')
			.documentId('projectlist')
			.views([
				S.view.form().icon(EditIcon),
				S.view
					.component(IframePreview)
					.options({
						previewURL: PREVIEW_URL,
						token: PREVIEW_TOKEN
					})
					.title('Draft Preview')
					.icon(EyeIcon),
			]),
	);

const archivepageItem = S.listItem()
	.title('Archive Page')
	.icon(ArchiveIcon)
	.child(
		S.document()
			.schemaType('archivepage')
			.documentId('archivepage')
			.views([
				S.view.form().icon(EditIcon),
				S.view
					.component(IframePreview)
					.options({
						previewURL: PREVIEW_URL,
						token: PREVIEW_TOKEN
					})
					.title('Draft Preview')
					.icon(EyeIcon),
			]),
	);

const projectsMenuItem = S.listItem()
	.title('Projects')
	.icon(ProjectIcon)
	.schemaType('project')
	.child(
		S.documentTypeList('project')
			.title('Projects')
			.child(documentId =>
				S.document()
					.documentId(documentId)
					.schemaType('project')
					.views([
						S.view.form().icon(EditIcon),
						S.view
							.component(IframePreview)
							.options({
								previewURL: PREVIEW_URL,
								token: PREVIEW_TOKEN,
							})
							.title('Draft Preview')
							.icon(EyeIcon),
					]),
			),
	);

export default () =>
	S.list()
		.title('Content')
		.items([
			infoPageItem,
			workpageItem,
			projectsMenuItem,
			S.divider(),
			archivepageItem,
		]);
