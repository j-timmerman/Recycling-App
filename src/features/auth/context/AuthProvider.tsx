import { useCallback, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../../lib/supabaseClient';
import { authService } from '../services/authService';
import { AuthContext } from './AuthContext';
import type { Session } from '@supabase/supabase-js';
import type { ReactNode } from 'react';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    let mounted = true;

    authService.getSession().then((s) => {
      if (!mounted) return;
      setSession(s);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const signOut = useCallback(async () => {
    await authService.signOut();
    queryClient.clear();
  }, [queryClient]);

  const value = {
    session,
    user: session?.user ?? null,
    loading,
    signInWithPassword: authService.signInWithPassword,
    signUpWithPassword: authService.signUpWithPassword,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
