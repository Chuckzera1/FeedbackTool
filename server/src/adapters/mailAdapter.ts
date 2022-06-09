export interface SendEmailData {
  subject: string;
  body: string;
}

export interface MailAdapter {
  sendEmail: (params: SendEmailData) => Promise<void>;
}
