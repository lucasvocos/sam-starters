import groq from 'groq';

//
// === Components ===
//

export const link = groq`{
	_key,
	_type,
	openInNewWindow,
	title,
	url,
}`;
export const asset = groq`{
	_type,
	_key,
	alt,
	'dimensions': asset->metadata.dimensions,
	'url': asset->url,
}`;

export const video = groq`{
	...,
	asset->,
}`;

export const richText = groq`{
	en[],
	es[]
}`;

export const seo = groq`{
	hideFromSitemap,
	disallowRobots,
	metaTitle,
	metaDescription,
	metaKeywords,
	openGraphTitle,
	openGraphDescription,
	openGraphImage ${asset},
	twitterTitle,
	twitterDescription,
	twitterImage ${asset},
}`;

//
// === Page Components ===
//

export const componentList = groq`[]{
	_type,
	_key,
}`;

//
// === Documents ===
//

export const projectPage = groq`
	client,
	year,
	url,
	subtitle ${richText},
	description ${richText},
	technology[] {
		_key,
		en,
		es
	},
	'credits': credits.description ${richText},
	assets[] {
		_key,
		_type,
		_type == 'desktopAsset' => {
			contained,
			thumbnail ${asset}
		},
		_type == 'mobileAssets' => {
			thumbnailOne ${asset},
			thumbnailTwo ${asset}
		}
	},
	relatedProjects[] {
		_key,
		'thumbnail': @->thumbnail.asset-> {
			url,
			alt
		},
		'slug': @->slug.current,
		'client': @->client
	},
	seo ${seo},
`;


export const projectList = groq`*[
	_type == "projectlist" &&
	!(_id in path("drafts.**"))
][0] {
	list[] {
		_key,
		'client': @->client,
		'slug': @->slug.current,
		'url': @->url,
		'subtitle': @->subtitle ${richText},
		'year': @->year,
		'thumbnail': @->thumbnail.asset-> {
			url,
			alt
		}
	},
	seo ${seo}
}`;
export const archiveList = groq`*[
	_type == "archivepage" &&
	!(_id in path("drafts.**"))
][0] {
	list[] {
		_key,
		client,
		url,
		year,
		technology ${richText},
		'credits': credits.description ${richText},
	},
	seo ${seo}
}`;

export const infopage = groq`*[
	_type == "infopage" &&
	!(_id in path("drafts.**"))
][0] {
	description ${richText},
	links [] ${link},
	seo ${seo}
}`;

export const notFoundPage = groq`*[
	_type == "notFound" &&
	!(_id in path("drafts.**"))
][0] {
	title,
	mobileImage ${asset},
	desktopImage ${asset}
}`;

export const projectSlugs = groq`*[
	_type == "project" &&
	!(_id in path("drafts.**"))
].slug.current`;

export const projectBySlug = slug => groq`*[
	_type == "project" &&
	slug.current == "${slug}" &&
	!(_id in path("drafts.**"))
][0] {
	${projectPage}
}`;

export const projectById = id => groq`*[
	_type == "page" &&
	_id == "${id}"
][0] {
	${projectPage}
}`;
