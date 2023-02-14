import Header from "../Header/header";
import styles from "./layout.module.css";

export default function Layout({ children }) {
  return (
    <>
      <Header/>
      <main className={styles.main}>{children}</main>
      <footer></footer>
    </>
  );
}
