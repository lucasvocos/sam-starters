import React, {useState} from 'react';
import Link from './Link';
import {useStore} from '../store/useStore';

import cx from 'classnames';
import BlockContent from '@sanity/block-content-to-react';
import richText from '../serializers/richText';

import {SwitchTransition, Transition} from 'react-transition-group';

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

const ArchiveList = ({list = []}) => {
	const {language} = useStore(s => ({
		language: s.language,
	}));
	const [currentHighlight, setCurrentHighlight] = useState(null);

	return (
		<SwitchTransition>
			<Transition
				key={language}
				mountOnEnter
				unmountOnExit
				appear
				timeout={TRANSITION_DURATION}>
				{status => (
					<ul
						className="projects-index pt-3 pl-1 pr-1 pb-5 w-full grid grid-cols-12 gap-x-2 gap-y-2"
						style={{
							...TRANSITION_STYLES.default,
							...TRANSITION_STYLES[status],
						}}>
						{list && list.length > 0 && (
							<React.Fragment>
								{list.map((project, index) => {
									const {
										_key,
										url,
										year,
										client,
										technology,
										credits,
									} = project;
									return (
										<li
											key={_key}
											onMouseEnter={() =>
												setCurrentHighlight(_key)
											}
											onMouseLeave={() =>
												setCurrentHighlight(null)
											}
											className={cx(
												'projects-index__project col-span-12 lg:col-span-4',
												{
													fade:
														!!currentHighlight &&
														currentHighlight !==
															_key,
												},
											)}>
											<Link
												url={url}
												openInNewWindow
												title={client}
												className="flex">
												<p className="projects-index__project-index mono--24 w-1/3">
													{index < 9
														? `0${index + 1}`
														: index + 1}
												</p>
												<div className="projects-index__project-details w-2/3 pl-1 pr-1 lg:pr-3">
													<p className="mono--24 uppercase">
														{client}
													</p>
													{technology && (
														<div className="mono--13 mono--15--lg rich-text">
															<BlockContent
																blocks={
																	language ===
																	'en'
																		? technology.en
																		: technology.es
																}
																serializers={
																	richText
																}
															/>
														</div>
													)}
													{credits && (
														<div className="mono--13 mono--15--lg rich-text">
															<BlockContent
																blocks={
																	language ===
																	'en'
																		? credits.en
																		: credits.es
																}
																serializers={
																	richText
																}
															/>
														</div>
													)}
													{year && (
														<p className="mono--13 mono--15--lg">
															{year}
														</p>
													)}
												</div>
											</Link>
										</li>
									);
								})}
							</React.Fragment>
						)}
					</ul>
				)}
			</Transition>
		</SwitchTransition>
	);
};

export default ArchiveList;
