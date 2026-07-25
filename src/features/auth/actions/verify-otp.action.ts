'use server';

import { otpSchema } from '../schemas/auth.schema';
import { AuthActionResult } from '../types/auth.types';
import { auth } from '@/lib/auth/auth';

export async function verifyOtpAction(rawEmail: string, rawOtp: string): Promise<AuthActionResult> {
  try {
    const parsed = otpSchema.safeParse({ email: rawEmail, otp: rawOtp });
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.errors[0]?.message || 'Invalid input format',
      };
    }

    const { email, otp } = parsed.data;

    // Verify OTP via Better Auth API, creating User automatically if new and establishing session
    await auth.api.signInEmailOTP({
      body: {
        email,
        otp,
      },
    });

    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Invalid or expired OTP code';
    return { success: false, error: errorMsg };
  }
}
