import { useState, useEffect, useRef } from "react";
import Map, {
  Marker,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";

export default function InteractiveMap({
  pins,
  viewport,
}) {
  const mapRef = useRef();

  useEffect(() => {
    if(mapRef.current != undefined){
      mapRef.current.flyTo({
        center: [viewport.longitude, viewport.latitude],
        pitch: 0,
        bearing: 0,
        duration: 4000,
      });
    }
  }, [viewport]);

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: viewport.longitude,
        latitude: viewport.latitude,
        maxZoom: 12,
        bearing: 0,
        pitch: 0,
        zoom: 12,
        maxZoom: 16,
        bearing: 0,
        pitch: 0,
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
