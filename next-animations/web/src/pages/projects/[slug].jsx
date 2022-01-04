import React from 'react';
import Seo from '../../components/Seo';
import Link from '../../components/Link';
import ProjectAsset from '../../components/ProjectAsset';
import RelatedProjects from '../../components/RelatedProjects';

import BlockContent from '@sanity/block-content-to-react';
import richText from '../../serializers/richText';

import {
	getAllProjectSlugs,
	getProjectBySlug,
	getProjectById,
} from '../../api/sanity';

import {useStore} from '../../store/useStore';

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

export const getStaticPaths = async () => {
	const allProjectSlugs = await getAllProjectSlugs();

	return {
		paths: allProjectSlugs.map(slug => ({
			params: {slug},
		})),
		fallback: false,
	};
};

export const getStaticProps = async ({params, preview, previewData}) => {
	const {slug} = params;

	const pageRequest = preview
		? getProjectById(previewData.draftId)
		: getProjectBySlug(slug);

	const [page] = await Promise.all([pageRequest]);

	return {
		props: {
			...page,
		},
	};
};

const Project = ({
	config = {},
	title,
	seo = {},
	client,
	subtitle,
	year,
	url,
	description,
	credits,
	technology = [],
	assets = [],
	relatedProjects = [],
}) => {
	const {language} = useStore(s => ({
		language: s.language,
	}));

	const defaultMeta = config.seo || {};

	const fallbackMeta = {
		metaTitle: `${client} - (ESTUDIO) Buena Suerte`,
		openGraphTitle: `${client} - (ESTUDIO) Buena Suerte`,
		twitterTitle: `${client} - (ESTUDIO) Buena Suerte`,
	};

	const meta = {
		...defaultMeta,
		...fallbackMeta,
		...seo,
	};

	const introSection = (
		<SwitchTransition>
			<Transition
				key={language}
				mountOnEnter
				unmountOnExit
				appear
				timeout={TRANSITION_DURATION}>
				{status => (
					<section
						className="grid grid-cols-1 lg:grid-cols-3 gap-x-2 gap-y-2"
						style={{
							...TRANSITION_STYLES.default,
							...TRANSITION_STYLES[status],
						}}>
						{description && (
							<aside className="project__description col-span-1 lg:col-span-2">
								<p className="sans--12 sans--14--lg uppercase font-medium">
									<a
										href={url}
										target="_blank"
										rel="noreferrer noopener"
										className="underline">
										{client}
									</a>
								</p>
								<div className="mt-1 mono--13 mono--15--lg rich-text line-break rich-text--readable">
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
						)}
						<aside className="col-span-1 grid grid-cols-1 lg:grid-cols-2 gap-x-3 gapy-y-3">
							{technology && technology.length > 0 && (
								<aside className="project__technology col-span-1">
									<p className="sans--12 sans--14--lg uppercase font-medium">
										{language === 'en'
											? 'Technology'
											: 'Tecnología'}
									</p>
									<ul className="mt-1">
										{technology.map(tech => (
											<li
												key={tech._key}
												className="mono--13 mono--15--lg block fit">
												{language === 'en'
													? tech.en
													: tech.es}
											</li>
										))}
									</ul>
								</aside>
							)}

							{credits && (
								<aside className="project__credits col-span-1">
									<p className="sans--12 sans--14--lg uppercase font-medium">
										{language === 'en'
											? 'Credits'
											: 'Reconocimientos'}
									</p>
									<div className="mt-1 mono--13 mono--15--lg rich-text line-break">
										<BlockContent
											blocks={
												language === 'en'
													? credits.en
													: credits.es
											}
											serializers={richText}
										/>
									</div>
								</aside>
							)}
						</aside>
					</section>
				)}
			</Transition>
		</SwitchTransition>
	);

	const projectAssets = assets && assets.length > 0 && (
		<ul className="project__assets pt-10 lg:pt-15 lg:w-10/12 lg:mx-auto">
			{assets.map((asset, index) => (
				<ProjectAsset index={index} client={client} {...asset} />
			))}
		</ul>
	);

	const projectFooter = (
		<div className="project__footer mt-10 mb-7 lg:mt-20 grid grid-cols-1 lg:grid-cols-3 gap-x-2 gap-y-2">
			<nav className="project__footer-content flex justify-between col-span-1 lg:col-start-3">
				<p className="sans--12 sans--14--lg uppercase font-medium">
					{year}
				</p>
				<Link
					openInNewWindow
					className="sans--12 sans--14--lg uppercase font-medium underline"
					url={url}>
					{url}
				</Link>
			</nav>
		</div>
	);

	const recommendedProjects = relatedProjects &&
		relatedProjects.length > 0 && (
			<RelatedProjects relatedProjects={relatedProjects} />
		);

	return (
		<div className="project pt-3 pl-1 pr-1 pb-5">
			<Seo {...meta} />
			{introSection}
			{projectAssets}
			{projectFooter}
			{recommendedProjects}
		</div>
	);
};

export default Project;