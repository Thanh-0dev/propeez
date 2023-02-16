import styles from './navbar.module.css';
import { useRouter } from 'next/router';
import ActiveLink from '@/components/Header/ActiveLink/activeLink';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

export default function Navbar() {
	const link = [
		{ name: 'Accueil', icon: './images/home-icon.svg', link: './admin' },
		{
			name: 'Tableau de bord',
			icon: './images/dashboard-icon.svg',
			link: './admin/dashboard',
		},
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
							<div onClick={() => signOut()} className={styles.logout}>
								<Image
									className={styles.image}
									src="./images/logout-icon.svg"
									alt="Logout icon"
									width={20}
									height={20}
								/>
								<p>Déconnexion</p>
							</div>
						</li>
					</div>
				</ul>
			</nav>
		</>
	);
}
