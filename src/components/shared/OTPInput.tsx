import React from 'react';

export interface OTPInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
}

export function OTPInput({ length = 6 }: OTPInputProps) {
  return <div data-component="otp-input" data-length={length} />;
}
