import prisma from '/lib/prisma';

export default async function handle(req, res) {
	const { latitude, longitude, category } = req.body;
	const radius = 10;

	const query =
		await prisma.$queryRaw`SELECT id FROM "Incident" WHERE ST_DWithin(ST_MakePoint(longitude, latitude), ST_MakePoint(${longitude}, ${latitude})::geography, ${radius} * 1000)`;
	const incidents = await prisma.incident.findMany({
		where: {
			id: {
				in: query.map(({ id }) => id),
			},
			published: true,
			...(category ? { category: { type: category } } : {}),
		},
		include: {
			image: true,
			category: true,
		},
	});

	res.json(incidents);
}
