import React from 'react';
import {LazyMotion} from 'framer-motion';
import features from '../config/framerFeatures';

// TODO: https://github.com/framer/motion/issues/1056
// can't dynamically import the feature set

const FramerMotionConfig = ({children}) => (
	<LazyMotion features={features} strict>
		{children}
	</LazyMotion>
);

export default FramerMotionConfig;
