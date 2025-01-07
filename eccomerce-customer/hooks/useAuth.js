import { useState, useEffect } from 'react';
import { getCurrentUser, logout } from '@/app/data/services/auth-service';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    console.log('useEffect triggered'); // 新增
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      console.log('Fetching user...');
      const { isAuthenticated, user } = await getCurrentUser();
      console.log('Fetch result:', { isAuthenticated, user });
      setUser(isAuthenticated ? user : null);
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success) {
        setUser(null);
        return true;
      }
      return false;
    } catch (error) {
      console.error('登出失敗:', error);
      return false;
    }
  };
  return {
    user,
    isLoading,
    logout: handleLogout,
    refreshUser: fetchUser
  };
}