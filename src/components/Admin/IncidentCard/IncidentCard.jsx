import styles from './IncidentCard.module.css';
import { SplideSlide } from '@splidejs/react-splide';
import Category from '../Category/Category';

export default function IncidentCard({ incident, selectedIncident, onClick }) {
	console.log(incident === selectedIncident);
	return (
		<SplideSlide>
			<div
				className={selectedIncident === incident ? styles.active : styles.card}
				onClick={onClick}
			>
				<p className={styles.title}>{incident.title}</p>
				<p>
					{incident.endDate || incident.startDate !== incident.endDate
						? `Du ${incident.startDate} au ${incident.endDate}`
						: `Depuis le ${incident.startDate}`}
				</p>
				<p>Lieu : {incident.address}</p>
				<Category category={incident.category} />
			</div>
		</SplideSlide>
	);
}
