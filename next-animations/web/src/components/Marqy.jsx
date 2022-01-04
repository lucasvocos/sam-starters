import React from 'react';

import {Marqy} from 'marqy';
import 'marqy/styles.css';

export default ({children, speed = 0.2, ...props}) => (
	<Marqy {...props} speed={speed}>
		{children}
	</Marqy>
);
