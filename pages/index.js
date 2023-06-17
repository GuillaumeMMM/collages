import { Cormorant } from 'next/font/google';
import styles from '../styles/index.module.scss';
const cormorant = Cormorant({ weight: "700", subsets: ['latin'] });

import Link from 'next/link';
import Caroussel from '../components/caroussel';
import { google } from 'googleapis';

export async function getServerSideProps({ query }) {

  const auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })

  const sheet = google.sheets({ version: 'v4', auth });
  
  const range = `!A01:C10`;

  const response = await sheet.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range,
  });

  const collages = response.data.values;

  return {
    props: {
      collages
    }
  }
}

export default function Collages({ collages }) {

  console.log(collages)

  const images = [
    { url: '/collage_1.jpg', width: 80, height: 80 },
    { url: '/plane.jpeg', width: 80, height: 80 },
  ];

  return <div className={`${styles.container}`}>
    <div className={styles.header}>
      <h1 className={cormorant.className}>MICHELLE VERSILLÉ</h1>
      <nav>
        <ul>
          <li><Link href="/collages">Collages</Link></li>
          <li><Link href="/collages">About</Link></li>
          <li><Link href="/collages">Contact</Link></li>
        </ul>
      </nav>
    </div>

    
      <Caroussel images={images}></Caroussel>
  </div>
}