import Head from 'next/head';
import Layout from '@/components/Layout/layout';
import MapContainer from '@/components/MapContainer/mapContainer';

export default function Home() {
	return (
		<>
			<Head>
				<title>Home</title>
			</Head>
			<Layout>
				<MapContainer />
			</Layout>
		</>
	);
}
