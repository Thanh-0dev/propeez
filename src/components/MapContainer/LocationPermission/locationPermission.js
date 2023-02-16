import SearchPlaces from "../SearchPlaces/searchPlaces";
import styles from "./locationPermission.module.css";

export default function LocationPermission({address, setAddress}) {
  const permisisonMessage = `Activer votre localisation ou rechercher une position pour utiliser Propeez`;
  return (
    <div className={styles.location_permission}>
      <h2 className={styles.permission_message}>{permisisonMessage}</h2>
      <SearchPlaces address={address} setAddress={setAddress} />
    </div>
  );
}
