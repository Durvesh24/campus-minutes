export type UserRole = 'STUDENT' | 'VENDOR' | 'PARTNER' | 'ADMIN';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface Session {
  user: UserProfile;
  expiresAt: string;
}
