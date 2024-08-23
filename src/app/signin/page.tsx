import { auth } from "auth";
import GoogleSigninButton from "components/client/GoogleSigninButton";
import { SigninForm } from "components/client/SigninForm";
import { redirect } from "next/navigation";
import { Stack } from "@mui/material";
import Title from "components/client/Title";

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
    </>
  );
}
