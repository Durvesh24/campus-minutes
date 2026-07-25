import { create } from 'zustand';

export interface UserState {
  userId: string | null;
  isAuthenticated: boolean;
  setUser: (userId: string | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  userId: null,
  isAuthenticated: false,
  setUser: (userId) => set({ userId, isAuthenticated: !!userId }),
  logout: () => set({ userId: null, isAuthenticated: false }),
}));
