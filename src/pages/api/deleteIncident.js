import { getDataForm } from '/lib/formidable';
import prisma from '/lib/prisma';

export default async function handle(req, res) {
	const dataForm = await getDataForm(req);

	const result = await prisma.incident.delete({
		where: {
			id: dataForm.fields.id,
		},
	});

	return res.json(result);
}
