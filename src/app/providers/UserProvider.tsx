import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { setCurrentUserId } from '@/lib/userScope';

type UserContextValue = {
  user: User | null;
  userId: string | null;
  loading: boolean;
  error: Error | null;
};

const UserContext = createContext<UserContextValue>({ user: null, userId: null, loading: true, error: null });

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setCurrentUserId(null);
      setLoading(false);
      return;
    }
    let active = true;
    supabase.auth.getUser().then(({ data, error: authError }) => {
      if (!active) return;
      if (authError && authError.message !== 'Auth session missing!') setError(authError);
      setUser(data.user ?? null);
      setCurrentUserId(data.user?.id ?? null);
      setLoading(false);
    }).catch((authError: unknown) => {
      if (!active) return;
      setError(authError instanceof Error ? authError : new Error('Unable to load auth session'));
      setLoading(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      setUser(session?.user ?? null);
      setCurrentUserId(session?.user?.id ?? null);
      setLoading(false);
    });
    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(() => ({ user, userId: user?.id ?? null, loading, error }), [user, loading, error]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
