import Image from 'next/image';
import styles from './collage.module.scss'; 

const Collage = ({ collage }) => {
    return <div className={styles['collage']}>
        <div className={styles['collage-header']}>
            <h3>{collage.title}</h3>
            <span>{collage.date}</span>
        </div>
        <Image src={collage.imageUrl} alt="" width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }} />
            <div className={styles['collage-footer']}>
            <span>{collage.displayedSize}</span>
        </div>
    </div>
}

export default Collage;