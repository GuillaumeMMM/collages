import Link from 'next/link';
import styles from './menu.module.scss';
import { Cormorant } from 'next/font/google';
const cormorant = Cormorant({ weight: "700", subsets: ['latin'] });

export default function Menu({ active }) {
    return <div className={styles.menu}>
        <div className={styles.header}>
            <h1 className={cormorant.className}>
                <Link href="/">MICHELLE VERSILLÉ</Link>
            </h1>
            <nav>
                <ul>
                    <li className={active === 'collages' ? styles['active-link'] : ''}><Link href="/collages">Collages</Link></li>
                    <li className={active === 'about' ? styles['active-link'] : ''}><Link href="/about">About</Link></li>
                    <li className={active === 'contact' ? styles['active-link'] : ''}><Link href="/contact">Contact</Link></li>
                </ul>
            </nav>
        </div>
    </div>
}