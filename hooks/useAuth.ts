import { useContext } from 'react';
import { AuthContext } from '@/lib/auth-context';

export const useAuthHook = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthHook must be used within an AuthProvider');
  }
  return context;
};

export default useAuthHook;
