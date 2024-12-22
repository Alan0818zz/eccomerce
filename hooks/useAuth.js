import { useState, useEffect } from 'react';
import { getCurrentUser, logout } from '@/app/data/services/auth-service';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { isAuthenticated, user } = await getCurrentUser();
      setUser(isAuthenticated ? user : null);
    } catch (error) {
      console.error('獲取用戶信息失敗:', error);
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