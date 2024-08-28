import { SigninWelcomeEmail } from "components/email/SigninWelcome";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const from = "Next Auth Template <no-reply@nextauth.dannyisadog.com>";
const subject = "Welcome to Next Auth Template";

export async function sendEmail(firstName: string, email: string) {
  console.log("sendEmail", firstName);
  try {
    const { data, error } = await resend.emails.send({
      from,
      to: [email],
      subject,
      react: SigninWelcomeEmail({ firstName }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
