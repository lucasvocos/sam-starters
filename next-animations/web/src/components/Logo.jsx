import React from 'react';
import LogoBuenaSuerte from './LogoBuenaSuerte';

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

const Logo = () => {
	const {language} = useStore(s => ({
		language: s.language,
	}));
	return (
		<div className="fixed logo--buenasuerte">
			<LogoBuenaSuerte className="w-full h-auto" />
			<SwitchTransition>
				<Transition
					key={language}
					mountOnEnter
					unmountOnExit
					appear
					timeout={TRANSITION_DURATION}>
					{status => (
						<p
							className="mono--24 mono--36--lg mono--48--xxl pt-2"
							style={{
								...TRANSITION_STYLES.default,
								...TRANSITION_STYLES[status],
							}}>
							{language === 'en' ? (
								<span>
									(ESTUDIO) Buena Suerte is a Chicago-based
									creative web development studio led by Lucas
									Vocos. We center our practice on interactive
									and performant web solutions for art,
									culture, commerce, non-profit, and education
									sectors.
								</span>
							) : (
								<span>
									(ESTUDIO) Buena Suerte es un estudio de
									desarrollo web creativo dirigido por Lucas
									Vocos desde Chicago. Centramos nuestra
									práctica en soluciones web interactivas y
									performantes para los sectores del arte, la
									cultura, el comercio, las organizaciones sin
									ánimo de lucro y la educación.
								</span>
							)}
						</p>
					)}
				</Transition>
			</SwitchTransition>
		</div>
	);
};

export default Logo;
