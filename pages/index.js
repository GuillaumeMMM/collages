import { Cormorant } from 'next/font/google';
import styles from '../styles/index.module.scss';
const cormorant = Cormorant({ weight: "700", subsets: ['latin'] });

import Link from 'next/link';
import Caroussel from '../components/caroussel';
import { google } from 'googleapis';

export async function getServerSideProps({ query }) {

  const auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    credentials: {
      "type": process.env.GOOGLE_API_TYPE,
      "project_id": process.env.GOOGLE_API_PROJECT_ID,
      "private_key_id": process.env.GOOGLE_API_PRIVATE_KEY_ID,
      "private_key": process.env.GOOGLE_API_PRIVATE_KEY.replace(/\\n/g, '\n'),
      "client_email": process.env.GOOGLE_API_CLIENT_EMAIL,
      "client_id": process.env.GOOGLE_API_CLIENT_ID,
      "auth_uri": process.env.GOOGLE_API_AUTH_URI,
      "token_uri": process.env.GOOGLE_API_TOKEN_URI,
      "auth_provider_x509_cert_url": process.env.GOOGLE_API_AUTH_PROVIDER_X509_CERT_URL,
      "client_x509_cert_url": process.env.GOOGLE_API_CLIENT_X509_CERT_URL,
      "universe_domain": process.env.GOOGLE_API_UNIVERSE_DOMAIN
    }
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