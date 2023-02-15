import styles from "./incidentItem.module.css";

export default function IncidentItem({
  item,
  id,
  setIncidentInfo,
  setHoverInfo,
}) {
  return (
    <div
      key={id}
      className={styles.incident_item}
      onClick={() => setIncidentInfo(item)}
      onMouseOver={() => setHoverInfo(item)}
      onMouseLeave={() => setHoverInfo(null)}
    >
      <h3 className={styles.title}>{item.title}</h3>
      <p>
        Du {item.startDate} au {item.endDate}
      </p>
      <p>Lieu : {item.address}</p>
    </div>
  );
}
