module.exports = {
	target: 'serverless',
	async rewrites() {
		return {
			beforeFiles: [
				{
					source: '/project-index',
					destination: '/archive',
				},
			]
		};
	},
};
