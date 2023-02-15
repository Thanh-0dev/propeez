import { useState, useMemo } from "react";
import Map, {
  Marker,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";

export default function InteractiveMap({ pins }) {
  const [viewport, setViewport] = useState({
    longitude: 2.33071,
    latitude: 48.8752551,
    zoom: 12,
  });

  const initViewport = {
    longitude: viewport.longitude,
    latitude: viewport.latitude,
    zoom: viewport.zoom,
    maxZoom: 12,
    bearing: 0,
    pitch: 0,
    scrollZoom: false,
    dragPan: false,
  };

  return (
    <Map
      initialViewState={initViewport}
      style={{ width: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
    >
      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />

      {pins}
    </Map>
  );
}
