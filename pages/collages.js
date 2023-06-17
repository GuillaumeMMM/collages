import Image from 'next/image';
import Head from 'next/head';
import Layout from '../components/layout';
import Title from '../components/title';
import Menu from '../components/menu';

export default function Collages() {
    return <>
        <Head>
            <title>Collages | Michelle Versillé</title>
        </Head>
        <Menu page={'collages'}></Menu>

        <Layout>
            <Title>Collages</Title>
            <Image src="/plane.jpeg" alt="Plane" width={0}
                height={0}
                sizes="100vw"
                style={{ width: '500px', height: 'auto' }} />
        </Layout>
    </>;
}