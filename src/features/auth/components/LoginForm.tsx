'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { sendOtpAction } from '../actions/send-otp.action';

export interface LoginFormProps {
  onSuccess?: (email: string) => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // Prevent duplicate submissions on rapid clicks

    setLoading(true);
    setError(null);

    const res = await sendOtpAction(email);

    if (!res.success) {
      setLoading(false);
      setError(res.error || 'Failed to send verification code. Please try again.');
      return;
    }

    if (onSuccess) {
      onSuccess(email);
    } else {
      router.push(`/verify?email=${encodeURIComponent(email)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} data-component="login-form" className="space-y-4">
      {error && (
        <div
          className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600"
          role="alert"
        >
          {error}
        </div>
      )}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          required
          placeholder="student@coep.ac.in"
          value={email}
          disabled={loading}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none disabled:bg-gray-100 disabled:opacity-70"
        />
      </div>
      <button
        type="submit"
        disabled={loading || !email.trim()}
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
            Sending OTP...
          </>
        ) : (
          'Continue with Email'
        )}
      </button>
    </form>
  );
}
