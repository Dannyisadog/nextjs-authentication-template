import { auth } from "auth";
import styles from "../page.module.css";
import GoogleSigninButton from "components/client/GoogleSigninButton";
import { SigninForm } from "components/client/SigninForm";
import { redirect } from "next/navigation";

export default async function Signin() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div className={styles.container}>
      <SigninForm />
      <GoogleSigninButton />
    </div>
  );
}
