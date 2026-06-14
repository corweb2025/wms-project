// pages/Dashboard.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Dashboard() {
  const { t } = useTranslation();

  // 차트 데이터 (다국어 적용을 위해 label은 컴포넌트 내부에서 처리)
  const lineData = [
    { name: '06-01', inbound: 420, outbound: 230 },
    { name: '06-02', inbound: 360, outbound: 180 },
    { name: '06-03', inbound: 310, outbound: 390 },
    { name: '06-04', inbound: 350, outbound: 340 },
    { name: '06-05', inbound: 290, outbound: 320 },
    { name: '06-06', inbound: 340, outbound: 390 },
    { name: '06-07', inbound: 410, outbound: 430 },
  ];

  const pieData = [
    { name: t('dashboard.pie.a'), value: 400, color: '#2563eb' },
    { name: t('dashboard.pie.b'), value: 300, color: '#10b981' },
    { name: t('dashboard.pie.c'), value: 200, color: '#f59e0b' },
    { name: t('dashboard.pie.d'), value: 150, color: '#ef4444' },  
  ];

  return (
    <div className="p-5 space-y-5 max-w-[1920px] mx-auto text-sm text-gray-800">
      
      {/* 상단 컨트롤 패널 */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2.5">
          <h2 className="text-base font-bold text-gray-900">{t('dashboard.title')}</h2>
          <span className="bg-blue-50 text-blue-600 font-bold px-2.5 py-0.5 rounded text-xs animate-pulse">
            {t('dashboard.realTime')}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <select className="border border-gray-300 rounded px-2.5 py-1.5 bg-white text-gray-600">
            <option>{t('dashboard.thisWeek')}</option>
          </select>
          <button className="border border-gray-300 rounded px-3 py-1.5 bg-white text-gray-600 font-medium">
            ⏳ {t('dashboard.detailFilter')}
          </button>
          <button className="border border-gray-300 rounded px-3 py-1.5 bg-white text-gray-600 font-medium">
            🔄 {t('dashboard.syncData')}
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded px-4 py-1.5 shadow-sm transition">
            {t('common.excelDownload')}
          </button>
        </div>
      </div>

      {/* 핵심 지표 스코어보드 */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 border border-gray-200 shadow-sm rounded-xl flex justify-between items-center">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('dashboard.totalInbound')}</p>
            <p className="text-3xl font-bold mt-1 tracking-tight text-slate-800">12,345 <span className="text-sm font-normal text-gray-400">EA</span></p>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">▲ +5.2%</span>
        </div>

        <div className="bg-white p-4 border border-gray-200 shadow-sm rounded-xl flex justify-between items-center">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('dashboard.totalOutbound')}</p>
            <p className="text-3xl font-bold mt-1 tracking-tight text-slate-800">8,721 <span className="text-sm font-normal text-gray-400">EA</span></p>
          </div>
          <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full">▼ -2.1%</span>
        </div>

        <div className="bg-white p-4 border border-gray-200 shadow-sm rounded-xl flex justify-between items-center">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('dashboard.currentStock')}</p>
            <p className="text-3xl font-bold mt-1 tracking-tight text-slate-800">28,456 <span className="text-sm font-normal text-gray-400">EA</span></p>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">▲ +1.2%</span>
        </div>

        <div className="bg-white p-4 border border-gray-200 shadow-sm rounded-xl flex justify-between items-center">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('dashboard.accuracy')}</p>
            <p className="text-3xl font-bold mt-1 tracking-tight text-slate-800">99.2 <span className="text-sm font-normal text-gray-400">%</span></p>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">▲ +0.5%</span>
        </div>
      </div>

      {/* 중앙 차트 영역 */}
      <div className="grid grid-cols-3 gap-4">
        {/* 입출고 트렌드 */}
        <div className="col-span-2 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-700">{t('dashboard.trendTitle')}</h3>
            <p className="text-xs text-gray-400 font-light mt-0.5">{t('dashboard.trendSubtitle')}</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ left: -15, right: 10, top: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#9ca3af" tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="inbound" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 4 }} name={t('dashboard.inbound')} />
                <Line type="monotone" dataKey="outbound" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 4 }} name={t('dashboard.outbound')} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 창고 구역 점유율 */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-700">{t('dashboard.warehouseSection')}</h3>
            <p className="text-xs text-gray-400 font-light mt-0.5">{t('dashboard.occupancyRate')}</p>
          </div>
          <div className="h-44 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={50} outerRadius={70} paddingAngle={4} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 border-t pt-2.5">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 영역 */}
      <div className="grid grid-cols-2 gap-4">
        {/* 회전율 상위 품목 */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h3 className="text-sm font-bold text-gray-700">{t('dashboard.topRotation')}</h3>
              <p className="text-xs text-gray-400 font-light mt-0.5">{t('dashboard.topRotationSubtitle')}</p>
            </div>
            <span className="text-xs text-blue-500 font-medium cursor-pointer hover:underline">
              {t('common.viewAll')} →
            </span>
          </div>
          {/* 테이블 부분은 생략하거나 필요시 추가 번역 적용 */}
          {/* ... 기존 테이블 코드 유지 ... */}
        </div>

        {/* 최근 작업 로그 */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-sm font-bold text-gray-700">{t('dashboard.recentActivity')}</h3>
              <p className="text-xs text-gray-400 font-light mt-0.5">{t('dashboard.recentActivitySubtitle')}</p>
            </div>
            <span className="text-xs text-blue-500 font-medium cursor-pointer hover:underline">
              {t('common.viewAll')} →
            </span>
          </div>
          {/* 로그 리스트는 기존 코드 유지 */}
        </div>
      </div>

      {/* 긴급 알림 배너 */}
      <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3.5 rounded-lg flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-base">⚠️</span>
          <span>
            <strong>{t('dashboard.alertTitle')}:</strong> {t('dashboard.alertMessage')}
          </span>
        </div>
        <button className="bg-amber-600 hover:bg-amber-700 text-white text-xs px-3.5 py-1.5 rounded font-bold transition">
          {t('dashboard.processOrder')}
        </button>
      </div>
    </div>
  );
}