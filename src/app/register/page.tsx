import RegisterForm from "components/client/RegisterForm";
import Title from "components/client/Title";

export default async function Signin() {
  return (
    <>
      <Title text="Register" hasGoBack />
      <RegisterForm />
    </>
  );
}
