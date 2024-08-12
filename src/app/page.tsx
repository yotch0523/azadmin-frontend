import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import styles from "@/app/page.module.css"
import AuthButton from "./components/common/AuthButton"

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main className={styles.main}>
      <AuthButton isSignedIn={!!session} />
    </main>
  )
}
