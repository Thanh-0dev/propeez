import Header from "../Header/header";
import Footer from "../Footer/footer";
import styles from "./layout.module.css";

export default function Layout({ children }) {
  return (
    <>
      <Header/>
      <main className={styles.main}>{children}</main>
      <Footer/>
    </>
  );
}
