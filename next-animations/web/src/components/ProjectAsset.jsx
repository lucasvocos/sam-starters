import React, {useRef, useEffect} from 'react';
import {useIntersection} from 'buena-suerte';

import cx from 'classnames';
import sanityImage from '../utils/sanityImageUrl';

const ProjectAsset = ({
	_type,
	thumbnail,
	thumbnailOne,
	thumbnailTwo,
	index,
	client,
}) => {
	const target = useRef(null);
	const isIntersected = useIntersection(target, {
		rootMargin: '-10%',
		once: true,
	});

	useEffect(() => {
		const body = document.body;
		body.dispatchEvent(new Event('scroll'));
	}, []);

	return (
		<li
			ref={target}
			className={cx('scroll--fade', {
				// 'contained mx-auto lg:w-8/12': contained,
				'scroll--fade--single': _type === 'desktopAsset',
				'scroll--fade--multi w-10/12 mx-auto lg:w-8/12 flex justify-between':
					_type === 'mobileAssets',
				'mt-10 lg:mt-20': index > 0,
				visible: isIntersected,
			})}>
			{_type === 'desktopAsset' && (
				<picture>
					<source
						srcSet={sanityImage(thumbnail.url, {
							w: 2000,
						})}
						media="(min-width: 1600px)"
					/>
					<source
						srcSet={sanityImage(thumbnail.url, {
							w: 1600,
						})}
						media="(min-width: 1200px)"
					/>
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
						className="block w-full lg:rounded-md"
						alt={thumbnail.alt || client}
						src={sanityImage(thumbnail.url, {
							w: 600,
						})}
					/>
				</picture>
			)}

			{_type === 'mobileAssets' && (
				<React.Fragment>
					<div className="project__asset-multi project__asset-multi--first mr-1 pt-5 lg:pt-10">
						<picture>
							<source
								srcSet={sanityImage(thumbnailOne.url, {
									w: 2000,
								})}
								media="(min-width: 1600px)"
							/>
							<source
								srcSet={sanityImage(thumbnailOne.url, {
									w: 1600,
								})}
								media="(min-width: 1200px)"
							/>
							<source
								srcSet={sanityImage(thumbnailOne.url, {
									w: 1200,
								})}
								media="(min-width: 1000px)"
							/>
							<source
								srcSet={sanityImage(thumbnailOne.url, {
									w: 800,
								})}
								media="(min-width: 600px)"
							/>
							<img
								className="block w-full rounded-md"
								alt={thumbnailOne.alt || client}
								src={sanityImage(thumbnailOne.url, {
									w: 600,
								})}
							/>
						</picture>
					</div>

					<div className="project__asset-multi ml-1">
						<picture>
							<source
								srcSet={sanityImage(thumbnailTwo.url, {
									w: 2000,
								})}
								media="(min-width: 1600px)"
							/>
							<source
								srcSet={sanityImage(thumbnailTwo.url, {
									w: 1600,
								})}
								media="(min-width: 1200px)"
							/>
							<source
								srcSet={sanityImage(thumbnailTwo.url, {
									w: 1200,
								})}
								media="(min-width: 1000px)"
							/>
							<source
								srcSet={sanityImage(thumbnailTwo.url, {
									w: 800,
								})}
								media="(min-width: 600px)"
							/>
							<img
								className="block w-full rounded-md"
								alt={thumbnailTwo.alt || client}
								src={sanityImage(thumbnailTwo.url, {
									w: 600,
								})}
							/>
						</picture>
					</div>
				</React.Fragment>
			)}
		</li>
	);
};

export default ProjectAsset;
