import Head from 'next/head'
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