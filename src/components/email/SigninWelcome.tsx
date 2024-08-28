import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Section,
  Text,
} from "@react-email/components";

interface SigninWelcomeEmailProps {
  firstName: string;
}

export const SigninWelcomeEmail = (props: SigninWelcomeEmailProps) => {
  const { firstName } = props;
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`https://nextauth.dannyisadog.com/logo.png`}
            width="50"
            height="50"
            alt="nextjs-authjs-template"
            style={logo}
          />
          <Text style={paragraph}>Hi {firstName},</Text>
          <Text style={paragraph}>
            Welcome to the Next.js Auth.js Template!
            <br />
            We{"'"}re thrilled to have you with us!
          </Text>
          <Section style={btnContainer}>
            <Button
              style={button}
              href="https://github.com/Dannyisadog/nextjs-authjs-template"
            >
              Get started
            </Button>
          </Section>
          <Text style={paragraph}>
            Best,
            <br />
            Nextjs Authjs Template Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

SigninWelcomeEmail.PreviewProps = {
  firstName: "",
} as SigninWelcomeEmailProps;

export default SigninWelcomeEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#0773f7",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
