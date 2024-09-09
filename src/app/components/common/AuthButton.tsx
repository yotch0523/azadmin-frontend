"use client"

import { signIn, signOut } from "next-auth/react"

type Props = {
  isSignedIn: boolean
}

export default function AuthButton({ isSignedIn }: Props) {
  return (
    <>
      {!isSignedIn ? (
        <button onClick={() => signIn("azure-ad-b2c")}>Sign in</button>
      ) : (
        <button
          onClick={() => (window.location.href = "/api/auth/federated-logout")}
        >
          Sign out
        </button>
      )}
    </>
  )
}
