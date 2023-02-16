import styles from './navbar.module.css';
import ActiveLink from '@/components/Header/ActiveLink/activeLink';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Navbar() {
	const link = [
		{ name: 'Accueil', icon: '/images/home-icon.svg', link: '/admin' },
		{
			name: 'Tableau de bord',
			icon: '/images/dashboard-icon.svg',
			link: '#dashboard',
		},
	];

	return (
		<>
			<nav className={`${styles.sidebar}`}>
				<ul>
					<div className={styles.top}>
						<Link href="/">
							<Image
								src="/images/logo_white.svg"
								alt="logo de Propeez"
								width={160}
								height={80}
								className={styles.logo}
							/>
						</Link>
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
							<div onClick={() => signOut()} className={styles.logout}>
								<Image
									className={styles.image}
									src="/images/logout-icon.svg"
									alt="Logout icon"
									width={20}
									height={20}
								/>
								<p className={styles.white}>Déconnexion</p>
							</div>
						</li>
					</div>
				</ul>
			</nav>
		</>
	);
}
