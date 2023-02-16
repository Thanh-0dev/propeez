import { useRef } from "react";
import IncidentList from "./IncidentList/incidentList";
import IncidentInfo from "./IncidentList/IncidentInfo/incidentInfo";
import styles from "./incidentContainer.module.css";

export const XmarkIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      style={{ width: "15px" }}
    >
      <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
    </svg>
  );
};

export default function IncidentContainer({
  data,
  incidentInfo,
  setIncidentInfo,
  setHoverInfo,
}) {
  const nIncident = data.length;
  const incidentContainerRef = useRef(null);

  return (
    <div className={styles.incident_container} ref={incidentContainerRef}>
      {incidentInfo ? (
        <IncidentInfo
          incidentInfo={incidentInfo}
          setIncidentInfo={setIncidentInfo}
          setHoverInfo={setHoverInfo}
        />
      ) : (
        <>
          <h2 className={styles.title}>
            <span className={styles.num}>{nIncident}</span> incident{nIncident > 0 && 's'} déclaré{nIncident > 0 && 's'} dans 
            votre zone
          </h2>
          <IncidentList
            data={data}
            setIncidentInfo={setIncidentInfo}
            setHoverInfo={setHoverInfo}
            incidentContainerRef={incidentContainerRef}
          />
        </>
      )}
    </div>
  );
}
