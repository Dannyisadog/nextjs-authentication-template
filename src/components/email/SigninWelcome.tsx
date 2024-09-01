/* eslint-disable @next/next/no-img-element */
interface SigninWelcomeEmailProps {
  firstName: string;
}

export const SigninWelcomeEmail = (props: SigninWelcomeEmailProps) => {
  const { firstName } = props;
  return (
    <html>
      <body style={main}>
        <div style={container}>
          <img
            src={`https://nextauth.dannyisadog.com/logo.png`}
            width="50"
            height="50"
            alt="nextjs-authjs-template"
            style={logo}
          />
          <p style={paragraph}>Hi {firstName},</p>
          <p style={paragraph}>
            Welcome to the Next.js Auth.js Template!
            <br />
            We{"'"}re thrilled to have you with us!
          </p>
          <section style={btnContainer}>
            <a
              style={button}
              href="https://github.com/Dannyisadog/nextjs-authjs-template"
            >
              Get started
            </a>
          </section>
          <p style={paragraph}>
            Best,
            <br />
            Nextjs Authjs Template Team
          </p>
        </div>
      </body>
    </html>
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
  maxWidth: "37.5em",
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
