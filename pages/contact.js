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
            &nbsp;
            <p>Vous pouvez me contacter par mail à l'adresse suivante : <a href="mailto:michelleversille@gmail.com">michelleversille@gmail.com</a></p>
        </Layout>
    </>;
}