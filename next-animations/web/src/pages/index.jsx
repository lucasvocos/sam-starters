import React from 'react';
import Seo from '../components/Seo';
import Logo from '../components/Logo';

import {getProjectsList} from '../api/sanity';

export const getStaticProps = async ({params}) => {
	const [home] = await Promise.all([getProjectsList()]);

	return {
		props: {
			...home,
		},
	};
};

const Homepage = ({config = {}, title, seo = {}}) => {
	const defaultMeta = config.seo || {};

	const meta = {
		...defaultMeta,
		...seo,
	};

	return (
		<React.Fragment>
			<Seo {...meta} />
			<Logo />
		</React.Fragment>
	);
};

export default Homepage;
