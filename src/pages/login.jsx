import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Login() {
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
				<button onClick={() => signIn()}>Sign in</button>
			</div>
		);
	}
}
