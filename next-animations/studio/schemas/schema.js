import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

// Documents
import infopage from './types/infopage';
import projectlist from './types/projectlist';
import archivepage from './types/archivepage';
import project from './types/project';

// Types
import localeRichText from './types/localeRichText';
import localeString from './types/localeString';
import richText from './types/richText';
import link from './types/link';
import seo from './types/seo';
import imageAlt from './types/imageAlt';



export default createSchema({
	name: 'default',
	types: schemaTypes.concat([

		// Pages
		infopage,
		project,
		projectlist,
		archivepage,

		// Types
		localeRichText,
		localeString,
		richText,
		link,
		seo,
		imageAlt,


	]),
});
