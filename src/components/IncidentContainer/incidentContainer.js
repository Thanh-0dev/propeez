import IncidentList from "./IncidentList/incidentList";
import styles from "./incidentContainer.module.css";
import Image from "next/image";

export default function IncidentContainer({
  data,
  incidentInfo,
  setIncidentInfo,
  setHoverInfo,
}) {
  const nIncident = data.length;

  return (
    <div className={styles.incident_container}>
      {incidentInfo ? (
        <>
          <button
            className={styles.close_button}
            onClick={() => {
              setIncidentInfo(null);
              setHoverInfo(null);
            }}
          >
            X
          </button>
          <h2 className={styles.title}>{incidentInfo.title}</h2>
          <Image
            src="/default.jpg"
            alt={incidentInfo.title}
            className={styles.image}
            width={500}
            height={120}
          />
          <p className={styles.item}>
            <strong>Lieu</strong> : {incidentInfo.address}
          </p>
          <p className={styles.item}>
            <strong>Description</strong> : {incidentInfo.description}
          </p>
          <p className={styles.item}>
            Du <strong>{incidentInfo.startDate}</strong> au{" "}
            <strong>{incidentInfo.endDate}</strong>
          </p>
        </>
      ) : (
        <>
          <h2 className={styles.title}>
            <span className={styles.num}>{nIncident}</span> incidents déclarés
            dans votre zone
          </h2>
          <IncidentList
            data={data}
            setIncidentInfo={setIncidentInfo}
            setHoverInfo={setHoverInfo}
          />
        </>
      )}
    </div>
  );
}
