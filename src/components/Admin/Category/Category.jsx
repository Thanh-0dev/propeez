import styles from './Category.module.css';

export default function Category({ category }) {
	return (
		<div className={styles.category} style={{ background: category.color }}>
			<p>{category.type}</p>
		</div>
	);
}
