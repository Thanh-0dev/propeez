import { useState } from "react";
import { getLatLng, geocodeByAddress } from "react-google-places-autocomplete";
import styles from "./reportForm.module.css";
import FormFields from "./formFields";

export default function ReportForm({ formTitle, categories }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState({});
  const [startDate, setStartDate] = useState(
    new Date().toLocaleDateString("fr-FR")
  );
  const [endDate, setEndDate] = useState(null);
  const [category, setCategory] = useState(categories[0].id);

  const [imageUploaded, setImageUploaded] = useState();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    setImageUploaded(event.target.files[0]);
  };

  const submitData = async (e) => {
    setSuccess(false);
    setError(false);

    e.preventDefault();

    if (
      !imageUploaded ||
      !title ||
      !description ||
      !address ||
      !startDate ||
      !category
    ) {
      setError("Erreur. Veuillez remplir tout les champs du formulaire");
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
      formData.append("image", imageUploaded);
      formData.append("incident", JSON.stringify(incident));

      setLoading(true);
      setLoading("Envoie de la demande en cours...");
      await fetch("/api/postUserIncident", {
        method: "POST",
        body: formData,
      }).then((response) => {
        if (response.ok) {
          setLoading(false);
          setSuccess(true);
        }
      });
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  return (
    <div className={styles.form_container}>
      <h1 className={styles.form_title}>{formTitle}</h1>
      <form onSubmit={submitData} className={styles.report_form}>
        <FormFields
          setTitle={setTitle}
          setDescription={setDescription}
          address={address}
          setAddress={setAddress}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          setCategory={setCategory}
          categories={categories}
          handleChange={handleChange}
        />
        <input className={styles.send_button} type="submit" value="Envoyer" />
      </form>
      <div className={styles.submit_info}>
        {error ? (
          <span className={styles.error}>Erreur, veuillez remplir tout les champs.</span>
        ) : success ? (
          <span className={styles.success}>
            Votre signalement d&apos;incident a bien été envoyé. Merci !
          </span>
        ) : null}
        {loading && <div className={styles.loader}></div>}
      </div>
    </div>
  );
}
