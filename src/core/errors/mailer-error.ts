export class MailerError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'MailerError'
  }
}