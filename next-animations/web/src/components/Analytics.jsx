import React, {Fragment} from 'react';
import Head from 'next/head';

// Global analytics fallback
export const track = (events = {}) => {
	if (typeof window === 'undefined') return;

	for (let event in events) {
		const dataLayer = window.dataLayer || [];
		dataLayer.push(events[event]);
	}
};

// log the pageview with their URL
export const pageView = url => {
	window.gtag &&
		window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
			page_path: url,
		});
};

const Analytics = () => (
	<Fragment>
		<Head>
			{/* Google Analytics */}
			<script
				async
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
			/>
			<script>{`
				window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());
				gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
					'linker': {
						'domains': [
							'www.buena-suerte.studio',
							'buena-suerte.studio'
						],
						'accept_incoming': true
					}
				});
			`}</script>
		</Head>
	</Fragment>
);

export default Analytics;
