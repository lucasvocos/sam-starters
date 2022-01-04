import create from 'zustand';
// import isBrowser from '../utils/isBrowser';
import {isBrowser} from 'buena-suerte';
import cookie from 'js-cookie';
import {mountStoreDevtool} from 'simple-zustand-devtools';

export const getInitialState = () => ({
	// UI
	isDarkMode: true,
	language: 'en',
});

export const hydrate = set => () => {
	const darkModeCookie = cookie.get('estudio_darkmode');
	const languageCookie = cookie.get('estudio_language');

	if (darkModeCookie) set({isDarkMode: darkModeCookie == 'true'});
	if (languageCookie) set({language: languageCookie});
};

export const setDarkMode = (set, get) => () => {
	const {isDarkMode} = get();
	cookie.set('estudio_darkmode', !isDarkMode, {expires: 365});
	set({isDarkMode: !isDarkMode});
};

export const setLanguage = set => language => {
	cookie.set('estudio_language', language, {expires: 365});
	set({language});
};

export const useStore = create((...args) => ({
	// State
	...getInitialState(...args),

	// Actions
	hydrate: hydrate(...args),
	setDarkMode: setDarkMode(...args),
	setLanguage: setLanguage(...args),
}));

if (isBrowser && process.env.NODE_ENV === 'development') {
	mountStoreDevtool('Estudio Buena Suerte', useStore);
}
