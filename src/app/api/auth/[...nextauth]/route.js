import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credential',
      credentials: {
        username: { type: 'text', placeholder: 'Enter username...' },
        password: { type: 'password' }
      },
      async authorize(credentials, req) {
        // console.log(req, 'reqqq')
        let clientIp = req.headers['x-forwarded-for'].split(':')
        clientIp = clientIp[clientIp.length - 1];
        console.log(clientIp, 'clientIp')

        let params = JSON.stringify({
          clientIp,
          'username': 'user-docs',
          'params': {
            'username': credentials.username,
            'password': credentials.password
          }
        })

        console.log(params, 'parameters')

        try {
          const response = await fetch('http://' + process.env.API_HOST_LOGIN + '/api/Auth/login', {
            method: 'POST',
            headers: new Headers({
              'Authorization': 'Basic ' + btoa(process.env.API_USERNAME_LOGIN + ':' + process.env.API_PASSWORD_LOGIN),
              'Content-Type': 'application/json'
            }),
            body: params,
            mode: 'cors',
            cache: 'default'
          });

          const user = await response.json()
          // console.log(user, 'user')

          const { code, content } = user

          return (code === 0) ? content : null

        } catch (error) {
          console.log(error)
          return error
        }

      }
    })
  ],
  callbacks: {
    async session({ session, user, token }) {
      let { username, role, fullName } = token
      // console.log(username, role, fullName, 'lahhh')
      session = { ...session, user: { ...user, username, role, fullName } }
      return session
    },
    async jwt(params) {
    //   console.log(params, 'params jwtsss') 
      if (params.user?.role) params.token.role = params.user?.role
      if (params.user?.username) params.token.username = params.user?.username
      if (params.user?.username) params.token.fullName = params.user?.fullName

      return params.token
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
    signOut: '/'
  },
  session: {
    strategy: 'jwt',
    maxAge: 86400,
    updateAge: 24 * 60 * 60
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

// export default NextAuth(authOptions)