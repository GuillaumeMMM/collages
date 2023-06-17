import dynamic from 'next/dynamic'
import { useState } from 'react';
import styles from './caroussel.module.scss';

const HomeImageWithNoSSR = dynamic(() => import('../components/home-image'), {
    ssr: false
})

const Caroussel = ({ images }) => {

    const [displayedImageIndex, setDisplayedImageIndex] = useState(0);

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

    return (
        <div className={`${styles['image-container']}`}>
            {/* <div className={styles.foreground}>
                <div className={styles.left} onClick={onPreviousClicked}></div>
                <div className={styles.right} onClick={onNextClicked}></div>
            </div> */}
            <div className={styles['caroussel-image']} style={{ width: `${images[displayedImageIndex].width}vh`, height: `${images[displayedImageIndex].height}vh` }}>
                <HomeImageWithNoSSR imageUrl={images[displayedImageIndex].url} imageUrlPlaceholder={'https://live.staticflickr.com/65535/51792820918_76e4614f79_q.jpg'}></HomeImageWithNoSSR>
            </div>
        </div>
    )
}

export default Caroussel;