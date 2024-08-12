"use client"
import { signIn } from "next-auth/react"
import { useEffect } from "react"

export default function SignIn() {
  useEffect(() => {
    signIn("azure-ad-b2c")
  }, [])

  return null
}
