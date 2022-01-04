const groq = require("groq")

//
// === Drafts ===
//

module.exports.draftDocument = draftId => groq`*[_id == "${draftId}"][0] {...}`

const asset = groq`{
	_type,
	_key,
	alt,
	'dimensions': asset->metadata.dimensions,
	'url': asset->url,
}`

const richText = groq`[]{
	...,
	"asset": asset->,
}`

const seo = groq`{
	metaTitle,
	metaDescription,
	metaKeywords,
	openGraphTitle,
	openGraphDescription,
	openGraphImage ${asset},
	twitterTitle,
	twitterDescription,
	twitterImage ${asset},
}`

//
// === Homepage ===
//

module.exports.homepage = groq`*[_type == "homepage"][0] {
	"overview": content[] {
		_key,
		title ${richText},
		"image": image ${asset}
	},
	seo ${seo},
}`

module.exports.draftHomepage = draftId => groq`*[_type == "homepage" && _id == "${draftId}"][0] {
	"overview": content[] {
		_key,
		title ${richText},
		"image": image ${asset}
	},
	seo ${seo},
}`

//
// === Information ===
//

module.exports.informationpage = groq`*[_type == "information"][0] {
	content ${richText},
	seo ${seo},
}`

module.exports.draftInformationpage = draftId => groq`*[_type == "information" && _id == "${draftId}"][0] {
	content ${richText},
	seo ${seo},
}`

//
// === Pages ===
//

module.exports.projects = groq`*[_type == "project"] {
	draft,
	_id,
	title,
	'url': url.current,
	'thumbnail': thumbnail.image.asset->url,
	content[] {
		_key,
		title ${richText},
		"image": image ${asset}
	},
	seo ${seo}
}`

module.exports.draftProject = draftId => groq`*[_type == "project" && _id == "${draftId}"][0]{
	draft,
	_id,
	title,
	'url': url.current,
	'thumbnail': thumbnail.image.asset->url,
	content[] {
		_key,
		title ${richText},
		"image": image ${asset}
	},
	seo ${seo}
}`
