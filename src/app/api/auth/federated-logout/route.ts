import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    const token = session?.idToken
    if (!token) throw new Error("idToken is undefined.")

    const logoutUrl = `https://${process.env.ENTRA_B2C_TENANT_NAME}.b2clogin.com/${process.env.ENTRA_B2C_TENANT_NAME}.onmicrosoft.com/${process.env.ENTRA_B2C_SUSI_USERFLOW}/oauth2/v2.0/logout?post_logout_redirect_uri=${process.env.NEXTAUTH_URL}/signout&id_token_hint=${token}`
    return NextResponse.redirect(logoutUrl)
  } catch (error) {
    console.error(error)
  }
}
