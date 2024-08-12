import { JWT } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextRequest } from "next/server"

export default withAuth({
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    authorized: async ({ token }: { token: JWT | null; req: NextRequest }) => {
      return !!token
    },
  },
})
