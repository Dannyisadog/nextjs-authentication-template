import ResetPasswordEmail from "components/email/ResetPassword";
import { sendEmail } from ".";
import { generateResetPasswordToken } from "../resetPassword";
import { get } from "app/repository/user";

export const sendResetPasswordEmail = async (email: string) => {
  const subject = "Reset your password";

  const resetPasswordToken = generateResetPasswordToken(email);

  const user = await get({ email });

  await sendEmail({
    to: [email],
    subject,
    template: ResetPasswordEmail({
      firstName: user.name,
      token: resetPasswordToken,
    }),
  });
};
