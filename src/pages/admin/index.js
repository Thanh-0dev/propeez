import Navbar from '@/components/Admin/Nav/navbar';

export default function Home() {
	return <Navbar />;
}

export async function getServerSideProps(context) {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: '/login',
			},
		};
	}

	return {
		props: { session },
	};
}
