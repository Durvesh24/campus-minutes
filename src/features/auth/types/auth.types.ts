import { UserRole } from '@prisma/client';

export interface AuthUser {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
  role: UserRole;
}

export interface AuthSession {
  user: AuthUser;
  expiresAt: Date;
}

export interface SendOtpParams {
  email: string;
}

export interface VerifyOtpParams {
  email: string;
  otp: string;
}

export interface AuthActionResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
