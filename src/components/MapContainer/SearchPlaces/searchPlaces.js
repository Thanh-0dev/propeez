import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import styles from "./searchPlaces.module.css";

export default function SearchPlaces({ address, setAddress, title=null }) {
  return (
    <div className={styles.search_places}>
      {title && <h3 className={styles.title}>Rechercher une position</h3>}
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        apiOptions={{ language: "fr", region: "fr" }}
        autocompletionRequest={{
          componentRestrictions: {
            country: "fr",
          },
        }}
        placeholder={"helloworld"}
        selectProps={{
          address,
          onChange: setAddress,
        }}
      />
    </div>
  );
}
