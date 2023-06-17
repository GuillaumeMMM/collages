import Head from 'next/head';
import Layout from '../components/layout';
import Title from '../components/title';
import Menu from '../components/menu';

export default function Contact() {
    return <>
        <Head>
            <title>Contact | Michelle Versillé</title>
        </Head>
        <Menu page={'contact'}></Menu>
        <Layout>
            <Title>Contact</Title>
            <p>Lorem ipsum</p>
        </Layout>
    </>;
}