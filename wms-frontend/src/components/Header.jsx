// components/Header.jsx
import { useNavigate } from 'react-router-dom';
import { Bell, LogOut, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';

const roleMap = {
  admin: '관리자',
  manager: '매니저',
  inbound: '입고담당',
  outbound: '출고담당',
  viewer: '조회전용'
};

export default function Header({ collapsed, onToggle }) {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (window.confirm(t('common.logout_confirm', '로그아웃 하시겠습니까?'))) {
      await logout();
    }
  };

  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-2">
        <button onClick={onToggle} className="p-2 hover:bg-gray-100 rounded-lg transition">
          {collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
        </button>
        <input 
          placeholder={t('common.search')} 
          className="bg-[#f1f5f9] rounded-lg px-3 py-1.5 w-72 text-sm outline-none hidden md:block"
        />
      </div>

      <div className="flex items-center gap-4">
        <LanguageSwitcher />

        <Bell size={18} className="text-gray-600 cursor-pointer hover:text-gray-800" />

        {user && (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-semibold">{user.name}</div>
              <div className="text-[11px] text-gray-500">
                {roleMap[user.role] || user.role} · {user.email}
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white grid place-items-center text-xs font-bold">
              {user.name?.[0] || '?'}
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 hover:bg-red-50 hover:text-red-600 rounded-lg transition"
            >
              <LogOut size={18} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}