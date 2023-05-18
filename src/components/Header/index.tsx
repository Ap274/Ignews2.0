import { SignInButton } from '../SignInButton'
import Link from 'next/link'

import styles from './styles.module.scss'

export function Header() { 
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="ig.news" />
                <nav>
                    <Link href="/" className={styles.active}>
                        Home
                    </Link>
                    <Link href="/posts">
                        Posts
                    </Link>
                </nav>

                <SignInButton />
            </div>
        </header>
    )
}