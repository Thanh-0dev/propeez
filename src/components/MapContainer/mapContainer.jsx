import { useState, useMemo, useEffect } from 'react';
import InteractiveMap from './InteractiveMap/map';
import IncidentContainer from '../IncidentContainer/incidentContainer';
import Pin from './InteractiveMap/Pin/pin';
import LocationPermission from './LocationPermission/locationPermission';
import { Marker } from 'react-map-gl';
import { getLatLng, geocodeByAddress } from 'react-google-places-autocomplete';
import styles from './mapContainer.module.css';
import SearchPlaces from './SearchPlaces/searchPlaces';

export default function MapContainer() {
	const [incidentInfo, setIncidentInfo] = useState(null);
	const [hoverInfo, setHoverInfo] = useState(null);
	const [address, setAddress] = useState(null);
	const [viewport, setViewport] = useState(null);

	const [data, setData] = useState([]);

	const latLngData = async () => {
		try {
			await geocodeByAddress(address?.label)
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

	const fetchData = async () => {
		try {
			const response = await fetch('/api/getIncidents', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					latitude: viewport.latitude,
					longitude: viewport.longitude,
				}),
			});
			const data = await response.json();
			console.log(data);
			setData(data);
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
	}, []);

	useEffect(() => {
		if (!address) return;

		latLngData();
	}, [address]);

	useEffect(() => {
		if (!viewport) return;

		fetchData();
	}, [viewport]);

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
		[hoverInfo, data]
	);

	if (viewport) {
		return (
			<>
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
						setAddress={setAddress}
						latLngData={latLngData}
					/>
				</div>
			</>
		);
	}
	return <LocationPermission address={address} setAddress={setAddress} />;
}
