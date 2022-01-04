import createSchema from 'part:@sanity/base/schema-creator';

import schemaTypes from 'all:part:@sanity/base/schema-type';

// documents
import homepage from './documents/homepage';
import project from './documents/project';
import information from './documents/information';
import seo from './documents/seo';

// components
import richText from './components/richText';
import asset from './components/asset';

export default createSchema({
	name: 'default',

	types: schemaTypes.concat([homepage, project, information, seo, richText, asset]),
});
