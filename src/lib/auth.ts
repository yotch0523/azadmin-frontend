import NextAuth from "next-auth/next"
import AzureADB2CProvider from "next-auth/providers/azure-ad-b2c"

if (
  !process.env.ENTRA_B2C_CLIENT_ID ||
  !process.env.ENTRA_B2C_CLIENT_SECRET ||
  !process.env.ENTRA_B2C_TENANT_NAME
) {
  console.error("Microsoft Entra B2C environment variables are not set")
  process.exit()
}

export const authOptions = {
  providers: [
    AzureADB2CProvider({
      clientId: process.env.ENTRA_B2C_CLIENT_ID,
      clientSecret: process.env.ENTRA_B2C_CLIENT_SECRET,
      tenantId: process.env.ENTRA_B2C_TENANT_NAME,
      primaryUserFlow: process.env.ENTRA_B2C_SUSI_USERFLOW,
      authorization: {
        params: {
          scope: "openid profile offline_access",
          response_type: "code",
        },
      },
      profile: (profile: any) => {
        return {
          id: profile.sub,
          idToken: profile.id_token,
          ...profile,
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      session.accessToken = token.accessToken
      session.idToken = token.idToken
      return session
    },
    async jwt({ token, account }: { token: any; account: any }) {
      if (account) {
        token.accessToken = account.access_token
        token.idToken = account.id_token
      }
      return token
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      const redirectUrl = url.startsWith(baseUrl)
        ? new URL(url).searchParams.get("redirectUrl") ?? baseUrl
        : baseUrl
      return redirectUrl
    },
  },
}

export const handler = NextAuth(authOptions)
