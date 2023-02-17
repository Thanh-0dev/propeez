import Category from '@/components/Admin/Category/Category';
import styles from './incidentItem.module.css';

export default function IncidentItem({
	item,
	id,
	setIncidentInfo,
	setHoverInfo,
	incidentContainerRef,
}) {
	return (
		<div
			key={id}
			className={styles.incident_item}
			onClick={() => {
				incidentContainerRef.current.scrollTop = 0;
				setIncidentInfo(item);
			}}
			onMouseOver={() => setHoverInfo(item)}
			onMouseLeave={() => setHoverInfo(null)}
		>
			<h3 className={styles.title}>{item.title}</h3>
			{!item.endDate || item.startDate === item.endDate ? (
				<p className={styles.item}>Date : {item.startDate}</p>
			) : (
				<p className={styles.item}>
					Date : {item.startDate} - {item.endDate}
				</p>
			)}
			<p className={styles.item}>Lieu : {item.address}</p>
			<Category category={item.category} />
		</div>
	);
}
