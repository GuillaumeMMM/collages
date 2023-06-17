import { Cormorant } from 'next/font/google';
import styles from '../styles/index.module.scss';
const cormorant = Cormorant({ weight: "700", subsets: ['latin'] });

import dynamic from 'next/dynamic'
import Link from 'next/link';
import { useState } from 'react';

const HomeImageWithNoSSR = dynamic(() => import('../components/home-image'), {
  ssr: false
})

export default function Collages() {

  const [displayedImageIndex, setDisplayedImageIndex] = useState(0);

  const images = [
    { url: '/collage_1.jpg', width: 80, height: 80 },
    { url: '/plane.jpeg', width: 80, height: 80 },
  ];

  const onPreviousClicked = () => {
    if (displayedImageIndex === 0) {
      setDisplayedImageIndex(images.length - 1);
    } else {
      setDisplayedImageIndex(displayedImageIndex - 1);
    }
  }

  const onNextClicked = () => {
    if (displayedImageIndex === images.length - 1) {
      setDisplayedImageIndex(0);
    } else {
      setDisplayedImageIndex(displayedImageIndex + 1);
    }
  }

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

    <div className={styles['image-container']}>
      <div className={styles.foreground}>
        <div className={styles.left} onClick={onPreviousClicked}></div>
        <div className={styles.right} onClick={onNextClicked}></div>
      </div>
      <div className={styles['caroussel-image']} style={{width: `${images[displayedImageIndex].width}vh`, height: `${images[displayedImageIndex].height}vh`}}>
          <HomeImageWithNoSSR imageUrl={images[displayedImageIndex].url}></HomeImageWithNoSSR>
        </div>
    </div>
  </div>
}