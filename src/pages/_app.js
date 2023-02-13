import '@/styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
				<link href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css"  rel="stylesheet"/>
			</Head>
			<Component {...pageProps} />
		</>
	);
}
