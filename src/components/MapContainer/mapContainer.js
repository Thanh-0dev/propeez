import { useState, useMemo, useEffect } from "react";
import InteractiveMap from "./InteractiveMap/map";
import IncidentContainer from "../IncidentContainer/incidentContainer";
import Pin from "./InteractiveMap/Pin/pin";
import LocationPermission from "./LocationPermission/LocationPermission";
import { Marker } from "react-map-gl";
import GooglePlacesAutocomplete, {
  getLatLng,
  geocodeByAddress,
} from "react-google-places-autocomplete";
import styles from "./mapContainer.module.css";
import data from "./data.json";

export default function MapContainer() {
  const [incidentInfo, setIncidentInfo] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [address, setAddress] = useState(null);
  const [viewport, setViewport] = useState(null);

  const latLngData = async () => {
    try {
      const { lat, lng } = await geocodeByAddress(address?.label)
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          setViewport({
            latitude: lat,
            longitude: lng,
          });
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setViewport({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
    address && latLngData();
  }, [address]);

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
            setHoverInfo(incident);
          }}
        >
          <Pin active={incident === hoverInfo} />
        </Marker>
      )),
    [hoverInfo]
  );

  if (viewport) {
    return (
      <>
        <GooglePlacesAutocomplete
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
          apiOptions={{ language: "fr", region: "fr" }}
          autocompletionRequest={{
            componentRestrictions: {
              country: "fr",
            },
          }}
          selectProps={{
            address,
            onChange: setAddress,
          }}
        />
        <div className={styles.map_container}>
          <IncidentContainer
            data={data}
            incidentInfo={incidentInfo}
            setIncidentInfo={setIncidentInfo}
            setHoverInfo={setHoverInfo}
          />
          <InteractiveMap
            data={data}
            viewport={viewport}
            pins={pins}
            address={address}
            latLngData={latLngData}
          />
        </div>
      </>
    );
  }
  return (
    <>
      <h1>Activer votre géolocalisation ou entrer une position</h1>
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        apiOptions={{ language: "fr", region: "fr" }}
        autocompletionRequest={{
          componentRestrictions: {
            country: "fr",
          },
        }}
        selectProps={{
          address,
          onChange: setAddress,
        }}
      />
    </>
  );
}
