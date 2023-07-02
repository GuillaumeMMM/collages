import Head from 'next/head';
import Layout from '../components/layout';
import Title from '../components/title';
import Menu from '../components/menu';

import styles from '../styles/about.module.scss';

export default function About() {
    return <>
        <Head>
            <title>À Propos | Michelle Versillé</title>
        </Head>
        <Menu active={'about'}></Menu>

        <Layout>
            <div id="top"></div>
            <Title>À Propos</Title>
            <section className={styles['section']}>
                <p>A Berlin, au Bauhaus, dans les années 20, Gertrud Grunow, musicienne et professeur de chant, enseignait la théorie de l’harmonisation qui reposait sur le fait qu’un équilibre universellement valable de couleurs, de sons, de sensations et de formes était ancré dans l’homme.</p>
                &nbsp;
                <p>
                Depuis peu je colle des morceaux de papier les uns auprès des autres, laissant peu de vide, comblant presque tous les interstices d’une surface plane. Je laisse couler un flot dynamique de formes et de couleurs sans décider consciemment de leur agencement. Est-ce que je trouve mon travail beau ? Je ne veux pas en décider, la recherche d’une harmonie est certaine, elle me contente.
                </p>
            </section>
            <section className={styles['section']}>
                <h2>Le matériel</h2>
                <p>Essentiellement des revues d’art qui sont un concentré de formes et de couleurs et qui présentent notre histoire commune d’expression artistique de la Grotte Chauvet aux cavernes reconstituées de nos installations actuelles et à l’art qui s’exprime dans la rue.</p>
                <p>De la colle, de la colle… et du vernis colle.</p>
                <p>Un support, papier, carton, bois médium….peinture acrylique.</p>
                <p>Des ciseaux.</p>
                <p>Du papier calque.</p>
                <p>La télévision pour occuper le conscient.</p>
            </section>
            <section className={styles['section']}>
                <h2>Pour valoriser le travail</h2>
                <p>La photo par un photographe professionnel.</p>
                <p>L’encadrement par différents encadreurs professionnels.</p>
                <p>La création et l’animation d’un site internet par <a href="https://www.guillaumemeigniez.me" target="_blank">un ingénieur spécialisé</a>.</p>
            </section>
            <a href="#top">Retour en haut de la page</a>
            <br></br>
            &nbsp;
        </Layout>
    </>;
}