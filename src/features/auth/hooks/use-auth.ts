'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { sendOtpAction } from '../actions/send-otp.action';
import { verifyOtpAction } from '../actions/verify-otp.action';
import { AUTH_CONSTANTS } from '../constants/auth.constants';

export function useAuth() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const sendOtp = async (inputEmail: string) => {
    setIsLoading(true);
    setError(null);

    const result = await sendOtpAction(inputEmail);
    setIsLoading(false);

    if (!result.success) {
      setError(result.error || 'Failed to send OTP code');
      return false;
    }

    setEmail(inputEmail);
    setCooldown(AUTH_CONSTANTS.RESEND_COOLDOWN_SECONDS);
    return true;
  };

  const verifyOtp = async (inputOtp?: string) => {
    const codeToVerify = inputOtp || otp;
    setIsLoading(true);
    setError(null);

    const result = await verifyOtpAction(email, codeToVerify);
    setIsLoading(false);

    if (!result.success) {
      setError(result.error || 'Invalid OTP code');
      return false;
    }

    // Successfully authenticated - redirect to main application route
    router.push(AUTH_CONSTANTS.DEFAULT_REDIRECT);
    return true;
  };

  return {
    email,
    setEmail,
    otp,
    setOtp,
    isLoading,
    error,
    setError,
    cooldown,
    sendOtp,
    verifyOtp,
  };
}
