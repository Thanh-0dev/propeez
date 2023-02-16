import { getDataForm } from '/lib/formidable';
import prisma from '/lib/prisma';

export default async function handle(req, res) {
	const dataForm = await getDataForm(req);

	const result = await prisma.incident.update({
		where: {
			id: dataForm.fields.id,
		},
		data: {
			published: true,
		},
	});

	return res.json(result);
}
