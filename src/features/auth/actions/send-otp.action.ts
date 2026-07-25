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
        error: parsed.error.errors[0]?.message || 'Please enter a valid email address.',
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
    const errorMsg = err instanceof Error ? err.message : String(err);
    const lower = errorMsg.toLowerCase();

    if (lower.includes('too many') || lower.includes('limit') || lower.includes('rate')) {
      return {
        success: false,
        error: 'Too many requests. Please wait 60 seconds before requesting another code.',
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
      error: 'Failed to send verification code. Please try again.',
    };
  }
}
