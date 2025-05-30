import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext, AuthState } from '~/context/AuthContext';
import { authApi } from '~/features/auth/authApi';

export function AuthProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [auth, setAuth] = useState<AuthState>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const check = async () => {
      try {
        await authApi.check();
        if (isMounted) setAuth(true);
      } catch {
        if (isMounted) setAuth(false);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    check();

    return () => {
      isMounted = false;
    };
  }, [location.pathname]);

  return (
    <AuthContext.Provider value={{ auth, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
