import dynamic from 'next/dynamic'
import styles from './caroussel.module.scss';

const HomeImageWithNoSSR = dynamic(() => import('../components/home-image'), {
    ssr: false
})

const Caroussel = ({ images }) => {
    const image = images[0];

    return (
        <div className={`${styles['image-container']}`}>
            <div className={styles['caroussel-image']}>
                <HomeImageWithNoSSR imageUrl={image.url} imageUrlPlaceholder={image.imageUrlPlaceholder} title={image.title}></HomeImageWithNoSSR>
            </div>
        </div>
    )
}

export default Caroussel;