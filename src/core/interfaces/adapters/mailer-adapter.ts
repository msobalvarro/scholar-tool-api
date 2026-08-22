import { ReactNode } from 'react';

export interface SendEmailPayload {
  to: string;
  subject: string;
}

export interface EmailProvider {
  sendEmail(payload: SendEmailPayload, template: ReactNode): Promise<void>;
}