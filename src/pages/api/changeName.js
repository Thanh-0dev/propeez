import { getSession } from 'next-auth/react';
import prisma from '/lib/prisma';

export default async function handle(req, res) {
	const { firstName, lastName } = req.body;

	const session = await getSession({ req });
	const user = await prisma.user.update({
		data: {
			firstName: firstName,
			lastName: lastName,
		},
		where: {
			id: session.user.userId,
		},
	});
	res.json(user);
}
