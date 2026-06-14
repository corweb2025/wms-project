// pages/report/InventoryReport.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Download } from 'lucide-react';

export default function InventoryReport() {
  const { t } = useTranslation();
  
  // 검색 조건 상태
  const [searchParams, setSearchParams] = useState({
    startDate: '2024-05-01',
    endDate: '2024-05-07',
    warehouse: 'all',
    category: 'all'
  });

  // 샘플 데이터 - 상품별 재고 현황 Top 5
  const topProducts = [
    { rank: 1, code: 'A-001', name: 'A-001 Producto 1', stock: 150, amount: 30000000 },
    { rank: 2, code: 'B-002', name: 'B-002 Producto 2', stock: 80, amount: 20000000 },
    { rank: 3, code: 'C-003', name: 'C-003 Producto 3', stock: 30, amount: 15000000 },
    { rank: 4, code: 'D-004', name: 'D-004 Producto 4', stock: 20, amount: 12000000 },
    { rank: 5, code: 'E-005', name: 'E-005 Producto 5', stock: 10, amount: 8000000 },
  ];

  // 샘플 데이터 - 재고금액 TOP 5 (차트용)
  const topAmounts = [
    { code: 'A-001', amount: 30000000, percent: 100 },
    { code: 'B-002', amount: 20000000, percent: 67 },
    { code: 'C-003', amount: 15000000, percent: 50 },
    { code: 'D-004', amount: 12000000, percent: 40 },
    { code: 'E-005', amount: 8000000, percent: 27 },
  ];

  // 샘플 데이터 - 재고 수량 추이 (차트용)
  const stockTrend = [
    { code: 'A-001', qty: 150 },
    { code: 'B-002', qty: 80 },
    { code: 'C-003', qty: 30 },
    { code: 'D-004', qty: 20 },
    { code: 'E-005', qty: 10 },
  ];

  const maxQty = Math.max(...stockTrend.map(d => d.qty));

  const handleSearch = () => {
    console.log('조회:', searchParams);
  };

  // 숫자 포맷 (천단위 콤마)
  const formatNumber = (num) => num.toLocaleString();

  // 통화 포맷
  const formatCurrency = (num) => `₩ ${formatNumber(num)}`;

  return (
    <div className="p-4 flex flex-col gap-4 text-sm text-gray-700 min-h-0 h-full w-full overflow-auto">
      {/* 브레드크럼 */}
      <div className="flex items-center gap-2 text-lg text-gray-400 font-medium shrink-0 py-1 select-none">
        <span className="text-gray-500">📦 {t('sidebar.reports')}</span>
        <span className="text-gray-300 font-light"> {'>'} </span>
        <span className="text-slate-800 font-bold">{t('inventoryReport.title')}</span>
      </div>

      {/* 조회조건 박스 */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm shrink-0">
        <div className="grid grid-cols-5 gap-3 items-end">
          {/* 기간 */}
          <div className="col-span-1">
            <label className="block text-xs text-gray-500 font-medium mb-1.5">{t('inventoryReport.search.period')}</label>
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-white">
              <Calendar size={16} className="text-gray-400" />
              <span className="text-sm text-gray-600">
                {searchParams.startDate} ~ {searchParams.endDate}
              </span>
            </div>
          </div>

          {/* 창고 */}
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-1.5">{t('inventoryReport.search.warehouse')}</label>
            <select 
              value={searchParams.warehouse}
              onChange={(e) => setSearchParams({...searchParams, warehouse: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">{t('inventoryReport.search.all')}</option>
              <option value="A">{t('inventoryReport.search.warehouseA')}</option>
              <option value="B">{t('inventoryReport.search.warehouseB')}</option>
            </select>
          </div>

          {/* 상품분류 */}
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-1.5">{t('inventoryReport.search.category')}</label>
            <select 
              value={searchParams.category}
              onChange={(e) => setSearchParams({...searchParams, category: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">{t('inventoryReport.search.all')}</option>
              <option value="electronics">{t('inventoryReport.search.electronics')}</option>
              <option value="household">{t('inventoryReport.search.household')}</option>
            </select>
          </div>

          {/* 버튼 그룹 */}
          <div className="col-span-2 flex justify-end gap-2">
            <button 
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg text-sm shadow-sm transition flex items-center justify-center gap-1"
            >
              {t('inventoryReport.search.btnSearch')}
            </button>
            <button 
              className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-4 py-2 rounded-lg text-sm shadow-sm transition flex items-center gap-1"
            >
              <Download size={16} />
              {t('inventoryReport.search.btnExcel')}
            </button>
          </div>
        </div>
      </div>

      {/* 요약 카드 영역 */}
      <div className="grid grid-cols-4 gap-4 shrink-0">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center">
          <span className="text-sm text-gray-500 mb-1">{t('inventoryReport.summary.totalStock')}</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-gray-800">12,345</span>
            <span className="text-sm text-gray-500">{t('inventoryReport.unit.ea')}</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center">
          <span className="text-sm text-gray-500 mb-1">{t('inventoryReport.summary.totalAmount')}</span>
          <span className="text-2xl font-bold text-gray-800">₩ 125,000,000</span>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center">
          <span className="text-sm text-gray-500 mb-1">{t('inventoryReport.summary.productCount')}</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-gray-800">1,250</span>
            <span className="text-sm text-gray-500">{t('inventoryReport.unit.piece')}</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center">
          <span className="text-sm text-gray-500 mb-1">{t('inventoryReport.summary.locationCount')}</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-gray-800">250</span>
            <span className="text-sm text-gray-500">{t('inventoryReport.unit.piece')}</span>
          </div>
        </div>
      </div>

      {/* 중간 차트/테이블 영역 */}
      <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
        {/* 왼쪽: 상품별 재고 현황 Top 5 */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col">
          <h3 className="text-base font-bold text-gray-800 mb-4">{t('inventoryReport.topProducts.title')}</h3>
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                <tr>
                  <th className="p-3 text-center w-16">{t('inventoryReport.topProducts.rank')}</th>
                  <th className="p-3 text-center">{t('inventoryReport.topProducts.code')}</th>
                  <th className="p-3 text-center">{t('inventoryReport.topProducts.name')}</th>
                  <th className="p-3 text-right">{t('inventoryReport.topProducts.currentStock')}</th>
                  <th className="p-3 text-right">{t('inventoryReport.topProducts.stockAmount')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {topProducts.map((item) => (
                  <tr key={item.code} className="hover:bg-gray-50">
                    <td className="p-3 text-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-700 text-xs font-bold">
                        {item.rank}
                      </span>
                    </td>
                    <td className="p-3 text-center font-mono text-blue-600">{item.code}</td>
                    <td className="p-3 text-center font-medium text-gray-800">{item.name}</td>
                    <td className="p-3 text-right font-medium">{formatNumber(item.stock)}</td>
                    <td className="p-3 text-right font-medium">{formatCurrency(item.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 오른쪽: 재고금액 TOP 5 */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col">
          <h3 className="text-base font-bold text-gray-800 mb-6">{t('inventoryReport.topAmounts.title')}</h3>
          <div className="flex-1 flex flex-col justify-center gap-5">
            {topAmounts.map((item, idx) => (
              <div key={item.code} className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-700 text-xs font-bold shrink-0">
                  {idx + 1}
                </span>
                <span className="w-16 font-mono text-gray-700 font-medium shrink-0">{item.code}</span>
                <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{width: `${item.percent}%`}}
                  ></div>
                </div>
                <span className="w-28 text-right font-medium text-gray-800 shrink-0">
                  {formatCurrency(item.amount)}
                </span>
              </div>
            ))}
          </div>
          {/* X축 레이블 (0M ~ 30M) */}
          <div className="flex justify-between mt-4 px-9 text-xs text-gray-400">
            <span>0M</span>
            <span>7.5M</span>
            <span>15M</span>
            <span>22.5M</span>
            <span>30M</span>
          </div>
        </div>
      </div>

      {/* 하단: 재고 수량 추이 */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 shrink-0 h-64">
        <h3 className="text-base font-bold text-gray-800 mb-4">{t('inventoryReport.stockTrend.title')}</h3>
        <div className="flex items-end justify-around h-40 px-4 gap-4">
          {stockTrend.map((item) => (
            <div key={item.code} className="flex flex-col items-center gap-2 flex-1 max-w-32">
              <div className="w-full flex justify-center">
                <div 
                  className="w-16 bg-blue-500 rounded-t-sm transition-all duration-500"
                  style={{height: `${(item.qty / maxQty) * 160}px`}}
                ></div>
              </div>
              <span className="text-xs text-gray-600 font-medium">{item.code}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}