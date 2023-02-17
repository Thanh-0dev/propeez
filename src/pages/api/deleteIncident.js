import prisma from '/lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handle(req, res) {
	const { id } = req.body;

	const session = await getSession({ req });
	const result = await prisma.incident.delete({
		where: {
			id,
		},
	});

	return res.json(result);
}
