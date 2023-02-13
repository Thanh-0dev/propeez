import Header from "../Header/header";

export default function Layout({ children }) {
  return (
    <>
      <Header/>
      <main>{children}</main>
      <footer></footer>
    </>
  );
}
