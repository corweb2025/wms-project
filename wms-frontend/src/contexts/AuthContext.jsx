// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../lib/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // 사용자 정보 불러오기
  const loadUser = async () => {
    try {
      const res = await api.get('/auth/me');
      setUser(res.data);
    } catch (err) {
      // 401은 "로그인 안됨"을 의미하므로 에러로 처리하지 않음
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    setUser(res.data.user);
    return res.data.user;
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      navigate('/login', { replace: true });
    }
  };

  // 앱 시작 시 한 번만 사용자 정보 확인
  useEffect(() => {
    loadUser();
  }, []);

  // 로그인하지 않은 상태에서 보호된 페이지에 접근하면 로그인 페이지로 이동
  useEffect(() => {
    if (!loading && !user && !location.pathname.startsWith('/login')) {
      navigate('/login', { 
        replace: true,
        state: { from: location.pathname }
      });
    }
  }, [user, loading, location.pathname, navigate]);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    loadUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};