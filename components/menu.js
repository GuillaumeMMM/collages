import Link from 'next/link';
import styles from './menu.module.scss';
import Title from './title';

export default function Menu(props) {
    
    return <div className={styles.menu}>
        <Link href='/' className='main-title'>
            <Title>Michelle Versillé</Title>
        </Link>
        <ul>
            <li className={props.page === 'collages' ? styles.active : ''}>
                <Link href="/collages">Collages</Link>
            </li>
            <li className={props.page === 'about' ? styles.active : ''}>
                <Link href="/about">About</Link>
            </li>
            <li className={props.page === 'contact' ? styles.active : ''}>
                <Link href="/contact">Contact</Link>
            </li>
        </ul>
    </div>
}