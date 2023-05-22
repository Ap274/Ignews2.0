import { query as q } from 'faunadb'

import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

import { fauna } from '../../../services/fauna'

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'read:user'
          
        }
      },
    }),
  ],

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },

  callbacks: {
    async session({session}) {
    // nos permite modificar os dados do session, que estão ali. Retornando o session com os dados modificados. Verificar se o cliente tem uma assinatura ativa
      try {
        const userActiveSubscription = await fauna.query<string>(
          q.Get(
            q.Intersection([
              q.Match(
                q.Index('subscription_by_user_ref'),
                q.Select(
                  "ref",
                  q.Get(
                    q.Match(
                      q.Index('user_by_email'),
                      q.Casefold(session.user.email)
                    )
                  )
                )
              ),
              q.Match(
                q.Index('subscription_by_status'),
                "active"
              )
            ])
          )
        )
        return {
          ...session,
          activeSubscription: userActiveSubscription
        }
      } catch (e){
        console.log(e)
        return {
          ...session,
          activeSubscription: null,
        }
      }  
    },      

    async signIn({user, account, profile }) {
      // console.log(user)
      const { email } = user

      try {
        // fazendo inserção no banco com o método Create, verificando se ele já não existe
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(user.email)
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              { data: { email }}
            ),
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email)
              )
            )
          )
        )

        return true
      } catch {
        return false
      }      
    }
  }
})

