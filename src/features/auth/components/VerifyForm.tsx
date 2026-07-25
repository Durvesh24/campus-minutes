'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { verifyOtpAction } from '../actions/verify-otp.action';
import { sendOtpAction } from '../actions/send-otp.action';
import { AUTH_CONSTANTS } from '../constants/auth.constants';

export interface VerifyFormProps {
  initialEmail: string;
}

export function VerifyForm({ initialEmail }: VerifyFormProps) {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState<number>(AUTH_CONSTANTS.RESEND_COOLDOWN_SECONDS);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || otp.length !== 6) return; // Prevent duplicate submission clicks

    setLoading(true);
    setError(null);

    const res = await verifyOtpAction(initialEmail, otp);

    if (!res.success) {
      setLoading(false);
      setError(
        res.error || 'The verification code you entered is incorrect. Please check and try again.'
      );
      return;
    }

    // Keep loading state active during navigation to prevent double clicks and ensure smooth transition
    router.push(AUTH_CONSTANTS.DEFAULT_REDIRECT);
  };

  const handleResend = async () => {
    if (resending || cooldown > 0) return; // Prevent multiple clicks & enforce cooldown

    setResending(true);
    setError(null);

    const res = await sendOtpAction(initialEmail);
    setResending(false);

    if (!res.success) {
      setError(res.error || 'Failed to resend verification code. Please try again.');
      return;
    }

    // Reset cooldown to 60 seconds on successful resend
    setCooldown(AUTH_CONSTANTS.RESEND_COOLDOWN_SECONDS);
  };

  return (
    <form onSubmit={handleVerify} data-component="verify-form" className="space-y-4">
      {error && (
        <div
          className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600"
          role="alert"
        >
          {error}
        </div>
      )}
      <div>
        <p className="text-sm text-gray-600">
          Enter the 6-digit code sent to <strong className="text-gray-900">{initialEmail}</strong>
        </p>
        <label htmlFor="otp" className="sr-only">
          OTP Code
        </label>
        <input
          id="otp"
          type="text"
          maxLength={6}
          required
          autoFocus
          placeholder="123456"
          value={otp}
          disabled={loading}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
          className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-center font-mono text-2xl tracking-widest shadow-sm focus:border-indigo-500 focus:outline-none disabled:bg-gray-100 disabled:opacity-70"
        />
      </div>
      <button
        type="submit"
        disabled={loading || otp.length !== 6}
        className="flex w-full items-center justify-center rounded-md bg-indigo-600 px-4 py-2 font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? (
          <>
            <svg
              className="mr-2 -ml-1 inline-block h-4 w-4 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Verifying...
          </>
        ) : (
          'Verify OTP & Continue'
        )}
      </button>

      <div className="pt-2 text-center">
        <button
          type="button"
          onClick={handleResend}
          disabled={resending || cooldown > 0}
          className="text-sm font-medium text-indigo-600 transition-colors hover:underline disabled:cursor-not-allowed disabled:text-gray-400 disabled:no-underline"
        >
          {resending
            ? 'Resending code...'
            : cooldown > 0
              ? `Resend in ${cooldown}s`
              : "Didn't receive code? Resend OTP"}
        </button>
      </div>
    </form>
  );
}
