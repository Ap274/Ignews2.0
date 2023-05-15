import { signIn, useSession } from 'next-auth/react';
import styles from './styles.module.scss'
import { api } from '../../services/api'
import { getStripeJs } from '../../services/stripe-js';


interface SubscribeButtonProps {
    priceId: string;
}

export function SubscribeButton( { priceId }: SubscribeButtonProps) {
    const { data: session } = useSession()

    async function handleSubscribe() {
        if (!session) {
            signIn('github')
            return;
        }

        // após criação da checkout session, fazer uma requisição para a route subscribe, para criarmos a sessão e redirecionarmos os dados
        try {
            const response = await api.post('/subscribe')

            const { sessionId } = response.data

            const stripe = await getStripeJs()

            await stripe.redirectToCheckout({sessionId})
        } catch (err) {
            console.log(err.response.data)
            alert(err.message);
        }
        
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