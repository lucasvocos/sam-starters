import S from '@sanity/desk-tool/structure-builder';
import React from 'react';
import EyeIcon from 'part:@sanity/base/eye-icon';
import EditIcon from 'part:@sanity/base/edit-icon';
import Emoji from 'a11y-react-emoji';
import IframePreview from './admin/components/IframePreview.jsx';

const PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL;

const InfoIcon = () => <Emoji style={{ fontSize: '2em' }} symbol='💡' />;
const HomeIcon = () => <Emoji style={{ fontSize: '2em' }} symbol='🏠' />;

//
// === Menu Items ===
//

const homeMenuItem = S.listItem()
	.title('Overview (Homepage)')
	.icon(HomeIcon)
	.child(
		S.document()
			.schemaType('homepage')
			.documentId('homepage')
			.views([
				S.view.form().icon(EditIcon),
				S.view
					.component(IframePreview)
					.options({ previewURL: PREVIEW_URL })
					.title('Draft Preview')
					.icon(EyeIcon),
			]),
	);

const projectMenuItem = S.listItem()
	.title('Projects')
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
							.options({ previewURL: PREVIEW_URL })
							.title('Draft Preview')
							.icon(EyeIcon),
					]),
			),
	);

const infoMenuItem = S.listItem()
	.title('Information')
	.icon(InfoIcon)
	.child(
		S.document()
			.schemaType('information')
			.documentId('information')
			.views([
				S.view.form().icon(EditIcon),
				S.view
					.component(IframePreview)
					.options({ previewURL: PREVIEW_URL })
					.title('Draft Preview')
					.icon(EyeIcon),
			]),
	);

//
// === Structure ===
//

export default () =>
	S.list().title('Content').items([homeMenuItem, S.divider(), projectMenuItem, S.divider(), infoMenuItem]);
