import SendForgotPasswordLinkForm from "components/client/SendForgotPasswordLinkForm";
import Title from "components/client/Title";

export default async function Signin() {
  return (
    <>
      <Title text="Forgot password" hasGoBack />
      <SendForgotPasswordLinkForm />
    </>
  );
}
