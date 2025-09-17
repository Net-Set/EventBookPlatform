import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/lib/api';
import { User, LoginData, RegisterData, AuthResponse } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  initializeAuth: () => Promise<void>;
  validateToken: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      isInitialized: false,

      login: async (data: LoginData) => {
        try {
          set({ isLoading: true });
          const response = await api.post<AuthResponse>('/auth/login', data);
          const { access_token, user } = response.data;
          
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', access_token);
          }
          
          set({
            user,
            token: access_token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (data: RegisterData) => {
        try {
          set({ isLoading: true });
          const response = await api.post<AuthResponse>('/auth/register', data);
          const { access_token, user } = response.data;
          
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', access_token);
          }
          
          set({
            user,
            token: access_token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      validateToken: async (): Promise<boolean> => {
        const { token } = get();
        if (!token) {
          return false;
        }

        try {
          const response = await api.get('/auth/profile');
          const user = response.data;
          
          set({
            user,
            isAuthenticated: true,
          });
          
          return true;
        } catch (error) {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
          }
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
          return false;
        }
      },

      initializeAuth: async () => {
        set({ isLoading: true });
        
        try {
          if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem('token');
            
            if (storedToken) {
              set({ token: storedToken });
              
              const isValid = await get().validateToken();
              
              if (!isValid) {
                set({
                  user: null,
                  token: null,
                  isAuthenticated: false,
                });
              }
            }
          }
        } catch (error) {
          console.error('Failed to initialize auth:', error);
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
        } finally {
          set({ 
            isLoading: false,
            isInitialized: true 
          });
        }
      },

      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
        }
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      setLoading: (loading: boolean) => set({ isLoading: loading }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isInitialized: state.isInitialized,
      }),
    }
  )
);