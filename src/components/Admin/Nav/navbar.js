import styles from "./navbar.module.css";
import { useRouter } from 'next/router';
import ActiveLink from "@/components/Header/ActiveLink/activeLink";
import Image from "next/image";
import Link from "next/link"

export default function Navbar() {
  const link = [
    { name: "Accueil", icon: './images/home-icon.svg', link: "./admin" },
    { name: "Tableau de bord", icon: './images/dashboard-icon.svg', link: "./admin/dashboard" },
  ];

  return (
    <>
      <nav className={`${styles.sidebar}`}>
        <ul>
          <div className={styles.top}>
            {link.map((item, id) => {
              return (
                <li key={id} className={item.class}>
                  <ActiveLink activeClassName={styles.active} href={item.link}>
                    <Image
                      className={styles.image}
                      src={item.icon}
                      alt={item.name}
                      width={20}
                      height={20}
                    />
                    {item.name}
                  </ActiveLink>
                </li>
              );
            })}
          </div>
          <div className={styles.bottom}>
            <li>
              <Link href="/logout" className={styles.logout}>
                <Image
                  className={styles.image}
                  src="./images/logout-icon.svg"
                  alt="Logout icon"
                  width={20}
                  height={20}
                />
                Log out
              </Link>
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
}