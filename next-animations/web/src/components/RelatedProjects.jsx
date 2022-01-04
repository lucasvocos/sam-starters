import React, {useRef} from 'react';
import Link from './Link';

import {useStore} from '../store/useStore';

import {SwitchTransition, Transition} from 'react-transition-group';
import {useIntersection} from 'buena-suerte';
import cx from 'classnames';
import sanityImage from '../utils/sanityImageUrl';

const TRANSITION_DURATION = 150;

const TRANSITION_STYLES = {
	default: {
		transition: `opacity ${TRANSITION_DURATION}ms ease`,
	},
	entering: {
		opacity: 0,
	},
	entered: {
		opacity: 1,
	},
	exiting: {
		opacity: 0,
	},
	exited: {
		opacity: 0,
	},
};

const RelatedProjects = ({relatedProjects = []}) => {
	const {language} = useStore(s => ({
		language: s.language,
	}));

	const target = useRef(null);

	const isIntersected = useIntersection(target, {
		rootMargin: '-10%',
		once: true,
	});

	return (
		<div
			ref={target}
			className={cx(
				'project__related pt-5 grid grid-cols-1 lg:grid-cols-3 gap-x-2 gap-y-2 scroll--fade',
				{
					visible: isIntersected,
				},
			)}>
			<SwitchTransition>
				<Transition
					key={language}
					mountOnEnter
					unmountOnExit
					appear
					timeout={TRANSITION_DURATION}>
					{status => (
						<p
							className="sans--12 sans--14--lg uppercase font-medium col-span-1"
							style={{
								...TRANSITION_STYLES.default,
								...TRANSITION_STYLES[status],
							}}>
							{language === 'en'
								? 'Other Projects'
								: 'Otros Proyectos'}
						</p>
					)}
				</Transition>
			</SwitchTransition>

			<ul className="project__related-list mt-3 pb-5 lg:mt-0 lg:pb-10 col-span-1 lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-x-2 gap-y-2">
				{relatedProjects.map((proj, index) => {
					const {_key, client, thumbnail, slug} = proj;

					return (
						<li
							key={_key}
							className={cx('col-span-1 hover--fade', {
								'mt-1 lg:mt-0': index > 0,
							})}>
							<Link url={`/projects/${slug}`}>
								<picture>
									<source
										srcSet={sanityImage(thumbnail.url, {
											w: 1200,
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
								<p className="mono--13 mono--15--lg uppercase mt-0.5">
									{client}
								</p>
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
export default RelatedProjects;
