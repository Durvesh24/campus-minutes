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
    setLoading(true);
    setError(null);

    const res = await sendOtpAction(email);
    setLoading(false);

    if (!res.success) {
      setError(res.error || 'Failed to send OTP code');
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
        <div className="rounded bg-red-50 p-3 text-sm text-red-600" role="alert">
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
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? 'Sending OTP...' : 'Continue with Email'}
      </button>
    </form>
  );
}
