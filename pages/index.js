import { Cormorant } from 'next/font/google';
import styles from '../styles/index.module.scss';
const cormorant = Cormorant({ weight: "700", subsets: ['latin'] });

import Link from 'next/link';
import Caroussel from '../components/caroussel';
import { getCollages } from '../services/collages.service';
import Menu from '../components/menu';

export async function getServerSideProps() {
  const collages = await getCollages();

  return {
    props: {
      collages
    }
  }
}

export default function Collages({ collages }) {

  const homeCollage = collages[Math.floor(Math.random() * collages.length)];

  const regex = new RegExp(/(_\w+)\.(\w+)$/);

  const homeImage = { 
    url: homeCollage.imageUrl, 
    /* width: homeImageRatio < 1 ? 90 : homeImageRatio * 90, 
    height: homeImageRatio >= 1 ? 80 : homeImageRatio * 80,  */
    title: homeCollage.title,
    imageUrlPlaceholder: homeCollage.imageUrl.replace(regex, "$1$2")
  };

  return <div className={`${styles.container}`}>
    <Menu></Menu>
    <Caroussel images={[homeImage]}></Caroussel>
  </div>
}