import Map, {
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";

export default function InteractiveMap({}) {
  return (
    <Map
      initialViewState={{
        longitude: 2,
        latitude: 47,
        zoom: 5,
        bearing: 0,
        pitch: 0,
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/light-v11"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
    >
      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />
    </Map>
  );
}
