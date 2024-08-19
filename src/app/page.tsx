import SignoutButton from "@/components/client/SignoutButton";
import styles from "./page.module.css";
import GoogleSigninButton from "@/components/client/GoogleSigninButton";
import { auth } from "@/auth";
import Image from "next/image";

export default async function Home() {
  const session = await auth();

  if (session) {
    return (
      <main className={styles.main}>
        <p>Signed in as {session.user?.email}</p>
        <Image
          style={{
            marginTop: "1rem",
            borderRadius: "100px",
          }}
          width={120}
          height={120}
          src={session.user?.image as string}
          alt={session.user?.email as string}
        />
        <SignoutButton />
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <p>Unauthenticated</p>
      <GoogleSigninButton />
    </main>
  );
}
