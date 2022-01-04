import React from 'react';
import Seo from '../../components/Seo';
import ProjectListThumbnails from '../../components/ProjectListThumbnails';

import {getProjectsList} from '../../api/sanity';

export const getStaticProps = async () => {
	const [page] = await Promise.all([getProjectsList()]);

	return {
		props: {
			...page,
		},
	};
};

const ProjectsList = ({config = {}, title, seo = {}, list = []}) => {
	const defaultMeta = config.seo || {};

	const meta = {
		...defaultMeta,
		...seo,
		title,
	};

	return (
		<React.Fragment>
			<Seo {...meta} />
			<ProjectListThumbnails list={list} />
		</React.Fragment>
	);
};

export default ProjectsList;
