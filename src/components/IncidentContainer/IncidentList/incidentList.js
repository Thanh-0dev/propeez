import IncidentItem from "./IncidentItem/incidentItem";
import styles from "./incidentList.module.css";

export default function IncidentList({ data, setIncidentInfo, setHoverInfo }) {
  return (
    <div className={styles.incident_list}>
      {data.map((item, key) => {
        return <IncidentItem item={item} key={key} setIncidentInfo={setIncidentInfo} setHoverInfo={setHoverInfo} />;
      })}
    </div>
  );
}
