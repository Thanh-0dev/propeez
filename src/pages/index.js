import Head from 'next/head';
import Layout from '@/components/Layout/layout';
import MapContainer from '@/components/MapContainer/mapContainer';

export default function Home() {
	return (
		<>
			<Head>
				<title>Home</title>
				<link
					href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css"
					rel="stylesheet"
				/>
			</Head>
			<Layout>
				<MapContainer />
			</Layout>
		</>
	);
}
