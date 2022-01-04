import React from 'react';
import {defaultSerializers} from '@sanity/block-content-to-react';
import MarkLink from '../components/MarkLink';

export default {
	types: {
		block: props => {
			const {style = 'normal'} = props.node;

			if (style === 'h1') {
				return <h1>{props.children}</h1>;
			} else if (style === 'h2') {
				return <h2>{props.children}</h2>;
			} else if (style === 'h3') {
				return <h3>{props.children}</h3>;
			} else if (style === 'monospace') {
				return <p className="monospace">{props.children}</p>;
			}

			// Fall back to default handling
			return defaultSerializers.types.block(props);
		},
	},
	marks: {
		link: MarkLink,
	},
};
