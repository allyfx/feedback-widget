export interface SendMailData {
  email?: string;
  subject: string;
  body: string;
}

export interface MailAdapter {
  sendMail: (data: SendMailData) => Promise<void>;
}