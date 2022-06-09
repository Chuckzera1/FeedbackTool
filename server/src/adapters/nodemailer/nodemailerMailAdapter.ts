import { MailAdapter, SendEmailData } from "../mailAdapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "bc68b586a8953e",
    pass: "94b8f31b98dc62",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  sendEmail = async ({ subject, body }: SendEmailData) => {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Chuck <chuck@mail.com>",
      subject: subject,
      html: body,
    });
  };
}
