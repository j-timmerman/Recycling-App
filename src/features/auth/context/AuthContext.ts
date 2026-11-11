import { createContext } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import type { authService } from '../services/authService';

export interface AuthContextValue {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signInWithPassword: typeof authService.signInWithPassword;
  signUpWithPassword: typeof authService.signUpWithPassword;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
