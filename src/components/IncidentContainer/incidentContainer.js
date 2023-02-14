import IncidentList from "./IncidentList/incidentList";
import styles from "./incidentContainer.module.css";

export default function IncidentContainer({ data }) {
  const nIncident = data.length;
  return (
    <div className={styles.incident_container}>
      <h2 className={styles.title}>
        <span className={styles.num}>{nIncident}</span> incidents déclarés dans
        votre zone
      </h2>
      <IncidentList data={data} />
    </div>
  );
}
