import { Resend } from 'resend';
import { env } from '@/env';
import { renderOtpEmailHtml } from '@/lib/email/otp-template';

const resendApiKey = env.RESEND_API_KEY || process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export class EmailService {
  /**
   * Sends an OTP verification email to the user via Resend.
   */
  public static async sendOtpEmail(
    email: string,
    otp: string
  ): Promise<{ success: boolean; error?: string }> {
    const from = env.FROM_EMAIL || 'Campus Minutes <onboarding@resend.dev>';
    const subject = 'Your Campus Minutes Verification Code';
    const html = renderOtpEmailHtml({ otp, appName: env.APP_NAME || 'Campus Minutes' });

    try {
      if (!resend) {
        if (env.NODE_ENV === 'development') {
          console.warn(
            `[EmailService Dev Fallback] RESEND_API_KEY is not set. Mocking email delivery to: ${email}`
          );
          return { success: true };
        } else {
          const errMsg = 'RESEND_API_KEY is not configured in production environment.';
          console.error(`[EmailService Error] ${errMsg}`);
          return { success: false, error: 'Email service misconfigured' };
        }
      }

      const response = await resend.emails.send({
        from,
        to: [email],
        subject,
        html,
      });

      if (response.error) {
        console.error(
          `[EmailService Delivery Failure] Target: ${email} | Error: ${response.error.message}`
        );
        return { success: false, error: response.error.message };
      }

      if (env.NODE_ENV === 'development') {
        console.log(
          `[EmailService Delivery Success] Email sent to ${email} (Message ID: ${response.data?.id})`
        );
      }

      return { success: true };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown email delivery error';
      console.error(`[EmailService Exception] Target: ${email} | Exception: ${errorMsg}`);
      return { success: false, error: errorMsg };
    }
  }
}
