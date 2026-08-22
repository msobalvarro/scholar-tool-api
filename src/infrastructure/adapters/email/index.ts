import type { SendEmailPayload, EmailProvider } from '@/core/interfaces/adapters/mailer-adapter';
import { MailerError } from '@/core/errors/mailer-error';
import { environments } from '@/utils/constanst';
import { Resend } from 'resend';
import { Service } from 'typedi';
import { render } from 'react-email';
import { ReactNode } from 'react';

@Service()
export class ResendEmailAdapter implements EmailProvider {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(environments.RESEND_API_KEY);
  }

  async sendEmail(payload: SendEmailPayload, template: ReactNode): Promise<void> {
    const html = await render(template);

    const { data, error } = await this.resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [payload.to],
      subject: payload.subject,
      html,
    });

    if (error) {
      throw new MailerError(`Failed to send email via Resend: ${error.message}`);
    } else {
      console.log(`Correo enviado con éxito, ID: ${data?.id}`);
    }
  }
}