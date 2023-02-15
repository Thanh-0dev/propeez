import React, { useState } from 'react';
import Router from 'next/router';

export default function UploadImage() {
	const [imageUploaded, setImageUploaded] = useState();

	const handleChange = (event) => {
		setImageUploaded(event.target.files[0]);
	};

	const submitData = async (e) => {
		e.preventDefault();

		if (!imageUploaded) {
			return;
		}

		try {
			const formData = new FormData();
			formData.append('image', imageUploaded);

			await fetch('/api/postImage', {
				method: 'POST',
				body: formData,
			});

			/* Router.push('/'); */
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="page">
			<form onSubmit={submitData}>
				<h1>Upload Image</h1>

				<input
					onChange={handleChange}
					accept=".jpg, .png, .jpeg"
					type="file"
				></input>

				<input type="submit" value="Upload" />
			</form>
		</div>
	);
}
