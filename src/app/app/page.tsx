import type { Metadata } from 'next';
import { AuthService } from '@/features/auth/services';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Campus Minutes App',
  description: 'Welcome to Campus Minutes',
};

export default async function AppDashboardPage() {
  const user = await AuthService.getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const role = (user as { role?: string }).role || 'STUDENT';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow">
        <h1 className="text-2xl font-bold text-gray-900">Welcome to Campus Minutes</h1>
        <p className="mt-2 text-gray-600">
          Logged in as: <strong>{user.email}</strong> (Role: {role})
        </p>
      </div>
    </div>
  );
}
