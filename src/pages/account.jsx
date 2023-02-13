import React from 'react';
import { useSession, getSession } from 'next-auth/react';

export default function Account() {
	const { data: session } = useSession();

	if (session) {
		return (
			<div>
				<h1>Logged in</h1>
				<button onClick={() => signOut()}>Sign out</button>
			</div>
		);
	} else {
		return (
			<div>
				<h1>Not logged in</h1>
			</div>
		);
	}
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
