import React from 'react';
import ProjectCard from './ProjectCard';

const ProjectListThumbnails = ({list = []}) => (
	<ul className="projects-list pt-3 pl-1 pr-1 pb-5 lg:mx-auto lg:pb-20 grid grid-cols-12 gap-y-2 gap-x-2">
		{list && list.length > 0 && (
			<React.Fragment>
				{list.map(project => (
					<ProjectCard key={project._key} {...project} />
				))}
			</React.Fragment>
		)}
	</ul>
);

export default ProjectListThumbnails;
