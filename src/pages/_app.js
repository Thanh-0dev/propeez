import '@/styles/globals.css';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps, session }) {
	return (
		<SessionProvider session={session}>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Component {...pageProps} />
		</SessionProvider>
	);
}
