import sanityClient from '@sanity/client';
import * as queries from './queries';

const useCdn = process.env.SANITY_USE_CDN === 'true';

const client = sanityClient({
	projectId: process.env.SANITY_PROJECT_ID,
	dataset: process.env.SANITY_DATASET,
	token: useCdn ? null : process.env.SANITY_API_TOKEN,
	apiVersion: process.env.SANITY_API_VERSION,
	useCdn,
});

export default client;

//
// === Sanity API Requests ===
//

// Pages
export const getInfoPage = () => client.fetch(queries.infopage);
export const getProjectsList = () => client.fetch(queries.projectList);
export const getArchiveList = () => client.fetch(queries.archiveList);
export const getAllProjectSlugs = () => client.fetch(queries.projectSlugs);
export const getProjectBySlug = slug =>
	client.fetch(queries.projectBySlug(slug));
export const getProjectById = id => client.fetch(queries.projectById(id));

export const getNotFoundPage = () => client.fetch(queries.notFoundPage);

