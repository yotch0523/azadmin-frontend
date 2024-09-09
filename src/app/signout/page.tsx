"use client"
import { signOut } from "next-auth/react"

const Signout = () => {
  signOut()
  return null
}

export default Signout
