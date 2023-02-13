import Head from "next/head";
import Layout from "@/components/Layout/layout";
import InteractiveMap from "@/components/Map/map";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Layout>
          <InteractiveMap/>
      </Layout>
    </>
  );
}
