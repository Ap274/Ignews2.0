import Head from 'next/head'
import { GetStaticProps } from 'next'
import { getPrismicClient } from '../../services/prismic'
import Prismic from '@prismicio/client'

import styles from './styles.module.scss'

export default function Posts() {
    return(
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href="#">
                        <time>12 de março de 2021</time>
                        <strong>Create a Monorepo With Lerna & Yarn Workspaces</strong>
                        <p>Aunque digan que soy Un bandolero donde voy Le doy gracias a Dios Por hoy estar donde estoy Y voy a seguir con mi tumbao' Y con mis ojos colorao' Con mis gato' activao' Ustedes to' me lo han dao'</p>
                    </a>
                    <a href="#">
                        <time>12 de março de 2021</time>
                        <strong>Create a Monorepo With Lerna & Yarn Workspaces</strong>
                        <p>Aunque digan que soy Un bandolero donde voy Le doy gracias a Dios Por hoy estar donde estoy Y voy a seguir con mi tumbao' Y con mis ojos colorao' Con mis gato' activao' Ustedes to' me lo han dao'</p>
                    </a>
                    <a href="#">
                        <time>12 de março de 2021</time>
                        <strong>Create a Monorepo With Lerna & Yarn Workspaces</strong>
                        <p>Aunque digan que soy Un bandolero donde voy Le doy gracias a Dios Por hoy estar donde estoy Y voy a seguir con mi tumbao' Y con mis ojos colorao' Con mis gato' activao' Ustedes to' me lo han dao'</p>
                    </a>
                </div>
            </main>
        </>
    )
}


// Precisamos carregar a nossa listagem de Posts, então:
export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient()

    const response = await prismic.query([
        Prismic.predicates.at('document.type', 'post')
    ], {
        // quais dados queremos buscar dessa aplicação
        fetch: ['post.title', 'post.content'],
        pageSize: 100,
    })

    console.log(JSON.stringify(response, null, 2))

    return {
        props: {}
    }
}