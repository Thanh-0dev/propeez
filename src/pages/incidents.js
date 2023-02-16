import React from 'react';
import prisma from '/lib/prisma';

export default function Test({ incidents }) {
	console.log(incidents);
	return (
		<div>
			{incidents.map((data, i) => (
				<>
					<h1 key={'title' + i}>{data.title}</h1>
					<p key={'desc' + i}>{data.description}</p>
					<img
						src={`https://res.cloudinary.com/${process.env.CLOUD_NAME}/v${data.image.version}/${data.image.publicId}.${data.image.format}`}
						key={data.image.publicId}
					/>
				</>
			))}
		</div>
	);
}

export async function getServerSideProps(context) {
	let category;
	let radius = 10000;
	let latitude = 51.5074;
	let longitude = 0.1278;

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

	return {
		props: { incidents },
	};
}
