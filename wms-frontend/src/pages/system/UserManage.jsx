// pages/system/UserManage.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function UserManage() {
  const { t } = useTranslation();
  
  const [users] = useState([
    { 
      id: '1001', name: 'Daniel', username: 'hong', dept: 'Sales', 
      role: 'admin', isUse: 'use', email: 'hong@wms.com',
      phone: '010-1234-5678', joinDate: '2022.03.15', lastLogin: '2025-06-12 09:15'
    },
    { 
      id: '1002', name: 'Jecica', username: 'kim', dept: 'Logistics', 
      role: 'inbound', isUse: 'use', email: 'kim@wms.com',
      phone: '010-2345-6789', joinDate: '2023.01.10', lastLogin: '2025-06-11 14:30'
    },
    { 
      id: '1003', name: 'Piter', username: 'lee', dept: 'Warehouse', 
      role: 'outbound', isUse: 'use', email: 'lee@wms.com',
      phone: '010-3456-7890', joinDate: '2022.11.20', lastLogin: '2025-06-12 08:45'
    },
    { 
      id: '1004', name: 'Susana', username: 'park', dept: 'Support', 
      role: 'viewer', isUse: 'use', email: 'park@wms.com',
      phone: '010-4567-8901', joinDate: '2024.02.05', lastLogin: '2025-06-10 17:20'
    },
    { 
      id: '1005', name: 'Daniel', username: 'choi', dept: 'Admin', 
      role: 'admin', isUse: 'use', email: 'choi@wms.com',
      phone: '010-5678-9012', joinDate: '2021.08.12', lastLogin: '2025-06-12 10:05'
    },
  ]);

  const [selectedUser, setSelectedUser] = useState(users[0]);

  const roleColors = {
    'admin': 'bg-purple-100 text-purple-700',
    'inbound': 'bg-teal-100 text-teal-700',
    'outbound': 'bg-emerald-100 text-emerald-700',
    'viewer': 'bg-amber-100 text-amber-700',
  };

  return (
    <div className="p-4 flex flex-col gap-4 text-sm text-gray-700 min-h-0 h-full w-full">
      
      {/* 브레드크럼 */}
      <div className="flex items-center gap-2 text-lg text-gray-400 font-medium shrink-0 py-1 select-none">
        <span className="text-gray-500">⚙️ {t('userManage.breadcrumb')}</span>
        <span className="text-gray-300 font-light"> {'>'} </span>
        <span className="text-slate-800 font-bold">{t('userManage.title')}</span>
      </div>

      <div className="flex gap-4 flex-1 min-h-0 w-full items-start">
        {/* 왼쪽 메인 영역 */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          
          {/* 상단 검색 필터 */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm grid grid-cols-6 gap-3 shrink-0 items-end">
            <div>
              <label className="block text-xs text-gray-400 font-medium mb-1">{t('userManage.search.name')}</label>
              <input type="text" placeholder={t('userManage.search.name')} className="w-full border border-gray-300 rounded px-2.5 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 font-medium mb-1">{t('userManage.search.username')}</label>
              <input type="text" placeholder={t('userManage.search.username')} className="w-full border border-gray-300 rounded px-2.5 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 font-medium mb-1">{t('userManage.search.dept')}</label>
              <select className="w-full border border-gray-300 rounded px-2.5 py-2 text-sm bg-white focus:outline-none focus:border-blue-500">
                <option>{t('userManage.search.all')}</option>
                <option>Sales</option>
                <option>Logistics</option>
                <option>Warehouse</option>
                <option>Support</option>
                <option>Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 font-medium mb-1">{t('userManage.search.role')}</label>
              <select className="w-full border border-gray-300 rounded px-2.5 py-2 text-sm bg-white focus:outline-none focus:border-blue-500">
                <option>{t('userManage.search.all')}</option>
                <option>{t('userManage.roles.admin')}</option>
                <option>{t('userManage.roles.inbound')}</option>
                <option>{t('userManage.roles.outbound')}</option>
                <option>{t('userManage.roles.viewer')}</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 font-medium mb-1">{t('userManage.search.useYn')}</label>
              <select className="w-full border border-gray-300 rounded px-2.5 py-2 text-sm bg-white focus:outline-none focus:border-blue-500">
                <option>{t('userManage.search.all')}</option>
                <option>{t('userManage.status.use')}</option>
                <option>{t('userManage.status.unused')}</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button 
                type="button" 
                style={{ width: 'calc(33.333% + 20px)' }}
                className="bg-slate-700 hover:bg-slate-800 text-white font-semibold py-2 rounded text-sm shadow-sm transition flex items-center justify-center gap-1"
              >
                🔍 {t('userManage.search.search')}
              </button>
            </div>
          </div>

          {/* 테이블 영역 */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex-1 flex flex-col min-h-0 overflow-hidden">
            
            {/* 액션 버튼 */}
            <div className="flex gap-1.5 mb-4 shrink-0 text-sm">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded shadow-sm flex items-center gap-2">
                <Plus size={18} /> {t('userManage.actions.register')}
              </button>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded shadow-sm">📥 {t('userManage.actions.uploadExcel')}</button>
              <button className="border border-gray-300 hover:bg-gray-50 text-gray-600 font-medium px-4 py-2 rounded shadow-sm">📤 {t('userManage.actions.downloadExcel')}</button>
            </div>

            <div className="flex-1 overflow-auto border rounded-lg border-gray-100">
              <table className="w-full text-left text-sm border-collapse whitespace-nowrap">
                <thead className="bg-gray-50/70 text-gray-500 font-medium sticky top-0 border-b border-gray-100">
                  <tr>
                    <th className="p-3.5">{t('userManage.table.id')}</th>
                    <th className="p-3.5">{t('userManage.table.name')}</th>
                    <th className="p-3.5">{t('userManage.table.username')}</th>
                    <th className="p-3.5">{t('userManage.table.dept')}</th>
                    <th className="p-3.5">{t('userManage.table.role')}</th>
                    <th className="p-3.5 text-center">{t('userManage.table.useYn')}</th>
                    <th className="p-3.5 text-center">{t('userManage.table.manage')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-600">
                  {users.map((user) => {
                    const isSelected = selectedUser?.id === user.id;
                    return (
                      <tr 
                        key={user.id} 
                        onClick={() => setSelectedUser(user)}
                        className={`hover:bg-slate-50/80 cursor-pointer transition-colors ${isSelected ? 'bg-blue-50/50 hover:bg-blue-50' : ''}`}
                      >
                        <td className="p-3.5 font-mono font-semibold text-gray-800">{user.id}</td>
                        <td className="p-3.5 text-gray-700 font-medium">{user.name}</td>
                        <td className="p-3.5 text-gray-500 font-mono">{user.username}</td>
                        <td className="p-3.5 text-gray-500">{user.dept}</td>
                        <td className="p-3.5">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${roleColors[user.role]}`}>
                            {t(`userManage.roles.${user.role}`)}
                          </span>
                        </td>
                        <td className="p-3.5 text-center">
                          <span className={`${user.isUse === 'use' ? 'text-emerald-600' : 'text-gray-400'} font-medium`}>
                            {t(`userManage.status.${user.isUse}`)}
                          </span>
                        </td>
                        <td className="p-3.5 text-center space-x-3" onClick={(e) => e.stopPropagation()}>
                          <button className="text-blue-600 hover:text-blue-700">
                            <Edit2 size={16} />
                          </button>
                          <button className="text-rose-500 hover:text-rose-600">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* 페이지네이션 */}
            <div className="flex justify-center items-center gap-1.5 mt-4 shrink-0 text-sm">
              <button className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center bg-white text-gray-400 hover:bg-gray-50">◀</button>
              <button className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center text-white font-bold">1</button>
              <button className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center bg-white text-gray-400 hover:bg-gray-50">2</button>
              <button className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center bg-white text-gray-400 hover:bg-gray-50">▶</button>
            </div>
          </div>
        </div>

        {/* 오른쪽 상세 패널 */}
        <div className="w-80 bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col shrink-0 h-full overflow-y-auto">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-base font-bold text-gray-800">{t('userManage.detail.title')}</h3>
              <button className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
            </div>

            <div className="flex flex-col items-center pt-2">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl shadow-inner">
                👤
              </div>
              <h4 className="mt-3 text-xl font-bold text-gray-800">{selectedUser?.name}</h4>
              <p className="text-gray-500 font-mono">{t('userManage.table.id')} {selectedUser?.id}</p>
            </div>

            <div className="space-y-3 text-sm pt-2">
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-400">{t('userManage.detail.id')}</span>
                <span className="font-mono font-medium">{selectedUser?.username}</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-400">{t('userManage.detail.email')}</span>
                <span className="text-right">{selectedUser?.email}</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-400">{t('userManage.detail.phone')}</span>
                <span>{selectedUser?.phone}</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-400">{t('userManage.detail.dept')}</span>
                <span>{selectedUser?.dept}</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-400">{t('userManage.detail.role')}</span>
                <span className={`px-3 py-0.5 rounded-full text-xs font-bold ${roleColors[selectedUser?.role]}`}>
                  {t(`userManage.roles.${selectedUser?.role}`)}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-400">{t('userManage.detail.joinDate')}</span>
                <span>{selectedUser?.joinDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{t('userManage.detail.lastLogin')}</span>
                <span className="text-xs text-gray-500">{selectedUser?.lastLogin}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 border-t pt-6 mt-auto text-sm">
            <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2.5 rounded transition">
              {t('userManage.detail.edit')}
            </button>
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded shadow-sm transition">
              {t('userManage.detail.resetPassword')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}