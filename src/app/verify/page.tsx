import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { VerifyForm } from '@/features/auth/components';

export const metadata: Metadata = {
  title: 'Verify OTP | Campus Minutes',
  description: 'Enter the 6-digit OTP sent to your email address.',
};

interface VerifyPageProps {
  searchParams: Promise<{ email?: string }>;
}

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
  const params = await searchParams;
  const email = params.email;

  if (!email) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Verify Verification Code
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-6 py-8 shadow sm:rounded-lg sm:px-10">
          <VerifyForm initialEmail={email} />
        </div>
      </div>
    </div>
  );
}
