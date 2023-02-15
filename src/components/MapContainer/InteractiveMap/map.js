import { useState, useEffect } from "react";
import Map, {
  Marker,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";

export default function InteractiveMap({ pins, viewport }) {
  return (
    <Map
      initialViewState={{
        longitude: viewport.longitude,
        latitude: viewport.latitude,
        maxZoom: 12,
        bearing: 0,
        pitch: 0,
        scrollZoom: false,
        dragPan: false,
        zoom: 12,
        maxZoom: 12,
        bearing: 0,
        pitch: 0,
        scrollZoom: false,
        dragPan: false,
      }}
      style={{ width: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
    >
      <GeolocateControl
        position="top-left"
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
      />
      <FullscreenControl position="top-left" />

      {pins}
    </Map>
  );
}
