export const AUTH_CONSTANTS = {
  OTP_LENGTH: 6,
  OTP_EXPIRY_SECONDS: 600, // 10 minutes
  RESEND_COOLDOWN_SECONDS: 60, // 60 seconds resend wait
  DEFAULT_REDIRECT: '/app',
  LOGIN_ROUTE: '/login',
  VERIFY_ROUTE: '/verify',
} as const;
