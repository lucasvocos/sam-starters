import React, {useState} from 'react';
import IconPlus from './IconPlus';
import Link from './Link';

import {useRouter} from 'next/router';
import {useStore} from '../store/useStore';
import cx from 'classnames';

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

const MobileMenu = ({
	isMenuOpen,
	setIsMenuOpen,
	isDarkMode,
	setDarkMode,
	language,
	setLanguage,
}) => {
	return (
		<nav
			className={cx(
				'header__mobile-menu px-1 pt-6 fixed lg:hidden pointer-events-none opacity-0 inset-0',
				{
					'active pointer-events-auto opacity-100': isMenuOpen,
					'bg-wheat': !isDarkMode,
					'bg-black': isDarkMode,
				},
			)}>
			<SwitchTransition>
				<Transition
					key={language}
					mountOnEnter
					unmountOnExit
					appear
					timeout={TRANSITION_DURATION}>
					{status => (
						<div
							className="flex flex-col h-full"
							style={{
								...TRANSITION_STYLES.default,
								...TRANSITION_STYLES[status],
							}}>
							<Link
								onClick={() => setIsMenuOpen(false)}
								url={'/projects'}
								title={
									language === 'en' ? 'Projects' : 'Proyectos'
								}
								aria-label={
									language === 'en' ? 'Projects' : 'Proyectos'
								}
								className="block uppercase mono--24 fit">
								{language === 'en' ? 'Work' : 'Proyectos'}
							</Link>
							<Link
								onClick={() => setIsMenuOpen(false)}
								url={'/archive'}
								title={
									language === 'en' ? 'Archive' : 'Archivo'
								}
								aria-label={
									language === 'en' ? 'Archive' : 'Archivo'
								}
								className="block uppercase mono--24 fit">
								{language === 'en' ? 'Archive' : 'Archivo'}
							</Link>
							<Link
								onClick={() => setIsMenuOpen(false)}
								url={'/information'}
								title={
									language === 'en'
										? 'Information'
										: 'Información'
								}
								aria-label={
									language === 'en'
										? 'Information'
										: 'Información'
								}
								className="block uppercase mono--24 fit">
								{language === 'en'
									? 'Information'
									: 'Información'}
							</Link>
							<div className="mt-4 flex">
								<button
									className={cx('uppercase mono--24 mr-1', {
										'font-bold': language === 'en',
									})}
									title={
										language === 'en'
											? 'Set Language to English'
											: 'Establecer el idioma al inglés'
									}
									aria-label={
										language === 'en'
											? 'Set Language to English'
											: 'Establecer el idioma al inglés'
									}
									onClick={() => setLanguage('en')}>
									EN
								</button>
								<span className="mr-1">/</span>
								<button
									className={cx('uppercase mono--24', {
										'font-bold': language === 'es',
									})}
									title={
										language === 'en'
											? 'Set Language to Spanish'
											: 'Establecer el idioma a español'
									}
									aria-label={
										language === 'en'
											? 'Set Language to Spanish'
											: 'Establecer el idioma a español'
									}
									onClick={() => setLanguage('es')}>
									ES
								</button>
							</div>
							<div className="flex">
								<button
									className={cx('uppercase mono--24 mr-1', {
										'font-bold': isDarkMode,
									})}
									title={
										language === 'en'
											? 'Toggle Dark Mode Off'
											: 'Activar el modo oscuro'
									}
									aria-label={
										language === 'en'
											? 'Toggle Dark Mode Off'
											: 'Activar el modo oscuro'
									}
									onClick={() => setDarkMode(true)}>
									{language === 'en' ? 'Dark' : 'Oscuro'}
								</button>
								<span className="mr-1">/</span>
								<button
									className={cx('uppercase mono--24', {
										'font-bold': !isDarkMode,
									})}
									title={
										language === 'en'
											? 'Toggle Dark Mode On'
											: 'Desactivar el modo oscuro'
									}
									aria-label={
										language === 'en'
											? 'Toggle Dark Mode On'
											: 'Desactivar el modo oscuro'
									}
									onClick={() => setDarkMode(false)}>
									{language === 'en' ? 'Light' : 'Luminoso'}
								</button>
							</div>
							<a
								href="mailto:info@buena-suerte.studio"
								title={
									language === 'en'
										? 'Email Link'
										: 'Correo Electronico'
								}
								aria-label={
									language === 'en'
										? 'Email Link'
										: 'Correo Electronico'
								}
								className="mt-4 mono--24 uppercase block fit">
								info@buena-suerte.studio
							</a>
							<Link
								url="https://www.instagram.com/estudio.buenasuerte/"
								openInNewWindow
								title={
									language === 'en'
										? 'Instagram Account'
										: 'Cuenta de Instagram'
								}
								aria-label={
									language === 'en'
										? 'Instagram Account'
										: 'Cuenta de Instagram'
								}
								className="mono--24 uppercase block fit">
								Instagram
							</Link>

							<div className="mt-auto pb-1 flex justify-between">
								<p className="sans--12 sans--14--lg uppercase font-medium">
									{language === 'en'
										? 'Creative Development & Technology'
										: 'Desarrollo Creativo y Tecnología'}
								</p>
								<p className="sans--12 sans--14--lg font-medium">
									© {new Date().getFullYear()}
								</p>
							</div>
						</div>
					)}
				</Transition>
			</SwitchTransition>
		</nav>
	);
};

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const {isDarkMode, setDarkMode, language, setLanguage} = useStore(s => ({
		isDarkMode: s.isDarkMode,
		setDarkMode: s.setDarkMode,
		language: s.language,
		setLanguage: s.setLanguage,
	}));

	const {pathname} = useRouter();

	const animatedNav = (
		<div className="hidden lg:block header__links lg:col-span-1">
			<SwitchTransition>
				<Transition
					key={language}
					mountOnEnter
					unmountOnExit
					appear
					timeout={TRANSITION_DURATION}>
					{status => (
						<nav
							className="flex"
							style={{
								...TRANSITION_STYLES.default,
								...TRANSITION_STYLES[status],
							}}>
							<Link
								url={'/projects'}
								title={
									language === 'en' ? 'Projects' : 'Proyectos'
								}
								aria-label={
									language === 'en' ? 'Projects' : 'Proyectos'
								}
								className={cx(
									'inline-block uppercase sans--12 sans--14--lg fit mr-3 link--header font-medium relative',
									{
										active: pathname === '/projects',
									},
								)}>
								{language === 'en' ? 'Work' : 'Proyectos'}
							</Link>
							<Link
								url={'/archive'}
								title={
									language === 'en' ? 'Archive' : 'Archivo'
								}
								aria-label={
									language === 'en' ? 'Archive' : 'Archivo'
								}
								className={cx(
									'inline-block uppercase sans--12 sans--14--lg fit mr-3 link--header font-medium',
									{
										active: pathname === '/archive',
									},
								)}>
								{language === 'en' ? 'Archive' : 'Archivo'}
							</Link>
							<Link
								url={'/information'}
								title={
									language === 'en'
										? 'Information'
										: 'Información'
								}
								aria-label={
									language === 'en'
										? 'About Page'
										: 'Información'
								}
								className={cx(
									'inline-block uppercase sans--12 sans--14--lg fit link--header font-medium',
									{
										active: pathname === '/information',
									},
								)}>
								{language === 'en'
									? 'Information'
									: 'Información'}
							</Link>
						</nav>
					)}
				</Transition>
			</SwitchTransition>
		</div>
	);

	return (
		<React.Fragment>
			<header className="header sticky top-0 p-0 lg:p-1 w-screen overflow-hidden">
				<nav className="flex justify-between relative lg:grid lg:grid-cols-3 lg:gap-y-2 lg:gap-x-2">
					<Link
						url={'/'}
						title={language === 'en' ? 'Home' : 'Inicio'}
						aria-label={language === 'en' ? 'Home' : 'Inicio'}
						className="uppercase mono--13 mono--15--lg flex header__logo lg:col-span-1 p-1 lg:p-0 font-medium">
						<span className="sans--12 sans--14--lg uppercase mr-0.5">
							(ESTUDIO)
						</span>
						Buena Suerte
					</Link>

					{animatedNav}
					<div className="hidden lg:block header__language lg:col-span-1">
						<div className="flex">
							<button
								className={cx(
									'font-medium block p-0 uppercase sans--12 sans--14--lg mr-0.5',
									{
										fade: language !== 'en',
									},
								)}
								title={
									language === 'en'
										? 'Set Language to English'
										: 'Establecer el idioma al inglés'
								}
								aria-label={
									language === 'en'
										? 'Set Language to English'
										: 'Establecer el idioma al inglés'
								}
								onClick={() => setLanguage('en')}>
								EN
							</button>
							<span className="font-medium block sans--12 sans--14--lg mr-0.5">
								/
							</span>
							<button
								className={cx(
									'font-medium block p-0 uppercase sans--12 sans--14--lg',
									{
										fade: language !== 'es',
									},
								)}
								title={
									language === 'en'
										? 'Set Language to English'
										: 'Establecer el idioma a español'
								}
								aria-label={
									language === 'en'
										? 'Set Language to Spanish'
										: 'Establecer el idioma a español'
								}
								onClick={() => setLanguage('es')}>
								ES
							</button>
						</div>
					</div>
					<div className="hidden lg:block header__darkMode absolute right-0">
						<button
							title={
								language === 'en'
									? 'Toggle Dark Mode'
									: 'Activar/desactivar el modo oscuro'
							}
							aria-label={
								language === 'en'
									? 'Toggle Dark Mode'
									: 'Activar/desactivar el modo oscuro'
							}
							onClick={() => setDarkMode(!isDarkMode)}>
							<div
								className={cx('circle inline-block', {
									'bg-black': !isDarkMode,
									'bg-wheat': isDarkMode,
								})}
							/>
						</button>
					</div>
					<button
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className={cx('lg:hidden header__icon p-1 lg:p-0', {
							active: isMenuOpen,
						})}>
						<IconPlus />
					</button>
				</nav>
			</header>
			<MobileMenu
				isMenuOpen={isMenuOpen}
				setIsMenuOpen={setIsMenuOpen}
				isDarkMode={isDarkMode}
				setDarkMode={setDarkMode}
				language={language}
				setLanguage={setLanguage}
			/>
		</React.Fragment>
	);
};

export default Header;
