import React, { useState } from 'react';
import GooglePlacesAutocomplete, {
	getLatLng,
	geocodeByAddress,
} from 'react-google-places-autocomplete';
import styles from './index.module.css';
import prisma from '/lib/prisma';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import fr from 'date-fns/locale/fr';
import Layout from '@/components/Layout/layout';

export default function Report({ categories }) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [address, setAddress] = useState({});
	const [startDate, setStartDate] = useState(
		new Date().toLocaleDateString('fr-FR')
	);
	const [endDate, setEndDate] = useState(null);
	const [category, setCategory] = useState(categories[0].id);

	const [imageUploaded, setImageUploaded] = useState();

	const handleChange = (event) => {
		setImageUploaded(event.target.files[0]);
	};

	const submitData = async (e) => {
		e.preventDefault();

		if (
			!imageUploaded ||
			!title ||
			!description ||
			!address ||
			!startDate ||
			!category
		) {
			return;
		}

		try {
			const { lat, lng } = await geocodeByAddress(address?.label)
				.then((results) => getLatLng(results[0]))
				.then(({ lat, lng }) => {
					return { lat, lng };
				});

			const incident = {
				title,
				description,
				address: address.label,
				city: address.value.terms[address.value.terms.length - 1].value,
				latitude: lat,
				longitude: lng,
				startDate,
				endDate,
				categoryId: category,
				published: false,
			};

			const formData = new FormData();
			formData.append('image', imageUploaded);
			formData.append('incident', JSON.stringify(incident));

			await fetch('/api/postUserIncident', {
				method: 'POST',
				body: formData,
			});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Layout>
			<form onSubmit={submitData} className={styles.page}>
				<h1>Upload Image</h1>
				<input
					type="text"
					name="title"
					placeholder="Title"
					onChange={(e) => setTitle(e.target.value)}
				/>
				<textarea
					type="text"
					name="description"
					placeholder="Description"
					onChange={(e) => setDescription(e.target.value)}
				/>
				<GooglePlacesAutocomplete
					apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
					apiOptions={{ language: 'fr', region: 'fr' }}
					autocompletionRequest={{
						componentRestrictions: {
							country: 'fr',
						},
					}}
					selectProps={{
						address,
						onChange: setAddress,
					}}
				/>
				<DatePicker
					onChange={(date) => {
						const d = new Date(date).toLocaleDateString('fr-FR');
						setStartDate(d);
					}}
					selected={
						new Date(
							startDate.split('/')[1] +
								' ' +
								startDate.split('/')[0] +
								' ' +
								startDate.split('/')[2]
						)
					}
					startDate={
						new Date(
							startDate.split('/')[1] +
								' ' +
								startDate.split('/')[0] +
								' ' +
								startDate.split('/')[2]
						)
					}
					endDate={
						endDate &&
						new Date(
							endDate?.split('/')[1] +
								' ' +
								endDate?.split('/')[0] +
								' ' +
								endDate?.split('/')[2]
						)
					}
					minDate={new Date()}
					locale={fr}
					dateFormat="dd/MM/yyyy"
				/>
				<DatePicker
					onChange={(date) => {
						const d = new Date(date).toLocaleDateString('fr-FR');
						setEndDate(d);
					}}
					selected={
						endDate &&
						new Date(
							endDate?.split('/')[1] +
								' ' +
								endDate?.split('/')[0] +
								' ' +
								endDate?.split('/')[2]
						)
					}
					startDate={
						new Date(
							startDate.split('/')[1] +
								' ' +
								startDate.split('/')[0] +
								' ' +
								startDate.split('/')[2]
						)
					}
					endDate={
						endDate &&
						new Date(
							endDate?.split('/')[1] +
								' ' +
								endDate?.split('/')[0] +
								' ' +
								endDate?.split('/')[2]
						)
					}
					minDate={
						new Date(
							startDate.split('/')[1] +
								' ' +
								startDate.split('/')[0] +
								' ' +
								startDate.split('/')[2]
						)
					}
					locale={fr}
					dateFormat="dd/MM/yyyy"
				/>
				<select onChange={(e) => setCategory(e.target.value)}>
					{categories.map((e, i) => (
						<option key={i} value={e.id}>
							{e.type}
						</option>
					))}
				</select>
				<input
					onChange={handleChange}
					accept=".jpg, .png, .jpeg"
					type="file"
				></input>

				<input type="submit" value="Upload" />
			</form>
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const categories = await prisma.category.findMany();

	return {
		props: { categories },
	};
}
