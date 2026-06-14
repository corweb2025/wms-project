// pages/products/BarcodePrint.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function BarcodePrint() {
  const { t } = useTranslation();
  
  const [activeTab, setActiveTab] = useState(0);

  const [barcodeList] = useState([
    { code: 'A-001', name: 'Producto A-001 1', barcode: '8801234567890', date: '2026-06-07 14:30', status: 'normal' },
    { code: 'B-002', name: 'Producto B-002 2', barcode: '8801234567891', date: '2026-06-07 14:30', status: 'normal' },
    { code: 'C-003', name: 'Producto C-003 3', barcode: '8801234567892', date: '2026-06-07 14:30', status: 'normal' },
    { code: 'D-004', name: 'Producto D-004 4', barcode: '8801234567893', date: '2026-06-07 14:30', status: 'normal' },
    { code: 'E-005', name: 'Producto E-005 5', barcode: '8801234567894', date: '2026-06-07 14:30', status: 'normal' },
  ]);

  const tabs = [
    t('product.barcodePrint.tabs.list'),
    t('product.barcodePrint.tabs.notGenerated'),
    t('product.barcodePrint.tabs.labelPrint'),
    t('product.barcodePrint.tabs.reprint')
  ];

  return (
    <div className="p-4 flex flex-col gap-4 text-sm text-gray-700 min-h-0 h-full w-full">
      
      {/* 1. 상단 메뉴 경로 타이틀 + 버튼 */}
      <div className="flex justify-between items-center shrink-0 py-1 select-none">
        <div className="flex items-center gap-2 text-lg text-gray-400 font-medium">
          <span className="text-gray-500">📦 {t('product.breadcrumb')}</span>
          <span className="text-gray-300 font-light"> {'>'} </span>
          <span className="text-slate-800 font-bold">{t('product.barcodePrint.title')}</span>
        </div>
        <button 
          type="button" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-1.5 rounded text-sm shadow-sm transition"
        >
          + {t('product.barcodePrint.actions.batchGenerate')}
        </button>
      </div>

      {/* 2. 메인 컨텐츠 영역 카드 */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex-1 flex flex-col min-h-0 overflow-hidden p-5 gap-4">
        
        {/* 탭 네비게이션 바 */}
        <div className="flex border-b border-gray-200 text-sm font-medium shrink-0">
          {tabs.map((tab, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveTab(index)}
              className={`px-5 py-2.5 -mb-[1px] transition-colors border-b-2 font-semibold ${
                activeTab === index
                  ? 'border-blue-600 text-blue-600 font-bold'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 검색 필터바 */}
        <div className="grid grid-cols-6 gap-3 shrink-0 items-end bg-slate-50/50 p-3 rounded-lg border border-gray-100">
          <div className="col-span-2">
            <label className="block text-xs text-gray-400 font-medium mb-1">
              {t('product.search.code')} / {t('product.search.name')} / {t('product.fields.barcode')}
            </label>
            <input 
              type="text" 
              placeholder={t('product.barcodePrint.search.placeholder')}
              className="w-full border border-gray-300 rounded px-2.5 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white" 
            />
          </div>
          <div className="col-span-3"></div>
          <div className="flex justify-end">
            <button 
              type="button" 
              style={{ width: 'calc(33.333% + 20px)' }}
              className="bg-slate-700 hover:bg-slate-800 text-white font-semibold py-2 rounded text-sm shadow-sm transition flex items-center justify-center gap-1"
            >
              🔍 {t('product.barcodePrint.actions.search')}
            </button>
          </div>
        </div>

        {/* 데이터 리스트 테이블 */}
        <div className="flex-1 overflow-auto border rounded-lg border-gray-100 mt-2">
          <table className="w-full text-left text-sm border-collapse whitespace-nowrap">
            <thead className="bg-gray-50/80 text-gray-500 font-semibold sticky top-0 border-b border-gray-100">
              <tr>
                <th className="p-4">{t('product.barcodePrint.table.code')}</th>
                <th className="p-4">{t('product.barcodePrint.table.name')}</th>
                <th className="p-4">{t('product.barcodePrint.table.barcode')}</th>
                <th className="p-4">{t('product.barcodePrint.table.createdAt')}</th>
                <th className="p-4 text-center">{t('product.barcodePrint.table.status')}</th>
                <th className="p-4 text-center">{t('product.barcodePrint.table.print')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-600 font-medium">
              {activeTab === 0 && barcodeList.map((item) => (
                <tr key={item.code} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-mono font-semibold text-gray-800">{item.code}</td>
                  <td className="p-4 text-gray-700">{item.name}</td>
                  <td className="p-4 font-mono text-gray-500 tracking-wider">{item.barcode}</td>
                  <td className="p-4 text-gray-400 font-mono text-xs">{item.date}</td>
                  <td className="p-4 text-center">
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-50 text-emerald-600">
                      {t(`product.barcodePrint.status.${item.status}`)}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button 
                      type="button" 
                      className="border border-gray-300 hover:bg-slate-50 text-gray-600 font-semibold px-3 py-1 rounded text-xs shadow-sm transition"
                    >
                      {t('product.barcodePrint.actions.print')}
                    </button>
                  </td>
                </tr>
              ))}
              
              {/* 다른 탭 선택 시 */}
              {activeTab !== 0 && (
                <tr>
                  <td colSpan="6" className="p-10 text-center text-gray-400 font-medium bg-slate-50/30">
                    {t('product.barcodePrint.noData')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center items-center gap-1.5 mt-2 shrink-0 text-sm">
          <button type="button" className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center bg-white text-gray-400 hover:bg-gray-50">◀</button>
          <button type="button" className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm">1</button>
          <button type="button" className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center bg-white text-gray-400 hover:bg-gray-50">2</button>
          <button type="button" className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center bg-white text-gray-400 hover:bg-gray-50">▶</button>
        </div>

      </div>
    </div>
  );
}