import { auth } from "auth";
import GoogleSigninButton from "components/client/GoogleSigninButton";
import { SigninForm } from "components/client/SigninForm";
import { redirect } from "next/navigation";
import { Stack } from "@mui/material";
import Title from "components/client/Title";
import GithubSigninButton from "components/client/GithubSigninButton";
import FacebookSigninButton from "components/client/FacebookSigninButton";

export default async function Signin() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <>
      <Title text="Next.js Auth Template" />
      <SigninForm />
      <GoogleSigninButton />
      <GithubSigninButton />
      <FacebookSigninButton />
    </>
  );
}
