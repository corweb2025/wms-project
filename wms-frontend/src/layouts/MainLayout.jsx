import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(() => 
    localStorage.getItem('wms_sidebar') === '1'
  );
  
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  // 사이드바 상태 저장
  useEffect(() => {
    localStorage.setItem('wms_sidebar', collapsed ? '1' : '0');
  }, [collapsed]);

  // 인증이 풀리면 로그인 페이지로 이동
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login', { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">로딩 중...</div>;
  }

  return (
    <div className="flex h-screen bg-[#f4f6f9]">
      <Sidebar collapsed={collapsed} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          user={user} 
          onToggle={() => setCollapsed(!collapsed)} 
          onLogout={logout}
        />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}