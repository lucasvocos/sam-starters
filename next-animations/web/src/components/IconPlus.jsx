import React from 'react';
import {useStore} from '../store/useStore';

const IconPlus = props => {
	const {isDarkMode} = useStore(s => ({
		isDarkMode: s.isDarkMode,
	}));

	return (
		<svg
			{...props}
			width="9"
			height="9"
			viewBox="0 0 9 9"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M5.35091 3.67213H9V5.32787H5.35091V9H3.63273V5.32787H0V3.67213H3.63273V0H5.35091V3.67213Z"
				fill={isDarkMode ? 'var(--color-wheat)' : 'var(--color-black)'}
			/>
		</svg>
	);
};

export default IconPlus;
