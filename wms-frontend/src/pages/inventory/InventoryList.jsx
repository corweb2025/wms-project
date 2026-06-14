// pages/inventory/InventoryList.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function InventoryList() {
  const { t } = useTranslation();
  
  // 샘플 데이터 - 재고 목록
  const [inventories] = useState([
    { 
      code: 'A-001', 
      name: 'A-001 Producto 1', 
      spec: 'Especificación 1', 
      unit: 'EA', 
      currentStock: 150, 
      availableStock: 120,
      safetyStock: 100, 
      location: 'A-01-01', 
      status: 'normal',
      barcode: '8801234567890'
    },
    { 
      code: 'B-002', 
      name: 'B-002 Producto 2', 
      spec: 'Especificación 1', 
      unit: 'EA', 
      currentStock: 80, 
      availableStock: 70,
      safetyStock: 80, 
      location: 'B-02-01', 
      status: 'normal',
      barcode: '8801234567891'
    },
    { 
      code: 'C-003', 
      name: 'C-003 Producto 3', 
      spec: 'Especificación 1', 
      unit: 'EA', 
      currentStock: 30, 
      availableStock: 20,
      safetyStock: 50, 
      location: 'C-01-02', 
      status: 'caution',
      barcode: '8801234567892'
    },
    { 
      code: 'D-004', 
      name: 'D-004 Producto 4', 
      spec: 'Especificación 1', 
      unit: 'EA', 
      currentStock: 20, 
      availableStock: 10,
      safetyStock: 30, 
      location: 'D-02-01', 
      status: 'shortage',
      barcode: '8801234567893'
    },
    { 
      code: 'E-005', 
      name: 'E-005 Producto 5', 
      spec: 'Especificación 1', 
      unit: 'EA', 
      currentStock: 10, 
      availableStock: 5,
      safetyStock: 20, 
      location: 'E-01-01', 
      status: 'shortage',
      barcode: '8801234567894'
    },
  ]);

  // 현재 선택된 재고 상세 정보 상태
  const [selectedInventory, setSelectedInventory] = useState(inventories[0]);
  
  // 검색 조건 상태
  const [searchParams, setSearchParams] = useState({
    receiptDate: 'all',
    category: 'all',
    keyword: ''
  });

  const handleSearch = () => {
    console.log('검색:', searchParams);
  };

  // 재고 상태에 따른 스타일 반환
  const getStatusStyle = (status) => {
    switch(status) {
      case 'normal':
        return 'text-green-600 font-medium';
      case 'caution':
        return 'text-amber-500 font-medium';
      case 'shortage':
        return 'text-red-500 font-medium';
      default:
        return 'text-gray-600';
    }
  };

  // 재고 상태에 따른 점 색상 반환
  const getStatusDot = (status) => {
    switch(status) {
      case 'normal':
        return 'bg-green-500';
      case 'caution':
        return 'bg-amber-500';
      case 'shortage':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4 text-sm text-gray-700 min-h-0 h-full w-full">
      
      {/* 브레드크럼 */}
      <div className="flex items-center gap-2 text-lg text-gray-400 font-medium shrink-0 py-1 select-none">
        <span className="text-gray-500">📦 {t('sidebar.inventoryManagement')}</span>
        <span className="text-gray-300 font-light"> {'>'} </span>
        <span className="text-slate-800 font-bold">{t('inventoryList.title')}</span>
      </div>

      <div className="flex gap-4 flex-1 min-h-0 w-full">
        {/* 왼쪽 메인 영역 */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          
          {/* 검색 필터 */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm shrink-0">
            <div className="flex gap-3 items-center">
              {/* 입고일자 */}
              <select 
                value={searchParams.receiptDate}
                onChange={(e) => setSearchParams({...searchParams, receiptDate: e.target.value})}
                className="w-32 border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">{t('inventoryList.search.all')}</option>
                <option value="last7Days">{t('inventoryList.search.last7Days')}</option>
                <option value="last30Days">{t('inventoryList.search.last30Days')}</option>
              </select>

              {/* 상품분류 */}
              <select 
                value={searchParams.category}
                onChange={(e) => setSearchParams({...searchParams, category: e.target.value})}
                className="w-32 border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">{t('inventoryList.search.categoryAll')}</option>
                <option value="electronics">{t('inventoryList.search.electronics')}</option>
                <option value="peripherals">{t('inventoryList.search.peripherals')}</option>
              </select>

              {/* 검색어 */}
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  placeholder={t('inventoryList.search.keyword')}
                  value={searchParams.keyword}
                  onChange={(e) => setSearchParams({...searchParams, keyword: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                />
              </div>

              {/* 버튼 그룹 */}
              <button 
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg text-sm shadow-sm transition flex items-center justify-center min-w-[80px]"
              >
                {t('inventoryList.search.btnSearch')}
              </button>
              
              <button 
                className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-4 py-2 rounded-lg text-sm shadow-sm transition flex items-center gap-1"
              >
                <span className="text-sm">↓</span> {t('inventoryList.search.btnExcel')}
              </button>
            </div>
          </div>

          {/* 테이블 영역 */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex-1 flex flex-col min-h-0 overflow-hidden">
            {/* 테이블 */}
            <div className="flex-1 overflow-auto border rounded-lg border-gray-200">
              <table className="w-full text-left text-sm border-collapse whitespace-nowrap">
                <thead className="bg-gray-50 text-gray-600 font-medium sticky top-0 border-b border-gray-200">
                  <tr>
                    <th className="p-3 text-center font-semibold">{t('inventoryList.fields.code')}</th>
                    <th className="p-3 text-center font-semibold">{t('inventoryList.fields.name')}</th>
                    <th className="p-3 text-center font-semibold">{t('inventoryList.fields.spec')}</th>
                    <th className="p-3 text-center font-semibold">{t('inventoryList.fields.unit')}</th>
                    <th className="p-3 text-center font-semibold">{t('inventoryList.fields.currentStock')}</th>
                    <th className="p-3 text-center font-semibold">{t('inventoryList.fields.availableStock')}</th>
                    <th className="p-3 text-center font-semibold">{t('inventoryList.fields.safetyStock')}</th>
                    <th className="p-3 text-center font-semibold">{t('inventoryList.fields.location')}</th>
                    <th className="p-3 text-center font-semibold">{t('inventoryList.fields.status')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {inventories.map((item) => {
                    const isSelected = selectedInventory?.code === item.code;
                    return (
                      <tr 
                        key={item.code} 
                        onClick={() => setSelectedInventory(item)}
                        className={`hover:bg-blue-50/50 cursor-pointer transition-colors ${isSelected ? 'bg-blue-50 hover:bg-blue-50' : ''}`}
                      >
                        <td className="p-3 text-center font-mono text-blue-600">{item.code}</td>
                        <td className="p-3 text-center font-medium text-gray-800">{item.name}</td>
                        <td className="p-3 text-center text-gray-600">{item.spec}</td>
                        <td className="p-3 text-center text-gray-600">{item.unit}</td>
                        <td className="p-3 text-center font-semibold text-gray-800">{item.currentStock.toLocaleString()}</td>
                        <td className="p-3 text-center text-gray-600">{item.availableStock.toLocaleString()}</td>
                        <td className="p-3 text-center text-gray-600">{item.safetyStock.toLocaleString()}</td>
                        <td className="p-3 text-center font-mono text-gray-600 bg-gray-50/50">{item.location}</td>
                        <td className="p-3 text-center">
                          <span className={getStatusStyle(item.status)}>
                            {t(`inventoryList.status.${item.status}`)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* 페이지네이션 및 범례 */}
            <div className="flex justify-between items-center mt-4 shrink-0 text-sm">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span> {t('inventoryList.legend.normal')}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span> {t('inventoryList.legend.caution')}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span> {t('inventoryList.legend.shortage')}
                </span>
              </div>
              
              <div className="flex justify-center items-center gap-1">
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
              
              <div className="w-32"></div> {/* 우측 정렬 맞춤용 */}
            </div>
          </div>
        </div>

        {/* 오른쪽 상세 패널 */}
        <div className="w-80 bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col shrink-0 h-full overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-base font-bold text-gray-800 mb-4">{t('inventoryList.detailTitle')}</h3>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-500">{t('inventoryList.fields.code')}</span>
                <span className="font-mono font-medium text-gray-800">{selectedInventory?.code}</span>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-500">{t('inventoryList.fields.name')}</span>
                <span className="font-medium text-gray-800 text-right max-w-[160px] truncate">{selectedInventory?.name}</span>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-500">{t('inventoryList.fields.spec')}</span>
                <span className="text-gray-800">{selectedInventory?.spec}</span>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-500">{t('inventoryList.fields.unit')}</span>
                <span className="text-gray-800">{selectedInventory?.unit}</span>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-500">{t('inventoryList.fields.currentStock')}</span>
                <span className="font-semibold text-gray-800">{selectedInventory?.currentStock?.toLocaleString()} EA</span>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-500">{t('inventoryList.fields.availableStock')}</span>
                <span className="font-semibold text-gray-800">{selectedInventory?.availableStock?.toLocaleString()} EA</span>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-gray-100">
                <span className="text-gray-500">{t('inventoryList.fields.safetyStock')}</span>
                <span className="text-gray-800">{selectedInventory?.safetyStock?.toLocaleString()} EA</span>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-500">{t('inventoryList.fields.location')}</span>
                <span className="font-mono text-gray-700 bg-gray-50 px-2 py-0.5 rounded border border-gray-200/50">{selectedInventory?.location}</span>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-500">{t('inventoryList.fields.status')}</span>
                <span className={getStatusStyle(selectedInventory?.status)}>
                  {t(`inventoryList.status.${selectedInventory?.status}`)}
                </span>
              </div>
            </div>

            {/* 바코드 영역 */}
            <div className="mt-6 border border-gray-200 rounded-lg p-4 bg-white flex flex-col items-center justify-center shadow-inner">
              <div className="w-full flex flex-col items-center gap-1.5">
                <div className="w-full h-14 flex justify-center items-center gap-[2px] bg-white overflow-hidden px-1">
                  {[2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 3].map((w, idx) => (
                    <span 
                      key={idx} 
                      className="bg-black h-full shrink-0" 
                      style={{ width: `${w}px`, opacity: idx % 3 === 0 ? 0.85 : 1 }} 
                    />
                  ))}
                </div>
                <p className="font-mono text-xs tracking-[3px] text-gray-500 mt-1">{selectedInventory?.barcode}</p>
              </div>
            </div>
          </div>

          {/* 하단 버튼 그룹 */}
          <div className="mt-auto pt-4 space-y-2">
            <div className="flex gap-2">
              <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 rounded-lg transition text-sm">
                {t('inventoryList.actions.adjust')}
              </button>
              <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 rounded-lg transition text-sm">
                {t('inventoryList.actions.move')}
              </button>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg shadow-sm transition text-sm flex items-center justify-center gap-2">
              <span>▌▌▌</span> {t('inventoryList.actions.printBarcode')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}