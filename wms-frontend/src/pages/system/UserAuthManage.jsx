// pages/system/UserAuthManage.jsx
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

const roleList = [
  { code: 'ADMIN', name: 'ADMIN' },
  { code: 'WMS_MGR', name: 'WMS_MGR' },
  { code: 'INBOUND', name: 'INBOUND' },
  { code: 'OUTBOUND', name: 'OUTBOUND' },
  { code: 'VIEWER', name: 'VIEWER' },
];

const permissionColumns = [
  { key: 'view', label: '조회' },
  { key: 'create', label: '등록' },
  { key: 'update', label: '수정' },
  { key: 'remove', label: '삭제' },
  { key: 'approve', label: '승인' },
];

const initialPermissions = {
  ADMIN: [
    { menu: 'dashboard', view: true, create: true, update: false, remove: false, approve: false },
    { menu: 'productManagement', view: true, create: true, update: true, remove: true, approve: true },
    { menu: 'inboundManagement', view: true, create: true, update: true, remove: true, approve: true },
    { menu: 'outboundManagement', view: true, create: true, update: true, remove: true, approve: false },
    { menu: 'inventoryInquiry', view: true, create: true, update: true, remove: true, approve: false },
    { menu: 'barcodeManagement', view: true, create: true, update: true, remove: true, approve: true },
    { menu: 'reports', view: true, create: true, update: true, remove: true, approve: true },
    { menu: 'settings', view: true, create: true, update: true, remove: true, approve: true },
  ],
  WMS_MGR: [
    { menu: 'dashboard', view: true, create: false, update: false, remove: false, approve: false },
    { menu: 'productManagement', view: true, create: true, update: true, remove: false, approve: false },
    { menu: 'inboundManagement', view: true, create: true, update: true, remove: false, approve: true },
    { menu: 'outboundManagement', view: true, create: true, update: true, remove: false, approve: true },
    { menu: 'inventoryInquiry', view: true, create: false, update: true, remove: false, approve: false },
    { menu: 'barcodeManagement', view: true, create: true, update: false, remove: false, approve: false },
    { menu: 'reports', view: true, create: false, update: false, remove: false, approve: false },
    { menu: 'settings', view: false, create: false, update: false, remove: false, approve: false },
  ],
  INBOUND: [
    { menu: 'dashboard', view: true, create: false, update: false, remove: false, approve: false },
    { menu: 'productManagement', view: true, create: false, update: false, remove: false, approve: false },
    { menu: 'inboundManagement', view: true, create: true, update: true, remove: false, approve: true },
    { menu: 'outboundManagement', view: true, create: false, update: false, remove: false, approve: false },
    { menu: 'inventoryInquiry', view: true, create: false, update: true, remove: false, approve: false },
    { menu: 'barcodeManagement', view: true, create: true, update: false, remove: false, approve: false },
    { menu: 'reports', view: true, create: false, update: false, remove: false, approve: false },
    { menu: 'settings', view: false, create: false, update: false, remove: false, approve: false },
  ],
  OUTBOUND: [
    { menu: 'dashboard', view: true, create: false, update: false, remove: false, approve: false },
    { menu: 'productManagement', view: true, create: false, update: false, remove: false, approve: false },
    { menu: 'inboundManagement', view: true, create: false, update: false, remove: false, approve: false },
    { menu: 'outboundManagement', view: true, create: true, update: true, remove: false, approve: true },
    { menu: 'inventoryInquiry', view: true, create: false, update: true, remove: false, approve: false },
    { menu: 'barcodeManagement', view: true, create: true, update: false, remove: false, approve: false },
    { menu: 'reports', view: true, create: false, update: false, remove: false, approve: false },
    { menu: 'settings', view: false, create: false, update: false, remove: false, approve: false },
  ],
  VIEWER: [
    { menu: 'dashboard', view: true, create: false, update: false, remove: false, approve: false },
    { menu: 'productManagement', view: true, create: false, update: false, remove: false, approve: false },
    { menu: 'inboundManagement', view: true, create: false, update: false, remove: false, approve: false },
    { menu: 'outboundManagement', view: true, create: false, update: false, remove: false, approve: false },
    { menu: 'inventoryInquiry', view: true, create: false, update: false, remove: false, approve: false },
    { menu: 'barcodeManagement', view: false, create: false, update: false, remove: false, approve: false },
    { menu: 'reports', view: true, create: false, update: false, remove: false, approve: false },
    { menu: 'settings', view: false, create: false, update: false, remove: false, approve: false },
  ],
};

export default function UserAuthManage() {
  const { t } = useTranslation();
  
  const [selectedRole, setSelectedRole] = useState('ADMIN');
  const [permissionMap, setPermissionMap] = useState(initialPermissions);

  const selectedPermissions = useMemo(() => {
    return permissionMap[selectedRole] || [];
  }, [permissionMap, selectedRole]);

  const handleTogglePermission = (rowIndex, key) => {
    setPermissionMap((prev) => ({
      ...prev,
      [selectedRole]: prev[selectedRole].map((row, index) =>
        index === rowIndex ? { ...row, [key]: !row[key] } : row
      ),
    }));
  };

  const handleSave = () => {
    alert(t('userAuthManage.actions.save'));
  };

  return (
    <div className="p-4 flex flex-col gap-4 text-sm text-gray-700 min-h-0 h-full w-full">
      {/* 브레드크럼 */}
      <div className="flex items-center gap-2 text-lg text-gray-400 font-medium shrink-0 py-1 select-none">
        <span className="text-gray-500">⚙️ {t('userAuthManage.breadcrumb')}</span>
        <span className="text-gray-300 font-light">{'>'}</span>
        <span className="text-slate-800 font-bold">{t('userAuthManage.title')}</span>
      </div>

      {/* 메인 카드 */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* 상단 탭/저장 버튼 */}
        <div className="flex items-center justify-between gap-4 border-b border-gray-200 pb-3 mb-4 shrink-0">
          <div className="flex items-center gap-6 text-sm">
            <span className="text-gray-500 font-medium">{t('userAuthManage.roleList')}</span>
            <span className="text-blue-600 font-bold border-b-2 border-blue-600 pb-2 -mb-[14px]">
              {t('userAuthManage.permissionSetting')} ({selectedRole})
            </span>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded text-sm shadow-sm transition"
          >
            {t('userAuthManage.actions.save')}
          </button>
        </div>

        {/* 본문 */}
        <div className="flex gap-4 flex-1 min-h-0 w-full">
          {/* 좌측 역할 목록 */}
          <div className="w-56 bg-white border border-gray-200 rounded-xl p-2 shrink-0 h-full overflow-y-auto">
            <div className="space-y-1">
              {roleList.map((role) => {
                const isSelected = selectedRole === role.code;
                return (
                  <button
                    key={role.code}
                    type="button"
                    onClick={() => setSelectedRole(role.code)}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${
                      isSelected
                        ? 'bg-blue-50 text-blue-600 font-bold'
                        : 'text-gray-600 hover:bg-slate-50'
                    }`}
                  >
                    {role.code}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 우측 권한 테이블 */}
          <div className="flex-1 min-w-0 border border-gray-200 rounded-xl overflow-auto">
            <table className="w-full text-left text-sm border-collapse whitespace-nowrap">
              <thead className="bg-gray-50/70 text-gray-500 font-medium sticky top-0 border-b border-gray-100 z-10">
                <tr>
                  <th className="p-3.5 min-w-[220px]">{t('userAuthManage.menus.dashboard')}</th>
                  {permissionColumns.map((column) => (
                    <th key={column.key} className="p-3.5 text-center min-w-[110px]">
                      {t(`userAuthManage.permissions.${column.key}`)}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 text-gray-600">
                {selectedPermissions.map((row, rowIndex) => (
                  <tr key={row.menu} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-semibold text-gray-800">
                      {t(`userAuthManage.menus.${row.menu}`)}
                    </td>

                    {permissionColumns.map((column) => (
                      <td key={column.key} className="p-3.5 text-center">
                        <input
                          type="checkbox"
                          checked={row[column.key]}
                          onChange={() => handleTogglePermission(rowIndex, column.key)}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}