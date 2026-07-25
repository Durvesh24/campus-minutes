/**
 * Email Client Service Infrastructure
 */
export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(_options: EmailOptions): Promise<{ success: boolean }> {
  // Resend / Email provider integration point
  return { success: true };
}
