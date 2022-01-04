import React from 'react';
import Link from '../components/Link';

const MarkLink = props => {
	if (props.mark.href[0] === '/') {
		return (
			<Link
				title={props.mark.title}
				target={props.mark.openInNewWindow ? '_blank' : null}
				url={props.mark.href}>
				{props.children}
			</Link>
		);
	}
	return (
		<a
			title={props.mark.title}
			target="_blank"
			rel="noreferrer noopener"
			href={props.mark.href}>
			{props.children}
		</a>
	);
};

export default MarkLink;
