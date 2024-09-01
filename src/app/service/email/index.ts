import { CreateEmailResponseSuccess, Resend } from "resend";

interface EmailParams {
  from?: string;
  to: string[];
  subject: string;
  template: JSX.Element;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (
  params: EmailParams
): Promise<CreateEmailResponseSuccess | null> => {
  const {
    from = "Next Auth Template <no-reply@nextauth.dannyisadog.com>",
    to,
    subject,
    template,
  } = params;

  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    react: template,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
