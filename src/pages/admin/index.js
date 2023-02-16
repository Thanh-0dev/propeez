import Navbar from '@/components/Admin/Nav/navbar';
import IncidentCard from '@/components/Admin/IncidentCard/IncidentCard';
import { getSession } from 'next-auth/react';
import styles from './index.module.css';
import { Splide, SplideTrack } from '@splidejs/react-splide';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Admin({ incidents }) {
	const [filter, setFilter] = useState('all');
	const [filteredIncidents, setFilteredIncidents] = useState(incidents);
	const [selectedIncident, setSelectedIncident] = useState({});

	useEffect(() => {
		if (filter === 'all') {
			setFilteredIncidents(incidents);
		} else if (filter === 'pending') {
			setFilteredIncidents(incidents.filter((incident) => !incident.published));
		} else if (filter === 'published') {
			setFilteredIncidents(incidents.filter((incident) => incident.published));
		}
	}, [filter]);

	return (
		<div className={styles.layout}>
			<Navbar />
			<div className={styles.content}>
				<div className={styles.header}>
					<div className={styles.type}>
						<p
							className={filter === 'all' ? styles.active : null}
							onClick={() => setFilter('all')}
						>
							Tout ({incidents.length})
						</p>
						<p
							className={filter === 'pending' ? styles.active : null}
							onClick={() => setFilter('pending')}
						>
							En attente (
							{incidents.filter((incident) => !incident.published).length})
						</p>
						<p
							className={filter === 'published' ? styles.active : null}
							onClick={() => setFilter('published')}
						>
							Publié (
							{incidents.filter((incident) => incident.published).length})
						</p>
					</div>
					<Link href="/admin/report">
						<div className={styles.button}>
							<p>Déclarer un incident</p>
						</div>
					</Link>
				</div>
				<div className={styles.row}>
					<Splide
						className={styles.slider}
						hasTrack={false}
						options={{
							type: 'slide',
							gap: '20px',
							perMove: 2,
							speed: 1000,
							height: '100%',
							autoHeight: true,
							wheel: true,
							releaseWheel: true,
							pagination: false,
							direction: 'ttb',
							arrows: false,
						}}
					>
						<SplideTrack className={styles.track}>
							{filteredIncidents.map((incident, i) => (
								<IncidentCard
									incident={incident}
									selectedIncident={selectedIncident}
									key={i}
									onClick={() => setSelectedIncident(incident)}
								/>
							))}
						</SplideTrack>
					</Splide>
					<div className={styles.incident}></div>
				</div>
			</div>
		</div>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);

	const incidents = await prisma.incident.findMany({
		include: {
			image: true,
			category: true,
		},
	});

	if (!session || !(session?.user.role === 'ADMIN')) {
		return {
			redirect: {
				destination: '/api/auth/signin',
				permanent: false,
			},
		};
	}

	return {
		props: { incidents },
	};
}
