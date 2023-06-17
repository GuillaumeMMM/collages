import Head from 'next/head';
import Layout from '../components/layout';
import Title from '../components/title';
import Menu from '../components/menu';

export default function About() {
    return <>
        <Head>
            <title>About | Michelle Versillé</title>
        </Head>
        <Menu page={'about'}></Menu>

        <Layout>
            <Title>About</Title>
            <p>Lorem ipsum</p>
        </Layout>
    </>;
}