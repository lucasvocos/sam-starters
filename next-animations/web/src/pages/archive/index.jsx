import React from 'react';
import Seo from '../../components/Seo';

import ArchiveList from '../../components/ArchiveList';

import {getArchiveList} from '../../api/sanity';

export const getStaticProps = async ({params}) => {
	const [page] = await Promise.all([getArchiveList()]);

	return {
		props: {
			...page,
		},
	};
};

const ProjectIndex = ({config = {}, title, seo = {}, list = []}) => {
	const defaultMeta = config.seo || {};

	const meta = {
		...defaultMeta,
		...seo,
	};

	return (
		<React.Fragment>
			<Seo {...meta} />
			<ArchiveList list={list} />
		</React.Fragment>
	);
};

export default ProjectIndex;
