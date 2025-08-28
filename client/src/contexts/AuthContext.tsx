import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSnackbar } from 'notistack';
import { AuthContextType, AuthProviderProps, User } from '../types';


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};


export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // סימולציה של התחברות - בפועל תקרא ל-API
      // const response = await authAPI.login({ email, password });
      
      // לצורך הדוגמה - סימולציה
      const mockUser: User = {
        _id: '1',
        name: email === 'admin@gustapizza.com' ? 'מנהל המערכת' : 'משתמש רגיל',
        email: email,
        phone: '050-1234567',
        role: email === 'admin@gustapizza.com' ? 'admin' : 'customer',
      };

      // בדיקה פשוטה לצורך הדוגמה
      if (password !== '123456') {
        throw new Error('סיסמה שגויה');
      }

      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', 'mock-jwt-token');
      setUser(mockUser);
      
      enqueueSnackbar('התחברת בהצלחה!', { variant: 'success' });
      return { success: true };
    } catch (error: any) {
      enqueueSnackbar(error.message || 'שגיאה בהתחברות', { variant: 'error' });
      return { success: false, error: error.message };
    }
  };

  const register = async (userData: any) => {
    try {
      // סימולציה של הרשמה - בפועל תקרא ל-API
      // const response = await authAPI.register(userData);
      
      const mockUser: User = {
        _id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        role: 'customer',
      };

      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', 'mock-jwt-token');
      setUser(mockUser);
      
      enqueueSnackbar('נרשמת בהצלחה!', { variant: 'success' });
      return { success: true };
    } catch (error: any) {
      enqueueSnackbar(error.message || 'שגיאה בהרשמה', { variant: 'error' });
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    enqueueSnackbar('התנתקת בהצלחה', { variant: 'info' });
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};