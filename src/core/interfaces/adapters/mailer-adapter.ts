export interface SendEmailPayload {
  to: string;
  subject: string;
  html: string;
}

export interface EmailProvider {
  sendEmail(payload: SendEmailPayload): Promise<void>;
}