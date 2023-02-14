import InteractiveMap from "../Map/map";
import IncidentContainer from "../IncidentContainer/incidentContainer";
import styles from "./mapContainer.module.css";
import data from "./data.json";

export default function MapContainer() {
  return (
    <div className={styles.map_container}>
      <IncidentContainer data={data}/>
      <InteractiveMap data={data} />
    </div>
  );
}
