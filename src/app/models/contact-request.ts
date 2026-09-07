/** Payload emitted by the contact form on a successful submit. */
export interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}
