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
        error: parsed.error.errors[0]?.message || 'Please enter a valid 6-digit code.',
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
    const errorMsg = err instanceof Error ? err.message : String(err);
    const lower = errorMsg.toLowerCase();

    if (lower.includes('expire') || lower.includes('expired')) {
      return {
        success: false,
        error:
          "This verification code has expired. Please click 'Resend OTP' to receive a new code.",
      };
    }
    if (lower.includes('invalid') || lower.includes('incorrect') || lower.includes('not match')) {
      return {
        success: false,
        error: 'The verification code you entered is incorrect. Please check and try again.',
      };
    }
    if (lower.includes('too many') || lower.includes('limit') || lower.includes('rate')) {
      return {
        success: false,
        error:
          'Too many failed attempts. Please wait 60 seconds and request a new verification code.',
      };
    }
    if (lower.includes('fetch') || lower.includes('network') || lower.includes('connect')) {
      return {
        success: false,
        error: 'Network connection issue. Please check your internet connection and try again.',
      };
    }

    return {
      success: false,
      error: 'The verification code you entered is incorrect. Please check and try again.',
    };
  }
}
