import styles from "./incidentItem.module.css";
import InfoBox from "@/components/InfoBox/infoBox";

export default function IncidentItem({
  item,
  id,
  setIncidentInfo,
  setHoverInfo,
  incidentContainerRef,
}) {
  return (
    <div
      key={id}
      className={styles.incident_item}
      onClick={() => {
        incidentContainerRef.current.scrollTop = 0;
        setIncidentInfo(item);
      }}
      onMouseOver={() => setHoverInfo(item)}
      onMouseLeave={() => setHoverInfo(null)}
    >
      <h3 className={styles.title}>{item.title}</h3>
      <p>
        {item.startDate} - {item.endDate}
      </p>
      <InfoBox>{item.address}</InfoBox>
    </div>
  );
}
