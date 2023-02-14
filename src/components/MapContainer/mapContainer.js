import { useState, useMemo } from "react";
import InteractiveMap from "./InteractiveMap/map";
import IncidentContainer from "../IncidentContainer/incidentContainer";
import Pin from "./InteractiveMap/Pin/pin";
import { Marker } from "react-map-gl";
import styles from "./mapContainer.module.css";
import data from "./data.json";

export default function MapContainer() {
  const [incidentInfo, setIncidentInfo] = useState(null);

  const pins = useMemo(
    () =>
      data.map((incident, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={incident.longitude}
          latitude={incident.latitude}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setIncidentInfo(incident);
          }}
        >
          <Pin />
        </Marker>
      )),
    []
  );
  return (
    <div className={styles.map_container}>
      <IncidentContainer data={data} incidentInfo={incidentInfo} setIncidentInfo={setIncidentInfo}/>
      <InteractiveMap data={data} pins={pins} incidentInfo={incidentInfo} setIncidentInfo={setIncidentInfo} />
    </div>
  );
}
