'use client';

import React, { useState } from 'react';
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

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await verifyOtpAction(initialEmail, otp);
    setLoading(false);

    if (!res.success) {
      setError(res.error || 'Invalid OTP code');
      return;
    }

    router.push(AUTH_CONSTANTS.DEFAULT_REDIRECT);
  };

  const handleResend = async () => {
    setResending(true);
    setError(null);
    const res = await sendOtpAction(initialEmail);
    setResending(false);

    if (!res.success) {
      setError(res.error || 'Failed to resend OTP code');
    }
  };

  return (
    <form onSubmit={handleVerify} data-component="verify-form" className="space-y-4">
      {error && (
        <div className="rounded bg-red-50 p-3 text-sm text-red-600" role="alert">
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
          placeholder="123456"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-center text-2xl tracking-widest shadow-sm focus:border-indigo-500 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={loading || otp.length !== 6}
        className="w-full rounded-md bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? 'Verifying...' : 'Verify OTP & Continue'}
      </button>

      <div className="pt-2 text-center">
        <button
          type="button"
          onClick={handleResend}
          disabled={resending}
          className="text-sm text-indigo-600 hover:underline disabled:opacity-50"
        >
          {resending ? 'Resending code...' : "Didn't receive code? Resend OTP"}
        </button>
      </div>
    </form>
  );
}
