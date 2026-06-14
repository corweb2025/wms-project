// pages/system/LocationManage.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Pencil, Trash2, Warehouse, MapPin, Grid3X3 } from 'lucide-react';

export default function LocationManage() {
  const { t } = useTranslation();
  
  // 샘플 데이터 - 창고 목록
  const warehouses = [
    { id: 1, name: 'Almacén principal', code: 'W01', type: 'General' },
    { id: 2, name: 'Centro logístico 2', code: 'W02', type: 'Refrigerado' },
  ];

  // 샘플 데이터 - 구역 목록 (창고별)
  const zones = [
    { id: 1, warehouseId: 1, name: 'Zona A (Electrónica)', locationCount: 3 },
    { id: 2, warehouseId: 1, name: 'Zona B (Accesorios)', locationCount: 2 },
    { id: 3, warehouseId: 2, name: 'Zona C (Alimentos)', locationCount: 5 },
  ];

  // 샘플 데이터 - 로케이션 목록 (구역별)
  const locations = [
    { id: 1, zoneId: 1, code: 'A-01-01', capacity: 1000, currentUsage: 850, usageRate: 85 },
    { id: 2, zoneId: 1, code: 'A-01-02', capacity: 1000, currentUsage: 400, usageRate: 40 },
    { id: 3, zoneId: 1, code: 'A-02-01', capacity: 500, currentUsage: 100, usageRate: 20 },
    { id: 4, zoneId: 2, code: 'B-01-01', capacity: 800, currentUsage: 600, usageRate: 75 },
    { id: 5, zoneId: 2, code: 'B-02-01', capacity: 600, currentUsage: 100, usageRate: 17 },
  ];

  // 상태 관리
  const [selectedWarehouse, setSelectedWarehouse] = useState(warehouses[0]);
  const [selectedZone, setSelectedZone] = useState(zones[0]);

  // 선택된 창고의 구역 필터링
  const filteredZones = zones.filter(z => z.warehouseId === selectedWarehouse.id);
  
  // 선택된 구역의 로케이션 필터링
  const filteredLocations = locations.filter(l => l.zoneId === selectedZone.id);

  // 사용률에 따른 색상 반환
  const getUsageColor = (rate) => {
    if (rate >= 80) return 'bg-orange-500';
    if (rate >= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // 창고 변경 시 첫 번째 구역 자동 선택
  const handleWarehouseClick = (warehouse) => {
    setSelectedWarehouse(warehouse);
    const firstZone = zones.find(z => z.warehouseId === warehouse.id);
    if (firstZone) setSelectedZone(firstZone);
  };

  return (
    <div className="p-4 flex flex-col gap-4 text-sm text-gray-700 h-full w-full">
      {/* 헤더 */}
      <div className="flex items-center gap-2 text-lg text-gray-400 font-medium shrink-0 py-1 select-none">
        <span className="text-gray-500">⚙️ {t('codeManage.breadcrumb')}</span>
        <span className="text-gray-300 font-light">{'>'}</span>
        <span className="text-slate-800 font-bold">{t('locationManage.title')}</span>
      </div>

      {/* 3단 메인 컨텐츠 */}
      <div className="flex gap-4 flex-1 min-h-0">
        
        {/* 1단: 창고 목록 */}
        <div className="w-1/4 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-gray-800">
              <Warehouse size={18} />
              <span>{t('locationManage.warehouse.title')}</span>
            </div>
            <button className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition">
              <Plus size={16} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {warehouses.map((wh) => (
              <div
                key={wh.id}
                onClick={() => handleWarehouseClick(wh)}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedWarehouse.id === wh.id
                    ? 'border-blue-500 bg-blue-50/50 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="font-semibold text-gray-800 mb-1">{wh.name}</div>
                <div className="text-xs text-gray-500 flex items-center justify-between">
                  <span>{t('locationManage.warehouse.code')}: {wh.code}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                    wh.type === '일반' ? 'bg-gray-100 text-gray-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {wh.type === '일반' ? t('locationManage.warehouse.general') : t('locationManage.warehouse.cold')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2단: 구역(Zone) 목록 */}
        <div className="w-1/4 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-gray-800">
              <MapPin size={18} />
              <span>{t('locationManage.zone.title')}</span>
            </div>
            <button className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition">
              <Plus size={16} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {filteredZones.length > 0 ? (
              filteredZones.map((zone) => (
                <div
                  key={zone.id}
                  onClick={() => setSelectedZone(zone)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all relative group ${
                    selectedZone.id === zone.id
                      ? 'border-blue-500 bg-blue-50/50 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-gray-800 mb-1">{zone.name}</div>
                      <div className="text-xs text-gray-500">
                        {t('locationManage.zone.locationCount')}: {zone.locationCount}{t('locationManage.location.locations')}
                      </div>
                    </div>
                    {selectedZone.id === zone.id && (
                      <div className="flex gap-1">
                        <button className="p-1 text-gray-400 hover:text-blue-600 transition">
                          <Pencil size={14} />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-600 transition">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-400 px-2 py-6 text-center">
                {t('locationManage.zone.noZones')}
              </div>
            )}
          </div>
        </div>

        {/* 3단: 로케이션 관리 */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Grid3X3 size={18} className="text-gray-700" />
              <span className="font-bold text-gray-800">{t('locationManage.location.title')}</span>
              <span className="text-sm text-gray-500">({selectedZone.name})</span>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition">
                {t('locationManage.location.batchCreate')}
              </button>
              <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm flex items-center gap-1 transition">
                <Plus size={16} />
                {t('locationManage.location.addLocation')}
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto p-4">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                <tr>
                  <th className="p-3 text-center">{t('locationManage.location.code')}</th>
                  <th className="p-3 text-center">{t('locationManage.location.capacity')}</th>
                  <th className="p-3 text-center">{t('locationManage.location.currentUsage')}</th>
                  <th className="p-3 text-center">{t('locationManage.location.usageRate')}</th>
                  <th className="p-3 text-center">{t('locationManage.location.actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLocations.length > 0 ? (
                  filteredLocations.map((loc) => (
                    <tr key={loc.id} className="hover:bg-gray-50">
                      <td className="p-3 text-center font-mono font-semibold text-blue-600">
                        {loc.code}
                      </td>
                      <td className="p-3 text-center text-gray-700">
                        {loc.capacity.toLocaleString()}
                      </td>
                      <td className="p-3 text-center text-gray-700">
                        {loc.currentUsage.toLocaleString()}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${getUsageColor(loc.usageRate)}`}
                              style={{ width: `${Math.min(loc.usageRate, 100)}%` }}
                            ></div>
                          </div>
                          <span className="w-10 text-right text-xs font-medium text-gray-600">
                            {loc.usageRate}%
                          </span>
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition">
                            <Pencil size={16} />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-10 text-center text-gray-400">
                      {t('locationManage.location.selectZone')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}