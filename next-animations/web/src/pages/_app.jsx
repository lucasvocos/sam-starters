import '../styles/main.scss';

import React, {useState, useEffect} from 'react';
import FramerMotionConfig from '../components/FramerMotionConfig';
import Layout from '../layouts/Layout';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Analytics, {pageView} from '../components/Analytics';
import {useStore} from '../store/useStore';

import Router from 'next/router';
import {m as motion, AnimatePresence} from 'framer-motion';

const ROUTE_DURATION = 300;

const App = ({Component, pageProps, router}) => {
	const {asPath, pathname} = router;
	const {hydrate, isDarkMode} = useStore(s => ({
		hydrate: s.hydrate,
		isDarkMode: s.isDarkMode,
	}));

	const [isLoading, setLoading] = useState(false);

	const resetScroll = () => {
		window.scrollTo(0, 0);
	};

	// Setup Next router events
	useEffect(() => {
		Router.events.on('routeChangeStart', url => {
			// Bail if we're just changing a URL parameter
			if (
				url.indexOf('?') > -1 &&
				url.split('?')[0] === asPath.split('?')[0]
			)
				return;

			// Otherwise, start loading
			setLoading(true);
		});

		Router.events.on('routeChangeComplete', url => {
			setLoading(false);
			pageView(url);
		});

		Router.events.on('routeChangeError', () => {
			setLoading(false);
		});
	}, [Router]);

	// The scroll location on the page is not restored on history changes
	// TODO: https://github.com/vercel/next.js/issues/3303
	useEffect(() => {
		window.history.scrollRestoration = 'manual';
	}, [router]);

	useEffect(() => {
		hydrate();
	}, []);

	useEffect(() => {
		if (typeof window !== undefined && typeof document !== undefined) {
			const body = document.body;
			isDarkMode
				? body.classList.add('dark')
				: body.classList.remove('dark');
		}
	}, [isDarkMode]);

	const animatedRoutes = (
		<AnimatePresence exitBeforeEnter onExitComplete={resetScroll}>
			<motion.div
				className="site-container__inner"
				key={asPath}
				initial={{opacity: 0}}
				animate={{opacity: 1}}
				exit={{opacity: 0}}
				transition={{duration: ROUTE_DURATION / 1000}}>
				<Component {...pageProps} loading={isLoading} />
			</motion.div>
		</AnimatePresence>
	);

	const animatedLayout = (
		<AnimatePresence exitBeforeEnter onExitComplete={resetScroll}>
			<motion.main
				className="site-container"
				initial={{opacity: 0}}
				animate={{opacity: 1}}
				exit={{opacity: 0}}
				transition={{duration: ROUTE_DURATION / 1000}}>
				<Layout loading={isLoading}>{animatedRoutes}</Layout>
			</motion.main>
		</AnimatePresence>
	);

	const siteFragment = (
		<FramerMotionConfig>{animatedLayout}</FramerMotionConfig>
	);

	const analytics = <Analytics />;

	return (
		<React.Fragment>
			{analytics}
			<Header />
			{siteFragment}
			{pathname !== '/' && <Footer />}
		</React.Fragment>
	);
};

export default App;
