import { query as q } from 'faunadb'

import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

import { fauna } from '../../../services/fauna'

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'read:user'
          
        }
      }
    }),
  ],

  jwt: {
    signinKey: process.env.SIGNIN_KEY
  },

  callbacks: {
    async signIn({user, account, profile}) {
      // console.log(user)
      const { email } = user

      try {
        // fazendo inserção no banco com o método Create
        await fauna.query(
          q.Create(
            q.Collection('users'),
            { data: { email }}
          )
        )

        return true
      } catch {
        return false
      }      
    }
  }
}
export default NextAuth(authOptions)