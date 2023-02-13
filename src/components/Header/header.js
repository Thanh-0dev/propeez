import Image from "next/image";
import ActiveLink from "./ActiveLink/activeLink";
import styles from "./header.module.css";

export default function Header() {
  const link = [
    { name: "consulter", link: "/" },
    { name: "signaler un incident", link: "/signal" },
  ];
  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <Image
          src="./logo.svg"
          alt="logo de Propeez"
          width={120}
          height={120}
        />
        <nav className={styles.navbar}>
          <ul>
            {link.map((item, id) => {
              return (
                <li key={id}>
                  <ActiveLink activeClassName={styles.active} href={item.link}>
                    {item.name}
                  </ActiveLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
