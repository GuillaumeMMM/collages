import { Cormorant } from 'next/font/google';
import styles from './title.module.css';

const cormorant = Cormorant({ weight: "700", subsets: ['latin'] });

export default function Title({ children }) {
    return <h1 className={`${cormorant.className} ${styles.title}`}>{children}</h1>;
}