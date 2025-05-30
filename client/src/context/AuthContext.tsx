// AuthContext.jsx
import { createContext } from 'react';

export type AuthState = boolean | null;

interface AuthContextType {
  auth: boolean | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  auth: false,
  loading: true
});
