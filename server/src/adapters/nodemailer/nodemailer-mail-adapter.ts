import nodemailer from 'nodemailer';

import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "26cf7ab10c3a45",
    pass: "e12b7449755972"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ email, subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: email ?? 'Alícia Foureaux <foureauxally@gmail.com>',
      subject,
      html: body,
    });
  }
}
