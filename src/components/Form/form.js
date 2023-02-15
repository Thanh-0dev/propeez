import React, { useState } from 'react';
import styles from './form.module.css';

const PostIncidentForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // perform your API call or data submission here
    // you can use the form data as { title, description, address, startDate, endDate, type, image }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Titre:</label>
          <input type="text" id="title" value={title} onChange={(event) => setTitle(event.target.value)} required />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" value={description} onChange={(event) => setDescription(event.target.value)} required />
        </div>
        <div>
          <label htmlFor="address">Adresse:</label>
          <input type="text" id="address" value={address} onChange={(event) => setAddress(event.target.value)} required />
        </div>
        <div>
          <label htmlFor="startDate">Date de début:</label>
          <input type="date" id="startDate" value={startDate} onChange={(event) => setStartDate(event.target.value)} required />
        </div>
        <div>
          <label htmlFor="endDate">Date de fin:</label>
          <input type="date" id="endDate" value={endDate} onChange={(event) => setEndDate(event.target.value)} required />
        </div>
        <div>
          <label htmlFor="type">Type de l'incident:</label>
          <select id="type" value={type} onChange={(event) => setType(event.target.value)} required>
            <option value="">Selectionner</option>
            <option value="fire">Infrastructure</option>
            <option value="flood">Propreté</option>
            <option value="earthquake">Voirie</option>
            <option value="other">Véhicules</option>
          </select>
        </div>
        <div>
          <label htmlFor="image">Ajouter une photo:</label>
          <input type="file" id="image" accept="image/*" onChange={handleFileUpload} />
          {image && <p>{image.name}</p>}
        </div>
        <button type="submit">Publier</button>
      </form>
    </div>
  );
};

export default PostIncidentForm;
