import React from 'react';
import {useStore} from '../store/useStore';

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

const Footer = () => {
	const {language} = useStore(s => ({
		language: s.language,
	}));

	return (
		<SwitchTransition>
			<Transition
				key={language}
				mountOnEnter
				unmountOnExit
				appear
				timeout={TRANSITION_DURATION}>
				{status => (
					<footer
						className="footer fixed bottom-0 p-1 flex w-screen align-middle justify-between lg:grid lg:grid-cols-3 lg:gap-y-2 lg:gap-x-2"
						style={{
							...TRANSITION_STYLES.default,
							...TRANSITION_STYLES[status],
						}}>
						<p className="uppercase sans--12 sans--14--lg font-medium lg:col-span-1">
							{language === 'en'
								? 'Creative Development & Technology'
								: 'Desarrollo Creativo y Tecnología'}
						</p>
						{/* <p
						className='hidden lg:inline-block uppercase sans--12 sans--14--lg fw--500'>
						Chicago, USA
					</p> */}
						<a
							className="hidden lg:inline-block uppercase sans--12 sans--14--lg underline--invert font-medium lg:col-span-1 text-right"
							href="mailto:info@buena-suerte.studio">
							info@buena-suerte.studio
						</a>

						<p className="text-right sans--12 sans--14--lg font-medium lg:col-span-1">
							© {new Date().getFullYear()}
						</p>
					</footer>
				)}
			</Transition>
		</SwitchTransition>
	);
};

export default Footer;
