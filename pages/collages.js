import Image from 'next/image';
import Head from 'next/head';
import Layout from '../components/layout';
import Title from '../components/title';
import Menu from '../components/menu';
import { getCollages } from '../services/collages.service';
import styles from '../styles/collages.module.scss';
import Collage from '../components/collage';

export async function getServerSideProps() {
    const collages = await getCollages();

    return {
        props: {
            collages
        }
    }
}

export default function Collages({ collages }) {
    return <>
        <Head>
            <title>Collages | Michelle Versillé</title>
        </Head>
        <Menu active='collages'></Menu>

        <Layout>
            <div id="top"></div>
            <Title>Collages</Title>
            <div className={styles['collages']}>
                {
                    (collages || []).map((collage, index) => {
                        return <Collage collage={collage} key={index}></Collage>
                    })
                }
            </div>
            <div className={styles['back-top']}>
                <a href="#top">Retour en haut de la page</a>
            </div>
            &nbsp;
        </Layout>
    </>;
}