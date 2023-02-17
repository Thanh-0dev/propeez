import prisma from '/lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handle(req, res) {
	const { id } = req.body;

	const session = await getSession({ req });

	const result = await prisma.incident.update({
		where: {
			id,
		},
		data: {
			published: true,
		},
	});

	return res.json(result);
}
