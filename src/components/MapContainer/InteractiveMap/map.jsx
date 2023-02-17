import { useEffect, useRef } from 'react';
import Map, { FullscreenControl } from 'react-map-gl';
import SearchPlaces from '../SearchPlaces/searchPlaces';

export default function InteractiveMap({
	pins,
	viewport,
	address,
	setAddress,
	disableSearch = false,
}) {
	const mapRef = useRef();

	useEffect(() => {
		if (mapRef.current != undefined) {
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
				bearing: 0,
				boxZoom: false,
				dragPan: false,
				dragRotate: false,
			}}
			style={{ width: '100%' }}
			mapStyle="mapbox://styles/mapbox/streets-v12"
			mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
		>
			{!disableSearch ? (
				<>
					<FullscreenControl position="top-left" />

					<SearchPlaces
						address={address}
						setAddress={setAddress}
						mapPosition={true}
					/>
				</>
			) : null}
			{pins}
		</Map>
	);
}
