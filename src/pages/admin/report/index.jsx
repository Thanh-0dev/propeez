import React from 'react';
import Head from 'next/head';
import prisma from '/lib/prisma';
import ReportForm from '@/components/Form/reportForm';
import Navbar from '@/components/Admin/Nav/navbar';
import { getSession } from 'next-auth/react';
import styles from './index.module.css';

export default function Report({ categories }) {
	return (
		<>
			<Head>
				<title>Signaler un incident - Propeez</title>
			</Head>
			<div className={styles.layout}>
				<Navbar />
				<div style={{ width: '320px' }}></div>
				<div className={styles.form}>
					<ReportForm
						formTitle={'Signaler un incident'}
						categories={categories}
						api={'/api/postIncident'}
					/>
				</div>
			</div>
		</>
	);
}

export async function getServerSideProps({ req }) {
	const categories = await prisma.category.findMany();

	const session = await getSession({ req });

	if (!session || !(session?.user.role === 'ADMIN')) {
		return {
			redirect: {
				destination: '/api/auth/signin',
				permanent: false,
			},
		};
	}

	return {
		props: { categories },
	};
}
