import { signIn, useSession } from 'next-auth/react';
import styles from './styles.module.scss'


interface SubscribeButtonProps {
    priceId: string;
}

export function SubscribeButton( { priceId }: SubscribeButtonProps) {
    const { data: session } = useSession()

    function handleSubscribe() {
        if (!session) {
            signIn('github')
            return;
        }

        // após criação da checkout session, fazer uma requisição para a route subscribe, para criarmos a sessão e redirecionarmos os dados
        
        
    }

    return (
        <button
            type="button"
            className={styles.subscribeButton}
            onClick={handleSubscribe}
        >
            Subscribe now
        </button>
    )
}