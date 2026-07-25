import { headers } from 'next/headers';
import { auth } from '@/lib/auth/auth';

export class AuthService {
  /**
   * Validates and retrieves the current authenticated session on the server side.
   */
  public static async getSession() {
    const requestHeaders = await headers();
    return await auth.api.getSession({
      headers: requestHeaders,
    });
  }

  /**
   * Retrieves the current user profile or returns null if unauthenticated.
   */
  public static async getCurrentUser() {
    const session = await AuthService.getSession();
    return session?.user ?? null;
  }
}
