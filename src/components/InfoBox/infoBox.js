import styles from "./infoBox.module.css";

export default function InfoBox({ children = "10 Rue Caulaincourt, 75018" }) {
  return (
    <div className={styles.info_box}>
      <span>{children}</span>
    </div>
  );
}
