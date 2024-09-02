import VerifyEmail from "components/email/Verify";
import { sendEmail } from ".";
import { generateVerificationToken } from "../verification";
import { get, update } from "app/repository/user";

export const sendVerificationEmail = async (
  firstName: string,
  email: string
) => {
  const subject = "Verify your email";

  const token = generateVerificationToken(email);

  try {
    sendEmail({
      to: [email],
      subject,
      template: VerifyEmail({
        firstName,
        token,
      }),
    });
  } catch (error) {
    console.error(error);
  }
};
