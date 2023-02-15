import React from 'react';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';

export default function Account() {
	const { data: session } = useSession();

	if (session) {
		return (
			<div>
				<h1>Logged in</h1>
				<button onClick={() => signOut()}>Sign out</button>
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
