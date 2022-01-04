import React from 'react';
import Seo from '../../components/Seo';
import Link from '../../components/Link';

import {useStore} from '../../store/useStore';
import {getInfoPage} from '../../api/sanity';

import BlockContent from '@sanity/block-content-to-react';
import richText from '../../serializers/richText';

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

export const getStaticProps = async () => {
	const [page] = await Promise.all([getInfoPage()]);

	return {
		props: {
			...page,
		},
	};
};

const Information = ({config = {}, seo = {}, description, links = []}) => {
	const defaultMeta = config.seo || {};

	const meta = {
		...defaultMeta,
		...seo,
	};

	const {language} = useStore(s => ({
		language: s.language,
	}));

	return (
		<React.Fragment>
			<Seo {...meta} />
			<SwitchTransition>
				<Transition
					key={language}
					mountOnEnter
					unmountOnExit
					appear
					timeout={TRANSITION_DURATION}>
					{status => (
						<section
							className="information pt-3 pl-1 pr-1 pb-5 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-2"
							style={{
								...TRANSITION_STYLES.default,
								...TRANSITION_STYLES[status],
							}}>
							<aside className="information__description col-span-1 lg:col-span-2">
								<p className="sans--12 sans--14--lg uppercase font-medium">
									{language === 'en'
										? 'Information'
										: 'Información'}
								</p>
								<div className="mono--13 mono--15--lg rich-text line-break mt-1 rich-text--readable">
									<BlockContent
										blocks={
											language === 'en'
												? description.en
												: description.es
										}
										serializers={richText}
									/>
								</div>
							</aside>

							<aside className="information__links flex flex-col lg:flex-row col-span-1">
								{links && links.length > 0 && (
									<div className="lg:pr-2 lg:w-1/2">
										<p className="sans--12 sans--14--lg uppercase font-medium">
											{language === 'en'
												? 'Friends & Collaborators'
												: 'Amigos Y Colaboradores'}
										</p>

										<ul className="mt-1">
											{links.map((link, index) => (
												<Link
													className="mono--13 mono--15--lg block fit underline"
													key={link._key}
													{...link}
												/>
											))}
										</ul>
									</div>
								)}
								<div className="mt-3 lg:mt-0 lg:pr-2 lg:w-1/2">
									<p className="sans--12 sans--14--lg uppercase font-medium">
										{language === 'en'
											? 'Services & Capabilities'
											: 'Servicios y capacidades'}
									</p>

									<ul className="mt-1">
										{language === 'en' ? (
											<React.Fragment>
												<li className="mono--13 mono--15--lg block fit">
													Frontend Development
												</li>
												<li className="mono--13 mono--15--lg block fit">
													Backend Development
												</li>
												<li className="mono--13 mono--15--lg block fit">
													eCommerce Development
												</li>
												<li className="mono--13 mono--15--lg block fit">
													API Development
												</li>
												<li className="mono--13 mono--15--lg block fit">
													Technical Consulting
												</li>
												<li className="mono--13 mono--15--lg block fit">
													Static Websites
												</li>
												<li className="mono--13 mono--15--lg block fit">
													Headless Websites
												</li>
												<li className="mono--13 mono--15--lg block fit">
													Shopify
												</li>
												<li className="mono--13 mono--15--lg block fit">
													Sanity & Contentful
												</li>
												<li className="mono--13 mono--15--lg block fit">
													Serverless Integration
												</li>
											</React.Fragment>
										) : (
											<React.Fragment>
												<li className="mono--13 mono--15--lg block fit">
													Desarrollo de Frontend
												</li>
												<li className="mono--13 mono--15--lg block fit">
													Desarrollo de Backend
												</li>
												<li className="mono--13 mono--15--lg block fit">
													Desarrollo de eCommerce
												</li>
												<li className="mono--13 mono--15--lg block fit">
													Desarrollo de API
												</li>
												<li className="mono--13 mono--15--lg block fit">
													Consultoría técnica
												</li>
												<li className="mono--13 mono--15--lg block fit">
													Sitios web estáticos
												</li>
												<li className="mono--13 mono--15--lg block fit">
													Sitios web sin cabeza
												</li>
												<li className="mono--13 mono--15--lg block fit">
													Shopify
												</li>
												<li className="mono--13 mono--15--lg block fit">
													Sanity & Contentful
												</li>
												<li className="mono--13 mono--15--lg block fit">
													Integración sin servidor
												</li>
											</React.Fragment>
										)}
									</ul>
								</div>
							</aside>
						</section>
					)}
				</Transition>
			</SwitchTransition>
		</React.Fragment>
	);
};

export default Information;
