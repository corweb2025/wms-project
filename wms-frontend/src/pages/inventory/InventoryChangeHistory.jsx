// pages/inventory/InventoryChangeHistory.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function InventoryChangeHistory() {
  const { t } = useTranslation();
  
  // 샘플 데이터 - 재고 조정 이력
  const [adjustHistory] = useState([
    { 
      adjNo: 'ADJ-2024-0005', 
      adjDate: '2024-05-07', 
      productCode: 'A-001', 
      productName: 'A-001 Producto 1', 
      adjType: 'physicalCount', 
      reason: 'inventoryCount', 
      quantity: -50, 
      beforeStock: 150, 
      afterStock: 100, 
      operator: 'Daniel'
    },
    { 
      adjNo: 'ADJ-2024-0004', 
      adjDate: '2024-05-06', 
      productCode: 'B-002', 
      productName: 'B-002 Producto 2', 
      adjType: 'physicalCount', 
      reason: 'inventoryCount', 
      quantity: 20, 
      beforeStock: 80, 
      afterStock: 100, 
      operator: 'Susana'
    },
    { 
      adjNo: 'ADJ-2024-0003', 
      adjDate: '2024-05-06', 
      productCode: 'C-003', 
      productName: 'C-003 Producto 3', 
      adjType: 'lossAdjustment', 
      reason: 'damage', 
      quantity: -10, 
      beforeStock: 40, 
      afterStock: 30, 
      operator: 'Piter'
    },
    { 
      adjNo: 'ADJ-2024-0002', 
      adjDate: '2024-05-05', 
      productCode: 'D-004', 
      productName: 'D-004 Producto 4', 
      adjType: 'inboundAdjustment', 
      reason: 'inboundOmission', 
      quantity: 30, 
      beforeStock: 10, 
      afterStock: 40, 
      operator: 'Jecica'
    },
    { 
      adjNo: 'ADJ-2024-0001', 
      adjDate: '2024-05-04', 
      productCode: 'E-005', 
      productName: 'E-005 Producto 5', 
      adjType: 'physicalCount', 
      reason: 'inventoryCount', 
      quantity: -5, 
      beforeStock: 15, 
      afterStock: 10, 
      operator: 'Daniel'
    },
  ]);

  // 검색 조건 상태
  const [searchParams, setSearchParams] = useState({
    startDate: '2024-05-01',
    endDate: '2024-05-07',
    keyword: '',
    adjType: 'all',
    reason: 'all'
  });

  const handleSearch = () => {
    console.log('검색:', searchParams);
  };

  // 수량에 따른 색상 (음수는 빨간색, 양수는 파란색)
  const getQuantityStyle = (qty) => {
    if (qty < 0) return 'text-red-500 font-semibold';
    if (qty > 0) return 'text-blue-600 font-semibold';
    return 'font-semibold text-gray-800';
  };

  return (
    <div className="p-4 flex flex-col gap-4 text-sm text-gray-700 min-h-0 h-full w-full">
      
      {/* 브레드크럼 */}
      <div className="flex items-center gap-2 text-lg text-gray-400 font-medium shrink-0 py-1 select-none">
        <span className="text-gray-500">📦 {t('sidebar.inventoryManagement')}</span>
        <span className="text-gray-300 font-light"> {'>'} </span>
        <span className="text-slate-800 font-bold">{t('inventoryChangeHistory.title')}</span>
      </div>

      {/* 조회조건 박스 */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm shrink-0">
        <div className="grid grid-cols-6 gap-3 items-end">
          {/* 기간 */}
          <div className="col-span-2">
            <label className="block text-xs text-gray-500 font-medium mb-1.5">{t('inventoryChangeHistory.search.period')}</label>
            <div className="flex items-center gap-2">
              <input 
                type="date" 
                value={searchParams.startDate}
                onChange={(e) => setSearchParams({...searchParams, startDate: e.target.value})}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <span className="text-gray-400">~</span>
              <input 
                type="date" 
                value={searchParams.endDate}
                onChange={(e) => setSearchParams({...searchParams, endDate: e.target.value})}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* 검색어 */}
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-1.5">{t('inventoryChangeHistory.search.keyword')}</label>
            <input 
              type="text" 
              placeholder={t('inventoryChangeHistory.search.keyword')}
              value={searchParams.keyword}
              onChange={(e) => setSearchParams({...searchParams, keyword: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
            />
          </div>

          {/* 조정유형 */}
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-1.5">{t('inventoryChangeHistory.search.adjType')}</label>
            <select 
              value={searchParams.adjType}
              onChange={(e) => setSearchParams({...searchParams, adjType: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">{t('inventoryChangeHistory.search.all')}</option>
              <option value="physicalCount">{t('inventoryChangeHistory.search.physicalCount')}</option>
              <option value="lossAdjustment">{t('inventoryChangeHistory.search.lossAdjustment')}</option>
              <option value="inboundAdjustment">{t('inventoryChangeHistory.search.inboundAdjustment')}</option>
            </select>
          </div>

          {/* 조정사유 */}
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-1.5">{t('inventoryChangeHistory.search.adjReason')}</label>
            <select 
              value={searchParams.reason}
              onChange={(e) => setSearchParams({...searchParams, reason: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">{t('inventoryChangeHistory.search.all')}</option>
              <option value="inventoryCount">{t('inventoryChangeHistory.search.inventoryCount')}</option>
              <option value="damage">{t('inventoryChangeHistory.search.damage')}</option>
              <option value="inboundOmission">{t('inventoryChangeHistory.search.inboundOmission')}</option>
            </select>
          </div>

          {/* 버튼 그룹 - 오른쪽 끝 정렬 */}
          <div className="flex justify-end gap-2">
            <button 
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg text-sm shadow-sm transition flex items-center justify-center"
            >
              {t('inventoryChangeHistory.search.btnSearch')}
            </button>
            <button 
              className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-4 py-2 rounded-lg text-sm shadow-sm transition flex items-center gap-1"
            >
              <span className="text-sm">↓</span> {t('inventoryChangeHistory.search.btnExcel')}
            </button>
          </div>
        </div>
      </div>

      {/* 조회결과 박스 */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex-1 flex flex-col min-h-0 overflow-hidden p-4">
        {/* 테이블 영역 */}
        <div className="flex-1 overflow-auto border rounded-lg border-gray-200">
          <table className="w-full text-left text-sm border-collapse whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-600 font-medium sticky top-0 border-b border-gray-200">
              <tr>
                <th className="p-3 text-center font-semibold">{t('inventoryChangeHistory.table.adjNo')}</th>
                <th className="p-3 text-center font-semibold">{t('inventoryChangeHistory.table.adjDate')}</th>
                <th className="p-3 text-center font-semibold">{t('inventoryChangeHistory.table.productCode')}</th>
                <th className="p-3 text-center font-semibold">{t('inventoryChangeHistory.table.productName')}</th>
                <th className="p-3 text-center font-semibold">{t('inventoryChangeHistory.table.adjType')}</th>
                <th className="p-3 text-center font-semibold">{t('inventoryChangeHistory.table.adjReason')}</th>
                <th className="p-3 text-center font-semibold">{t('inventoryChangeHistory.table.adjQty')}</th>
                <th className="p-3 text-center font-semibold">{t('inventoryChangeHistory.table.beforeStock')}</th>
                <th className="p-3 text-center font-semibold">{t('inventoryChangeHistory.table.afterStock')}</th>
                <th className="p-3 text-center font-semibold">{t('inventoryChangeHistory.table.operator')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {adjustHistory.map((item, index) => (
                <tr 
                  key={index} 
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 text-center font-mono text-gray-600">{item.adjNo}</td>
                  <td className="p-3 text-center text-gray-600">{item.adjDate}</td>
                  <td className="p-3 text-center font-mono text-blue-600">{item.productCode}</td>
                  <td className="p-3 text-center font-medium text-gray-800">{item.productName}</td>
                  <td className="p-3 text-center text-gray-600">{t(`inventoryChangeHistory.search.${item.adjType}`)}</td>
                  <td className="p-3 text-center text-gray-600">{t(`inventoryChangeHistory.search.${item.reason}`)}</td>
                  <td className={`p-3 text-center ${getQuantityStyle(item.quantity)}`}>
                    {item.quantity > 0 ? `+${item.quantity}` : item.quantity}
                  </td>
                  <td className="p-3 text-center text-gray-600">{item.beforeStock.toLocaleString()}</td>
                  <td className="p-3 text-center font-medium text-gray-800">{item.afterStock.toLocaleString()}</td>
                  <td className="p-3 text-center text-gray-600">{item.operator}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center items-center gap-1 mt-4 shrink-0 text-sm">
          <button className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center bg-white text-gray-400 hover:bg-gray-50 hover:text-gray-600">
            ≪
          </button>
          <button className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center bg-white text-gray-400 hover:bg-gray-50 hover:text-gray-600">
            ＜
          </button>
          <button className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold">
            1
          </button>
          <button className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center bg-white text-gray-400 hover:bg-gray-50 hover:text-gray-600">
            ＞
          </button>
          <button className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center bg-white text-gray-400 hover:bg-gray-50 hover:text-gray-600">
            ≫
          </button>
        </div>
      </div>
    </div>
  );
}