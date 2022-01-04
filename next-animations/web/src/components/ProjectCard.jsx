import React, {useRef, useEffect} from 'react';
import Link from './Link';
import {useIntersection} from 'buena-suerte';

import cx from 'classnames';
import sanityImage from '../utils/sanityImageUrl';

const ProjectCard = ({slug, thumbnail, client}) => {
	const target = useRef(null);
	const isIntersected = useIntersection(target, {
		rootMargin: '-10%',
		once: true,
	});

	useEffect(() => {
		if (typeof window !== undefined && typeof document !== undefined) {
			const body = document.body;
			body.dispatchEvent(new Event('scroll'));
		}
	}, []);

	return (
		<li
			ref={target}
			className={cx(
				'col-span-12 lg:col-span-4 scroll--fade hover--fade',
				{
					visible: isIntersected,
				},
			)}>
			<Link url={`/projects/${slug}`} title={client}>
				<picture>
					<source
						srcSet={sanityImage(thumbnail.url, {
							w: 1000,
						})}
						media="(min-width: 2000px)"
					/>
					<source
						srcSet={sanityImage(thumbnail.url, {
							w: 800,
						})}
						media="(min-width: 1600px)"
					/>
					<source
						srcSet={sanityImage(thumbnail.url, {
							w: 600,
						})}
						media="(min-width: 1200px)"
					/>
					<source
						srcSet={sanityImage(thumbnail.url, {
							w: 500,
						})}
						media="(min-width: 1000px)"
					/>
					<source
						srcSet={sanityImage(thumbnail.url, {
							w: 800,
						})}
						media="(min-width: 600px)"
					/>
					<img
						className="block w-full project__thumbnail"
						alt={thumbnail.alt || client}
						src={sanityImage(thumbnail.url, {
							w: 600,
						})}
					/>
				</picture>
				<p className="mono--13 mono--15--lg uppercase mt-1">{client}</p>
			</Link>
		</li>
	);
};

export default ProjectCard;
