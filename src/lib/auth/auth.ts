import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { emailOTP } from 'better-auth/plugins';
import { prisma } from '@/lib/db/prisma';
import { EmailService } from '@/features/auth/services/email.service';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'STUDENT',
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: false,
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        const result = await EmailService.sendOtpEmail(email, otp);
        if (!result.success) {
          throw new Error(result.error || 'Failed to deliver verification email');
        }
      },
      otpLength: 6,
      expiresIn: 600, // 10 minutes expiry
    }),
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days session expiration
    updateAge: 60 * 60 * 24, // 1 day session rotation update age
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes cookie cache
    },
  },
  secret: process.env.AUTH_SECRET || process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
});
