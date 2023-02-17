import styles from "./footer.module.css";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_container}>
        <Image
          src="/images/logo_white.svg"
          alt="logo de Propeez"
          width={120}
          height={120}
        />
        
        <div className={styles.info}>
        <div className={styles.about}>
            <h4 className={styles.title}>About</h4>
            <ul>
              <li>Cookies</li>
              <li>Mentions légales</li>
            </ul>
          </div>
          <div className={styles.contact}>
            <h4 className={styles.title}>Contact</h4>
            <ul>
              <li>+33 (0)1 22 33 44 55</li>
              <li>contact@propeez.fr</li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}
