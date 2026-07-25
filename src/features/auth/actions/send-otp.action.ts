'use server';

import { emailSchema } from '../schemas/auth.schema';
import { AuthActionResult } from '../types/auth.types';
import { auth } from '@/lib/auth/auth';

export async function sendOtpAction(rawEmail: string): Promise<AuthActionResult> {
  try {
    const parsed = emailSchema.safeParse({ email: rawEmail });
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.errors[0]?.message || 'Invalid email address',
      };
    }

    const { email } = parsed.data;

    // Trigger Better Auth server-side OTP generation & dispatch
    await auth.api.sendVerificationOTP({
      body: {
        email,
        type: 'sign-in',
      },
    });

    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to send OTP';
    return { success: false, error: errorMsg };
  }
}
