import { useState, useMemo } from "react";
import Map, {
  Marker,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import Pin from "./Pin/pin";
import data from "./data.json";
import PopupBox from "./PopupBox/popupBox";

export default function InteractiveMap({}) {
  const [viewport, setViewport] = useState({
    longitude: 2,
    latitude: 47,
    zoom: 5,
  });

  const [popupInfo, setPopupInfo] = useState(null);

  const initViewport = {
    longitude: viewport.longitude,
    latitude: viewport.latitude,
    zoom: viewport.zoom,
    minZoom: 5,
    maxZoom: 20,
    bearing: 0,
    pitch: 0,
  };

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
            setPopupInfo(incident);
          }}
        >
          <Pin />
        </Marker>
      )),
    []
  );

  return (
    <Map
      initialViewState={initViewport}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
    >
      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />

      {pins}

      {popupInfo && (
        <PopupBox setPopupInfo={setPopupInfo} popupInfo={popupInfo}/>
      )}
    </Map>
  );
}
