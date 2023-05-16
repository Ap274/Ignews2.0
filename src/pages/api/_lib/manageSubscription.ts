import { query as q } from 'faunadb'

import { fauna } from "../../../services/fauna";
import { stripe } from '../../../services/stripe';

export async function saveSubscription(
    subscriptionId: string,
    customerId: string,
    createAction = false,
) {
    // console.log(subscriptionId, customerId)
    // Primeiramente, iremos buscar os dados do usuário
    const userRef = await fauna.query(
        q.Select(
            "ref",
            q.Get(
                q.Match(
                    q.Index('user_by_stripe_customer_id'),
                    customerId
                )
            )
        )
    )

    // Agora, precisamos de todos os dados da subscription || subscriptionData só para filtrar os dados mais importates
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    const subscriptionData = {
        id: subscription.id,
        userId: userRef,
        status: subscription.status,
        price_id: subscription.items.data[0].price.id,
    }

    // Agora, salvar esses dados no FaunaDB
    if (createAction) { 
        await fauna.query(
            q.Create(
                q.Collection('subscriptions'),
                { data: subscriptionData }
            )
        )
    } else { 
        await fauna.query(
            q.Replace(
                q.Select(
                    "ref",
                    q.Get(
                        q.Match(
                            q.Index('subscription_by_id'),
                            subscriptionId,
                        )
                    )
                ),
                { data: subscriptionData}
                // { data:  { status: subscriptionData.status }} 
            )
        )
    }
}