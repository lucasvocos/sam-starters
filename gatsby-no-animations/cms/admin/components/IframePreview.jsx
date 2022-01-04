import React from 'react';
import styles from './IframePreview.css';

export default ({document, options}) => {
	const {displayed} = document;
	const url = `${options.previewURL}?documentId=${displayed._id}`;
	
	return (
		<div className={styles.iframeContainer}>
			<iframe src={url} frameBorder={'0'} />
		</div>
	);
};