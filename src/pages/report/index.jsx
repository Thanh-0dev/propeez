import React from "react";
import Head from "next/head";
import prisma from "/lib/prisma";
import "react-datepicker/dist/react-datepicker.css";
import ReportForm from "@/components/Form/reportForm";
import Layout from "@/components/Layout/layout";

export default function Report({ categories }) {
  return (
    <>
      <Head>
        <title>Signaler un incident - Propeez</title>
      </Head>

      <Layout>
        <ReportForm
          formTitle={"Signaler un incident que vous avez constaté"}
          categories={categories}
        />
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const categories = await prisma.category.findMany();

  return {
    props: { categories },
  };
}
