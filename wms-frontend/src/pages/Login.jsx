// pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, User, Lock, Eye, EyeOff } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function Login() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("daniel@gmail.com");
  const [pwd, setPwd] = useState("1234");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      await login(email, pwd);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      const message = err.response?.data?.message || t('login.error');
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div className="min-h-screen bg-[#eef2f7] flex items-center justify-center p-4">
      <div className="w-full max-w-[1100px] h-[640px] max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
        
        {/* Left - Branding (스페인어/한국어 모두 잘 보이도록 조정) */}
        <div className="relative bg-gradient-to-br from-[#2563eb] via-[#3b5bdb] to-[#4f46e5] text-white p-12 flex flex-col justify-between hidden lg:flex">
          <div>
            <div className="flex items-center gap-3 mb-16">
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                <Box size={28} />
              </div>
              <span className="font-bold text-3xl">WMS</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight">{t('header.title')}</h1>
            <p className="mt-8 text-white/80 leading-relaxed">
              {t('login.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 text-center">
            <div><div className="text-3xl font-bold">12,345</div><div className="text-xs opacity-70 mt-1">Stock Total</div></div>
            <div><div className="text-3xl font-bold">98.7%</div><div className="text-xs opacity-70 mt-1">Precisión</div></div>
            <div><div className="text-3xl font-bold">24/7</div><div className="text-xs opacity-70 mt-1">Tiempo Real</div></div>
          </div>
        </div>

        {/* Right - Login Form */}
        <div className="p-10 lg:p-16 flex flex-col justify-center relative">
          {/* 언어 선택기 (우측 상단) */}
          <div className="absolute top-8 right-8">
            <LanguageSwitcher />
          </div>

          <div className="mb-10">
            <h3 className="text-3xl font-bold text-gray-800">{t('login.title')}</h3>
            <p className="text-gray-500 mt-2">{t('login.subtitle')}</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl mb-6 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">{t('login.id_or_email')}</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full border border-gray-300 rounded-2xl pl-11 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="daniel@gmail.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1.5">{t('login.password')}</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={pwd}
                  onChange={e => setPwd(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full border border-gray-300 rounded-2xl pl-11 pr-12 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-blue-600" />
              {t('login.remember_me')}
            </label>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-[#2563eb] hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3.5 rounded-2xl transition text-base mt-2"
            >
              {loading ? "Cargando..." : t('common.login')}
            </button>
          </div>

          {/* 데모 계정 */}
          <div className="mt-8 bg-gray-50 border border-gray-100 p-5 rounded-2xl text-xs">
            <p className="font-medium text-gray-700 mb-2">{t('login.demo')}</p>
            <div className="whitespace-pre-line text-gray-600 text-[13px]">
              {t('login.demo_accounts')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}