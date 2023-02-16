import Navbar from '@/components/Admin/Nav/navbar';
import { getSession, useSession } from 'next-auth/react';

export default function Home() {
	return (
		<>
			<Navbar />
		</>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);

	if (!session || !(session?.user.role === 'ADMIN')) {
		return {
			redirect: {
				destination: '/api/auth/signin',
				permanent: false,
			},
		};
	}

	return {
		props: { session },
	};
}
