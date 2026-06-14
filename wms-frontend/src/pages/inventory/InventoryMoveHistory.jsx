// pages/inventory/InventoryMoveHistory.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function InventoryMoveHistory() {
  const { t } = useTranslation();
  
  // 샘플 데이터 - 재고 이동 내역
  const [moveHistory] = useState([
    { 
      moveDate: '2024-05-07', 
      moveType: 'locationMove', 
      productCode: 'A-001', 
      productName: 'Producto 1', 
      quantity: 100, 
      fromLocation: 'A-01-01', 
      toLocation: 'A-02-03', 
      operator: 'Daniel'
    },
    { 
      moveDate: '2024-05-07', 
      moveType: 'locationMove', 
      productCode: 'A-002', 
      productName: 'Producto 2', 
      quantity: 50, 
      fromLocation: 'B-01-01', 
      toLocation: 'B-03-02', 
      operator: 'Susana'
    },
    { 
      moveDate: '2024-05-06', 
      moveType: 'adjustment', 
      productCode: 'A-003', 
      productName: 'Producto 3', 
      quantity: -20, 
      fromLocation: 'C-01-02', 
      toLocation: '-', 
      operator: 'piter'
    },
    { 
      moveDate: '2024-05-06', 
      moveType: 'locationMove', 
      productCode: 'A-004', 
      productName: 'Producto 4', 
      quantity: 80, 
      fromLocation: 'D-02-01', 
      toLocation: 'D-03-01', 
      operator: 'Jecica'
    },
    { 
      moveDate: '2024-05-05', 
      moveType: 'adjustment', 
      productCode: 'A-005', 
      productName: 'Producto 5', 
      quantity: 10, 
      fromLocation: 'E-01-01', 
      toLocation: '-', 
      operator: 'Daniel'
    },
  ]);

  // 검색 조건 상태
  const [searchParams, setSearchParams] = useState({
    startDate: '2024-05-01',
    endDate: '2024-05-07',
    keyword: '',
    warehouse: 'all',
    moveType: 'all'
  });

  const handleSearch = () => {
    console.log('검색:', searchParams);
  };

  const handleReset = () => {
    setSearchParams({
      startDate: '',
      endDate: '',
      keyword: '',
      warehouse: 'all',
      moveType: 'all'
    });
  };

  // 이동구분에 따른 뱃지 스타일
  const getMoveTypeStyle = (type) => {
    switch(type) {
      case 'locationMove':
        return 'bg-blue-100 text-blue-700';
      case 'adjustment':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // 수량에 따른 색상 (음수는 빨간색)
  const getQuantityStyle = (qty) => {
    return qty < 0 ? 'text-red-500 font-semibold' : 'font-semibold text-gray-800';
  };

  return (
    <div className="p-4 flex flex-col gap-4 text-sm text-gray-700 min-h-0 h-full w-full">
      
      {/* 브레드크럼 */}
      <div className="flex items-center gap-2 text-lg text-gray-400 font-medium shrink-0 py-1 select-none">
        <span className="text-gray-500">📦 {t('sidebar.inventoryManagement')}</span>
        <span className="text-gray-300 font-light"> {'>'} </span>
        <span className="text-slate-800 font-bold">{t('inventoryMoveHistory.title')}</span>
      </div>

      {/* 조회조건 박스 */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm shrink-0">
        <div className="grid grid-cols-6 gap-3 items-end">
          {/* 조회기간 */}
          <div className="col-span-2">
            <label className="block text-xs text-gray-500 font-medium mb-1.5">{t('inventoryMoveHistory.search.period')}</label>
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
            <label className="block text-xs text-gray-500 font-medium mb-1.5">{t('inventoryMoveHistory.search.keyword')}</label>
            <input 
              type="text" 
              placeholder={t('inventoryMoveHistory.search.keyword')}
              value={searchParams.keyword}
              onChange={(e) => setSearchParams({...searchParams, keyword: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
            />
          </div>

          {/* 창고 */}
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-1.5">{t('inventoryMoveHistory.search.warehouse')}</label>
            <select 
              value={searchParams.warehouse}
              onChange={(e) => setSearchParams({...searchParams, warehouse: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">{t('inventoryMoveHistory.search.all')}</option>
              <option value="warehouseA">{t('inventoryMoveHistory.search.warehouseA')}</option>
              <option value="warehouseB">{t('inventoryMoveHistory.search.warehouseB')}</option>
            </select>
          </div>

          {/* 이동구분 */}
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-1.5">{t('inventoryMoveHistory.search.moveType')}</label>
            <select 
              value={searchParams.moveType}
              onChange={(e) => setSearchParams({...searchParams, moveType: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">{t('inventoryMoveHistory.search.all')}</option>
              <option value="locationMove">{t('inventoryMoveHistory.search.locationMove')}</option>
              <option value="adjustment">{t('inventoryMoveHistory.search.adjustment')}</option>
            </select>
          </div>

          {/* 버튼 그룹 - 오른쪽 끝 정렬 */}
          <div className="flex justify-end gap-2">
            <button 
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg text-sm shadow-sm transition flex items-center justify-center"
            >
              {t('inventoryMoveHistory.search.btnSearch')}
            </button>
            <button 
              onClick={handleReset}
              className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-4 py-2 rounded-lg text-sm shadow-sm transition flex items-center gap-1"
            >
              <span className="text-sm">↓</span> {t('inventoryMoveHistory.search.btnExcel')}
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
                <th className="p-3 text-center font-semibold">{t('inventoryMoveHistory.table.moveDate')}</th>
                <th className="p-3 text-center font-semibold">{t('inventoryMoveHistory.table.moveType')}</th>
                <th className="p-3 text-center font-semibold">{t('inventoryMoveHistory.table.productCode')}</th>
                <th className="p-3 text-center font-semibold">{t('inventoryMoveHistory.table.productName')}</th>
                <th className="p-3 text-center font-semibold">{t('inventoryMoveHistory.table.quantity')}</th>
                <th className="p-3 text-center font-semibold">{t('inventoryMoveHistory.table.fromLocation')}</th>
                <th className="p-3 text-center font-semibold">{t('inventoryMoveHistory.table.toLocation')}</th>
                <th className="p-3 text-center font-semibold">{t('inventoryMoveHistory.table.operator')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {moveHistory.map((item, index) => (
                <tr 
                  key={index} 
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 text-center text-gray-600">{item.moveDate}</td>
                  <td className="p-3 text-center">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getMoveTypeStyle(item.moveType)}`}>
                      {t(`inventoryMoveHistory.search.${item.moveType}`)}
                    </span>
                  </td>
                  <td className="p-3 text-center font-mono text-blue-600">{item.productCode}</td>
                  <td className="p-3 text-center font-medium text-gray-800">{item.productName}</td>
                  <td className={`p-3 text-center ${getQuantityStyle(item.quantity)}`}>
                    {item.quantity > 0 ? `+${item.quantity}` : item.quantity}
                  </td>
                  <td className="p-3 text-center font-mono text-gray-600">{item.fromLocation}</td>
                  <td className="p-3 text-center font-mono text-gray-600">{item.toLocation}</td>
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