// pages/outbound/OutboundList.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Plus,
  Download,
  Search,
  RotateCcw,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from 'lucide-react';

const mockOutbounds = [
  {
    outboundNo: 'OUT-2024-0004',
    shippedAt: '2024-05-07 15:20',
    customer: 'Cliente A',
    productName: 'A-001 Producto 1',
    qty: 100,
    location: 'A-01-01',
    status: 'completed',
    manager: 'Daniel',
    note: '-',
  },
  {
    outboundNo: 'OUT-2024-0003',
    shippedAt: '2024-05-07 10:30',
    customer: 'Cliente B',
    productName: 'B-002 Producto 2',
    qty: 80,
    location: 'B-02-01',
    status: 'completed',
    manager: 'Susana',
    note: 'Salida normal',
  },
  {
    outboundNo: 'OUT-2024-0002',
    shippedAt: '2024-05-06 16:00',
    customer: 'Cliente C',
    productName: 'C-003 Producto 3',
    qty: 50,
    location: 'C-01-02',
    status: 'completed',
    manager: 'Piter',
    note: '-',
  },
  {
    outboundNo: 'OUT-2024-0001',
    shippedAt: '2024-05-06 09:25',
    customer: 'Cliente D',
    productName: 'D-004 Producto 4',
    qty: 20,
    location: 'D-02-01',
    status: 'cancelled',
    manager: 'Jecica',
    note: '-',
  },
  {
    outboundNo: 'OUT-2024-0000',
    shippedAt: '2024-05-06 11:40',
    customer: 'Cliente E',
    productName: 'E-005 Producto 5',
    qty: 10,
    location: 'E-01-01',
    status: 'completed',
    manager: 'Daniel',
    note: 'Salida urgente',
  },
];

const initialFilters = {
  startDate: '2024-05-01',
  endDate: '2024-05-07',
  outboundNo: '',
  customer: 'all',
  status: 'all',
};

const getStatusBadgeClass = (status) => {
  if (status === 'completed') return 'bg-emerald-50 text-emerald-600';
  if (status === 'pending') return 'bg-amber-50 text-amber-600';
  if (status === 'cancelled') return 'bg-rose-50 text-rose-600';
  return 'bg-slate-100 text-slate-600';
};

export default function OutboundList() {
  const { t } = useTranslation();
  const nav = useNavigate();

  const [outbounds] = useState(mockOutbounds);
  const [searchForm, setSearchForm] = useState({ ...initialFilters });
  const [filters, setFilters] = useState({ ...initialFilters });
  const [page, setPage] = useState(1);
  const [selectedOutbound, setSelectedOutbound] = useState(mockOutbounds[0] || null);

  const pageSize = 10;

  const customerOptions = useMemo(() => {
    return ['all', ...Array.from(new Set(outbounds.map((item) => item.customer)))];
  }, [outbounds]);

  const statusOptions = ['all', 'completed', 'cancelled'];

  const filteredOutbounds = useMemo(() => {
    return outbounds.filter((item) => {
      const itemDate = item.shippedAt.slice(0, 10);

      if (filters.startDate && itemDate < filters.startDate) return false;
      if (filters.endDate && itemDate > filters.endDate) return false;
      if (
        filters.outboundNo &&
        !item.outboundNo.toLowerCase().includes(filters.outboundNo.toLowerCase())
      ) {
        return false;
      }
      if (filters.customer !== 'all' && item.customer !== filters.customer) return false;
      if (filters.status !== 'all' && item.status !== filters.status) return false;

      return true;
    });
  }, [outbounds, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredOutbounds.length / pageSize));

  useEffect(() => {
    setPage(1);
  }, [filters]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pagedOutbounds = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredOutbounds.slice(start, start + pageSize);
  }, [filteredOutbounds, page]);

  useEffect(() => {
    setSelectedOutbound((prev) => {
      if (!pagedOutbounds.length) return null;
      if (prev && pagedOutbounds.some((item) => item.outboundNo === prev.outboundNo)) return prev;
      return pagedOutbounds[0];
    });
  }, [pagedOutbounds]);

  const handleFormChange = (key, value) => {
    setSearchForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    setFilters({ ...searchForm });
  };

  const handleReset = () => {
    setSearchForm({ ...initialFilters });
    setFilters({ ...initialFilters });
  };

  const handleExcelDownload = () => {
    if (!filteredOutbounds.length) return;

    const headers = [
      t('outboundList.table.outboundNo'),
      t('outboundList.table.shippedAt'),
      t('outboundList.table.customer'),
      t('outboundList.table.productName'),
      t('outboundList.table.qty'),
      t('outboundList.table.location'),
      t('outboundList.table.status'),
      t('outboundList.table.manager'),
      t('outboundList.table.note'),
    ];

    const rows = filteredOutbounds.map((item) => [
      item.outboundNo,
      item.shippedAt,
      item.customer,
      item.productName,
      item.qty,
      item.location,
      t(`outboundList.status.${item.status}`),
      item.manager,
      item.note,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value ?? '').replace(/"/g, '""')}"`).join(',')
      )
      .join('\n');

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `출고목록_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 flex flex-col gap-4 text-sm text-gray-700 min-h-0 h-full w-full">
      
      {/* 상단 타이틀 */}
      <div className="flex items-center gap-2 text-lg text-gray-400 font-medium shrink-0 py-1 select-none">
        <span className="text-gray-500">📦 {t('sidebar.outboundManagement')}</span>
        <span className="text-gray-300 font-light"> {'>'} </span>
        <span className="text-slate-800 font-bold">{t('outboundList.title')}</span>
      </div>

      {/* 검색 필터 */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-3 items-end shrink-0">
        <div className="xl:col-span-4">
          <label className="block text-xs text-gray-400 font-medium mb-1">{t('outboundList.search.dateRange')}</label>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={searchForm.startDate}
              onChange={(e) => handleFormChange('startDate', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-500"
            />
            <span className="text-gray-400 shrink-0">~</span>
            <input
              type="date"
              value={searchForm.endDate}
              onChange={(e) => handleFormChange('endDate', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="xl:col-span-2">
          <label className="block text-xs text-gray-400 font-medium mb-1">{t('outboundList.search.outboundNo')}</label>
          <input
            type="text"
            placeholder={t('outboundList.search.placeholder')}
            value={searchForm.outboundNo}
            onChange={(e) => handleFormChange('outboundNo', e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="xl:col-span-2">
          <label className="block text-xs text-gray-400 font-medium mb-1">{t('outboundList.search.customer')}</label>
          <select
            value={searchForm.customer}
            onChange={(e) => handleFormChange('customer', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-500"
          >
            {customerOptions.map((item) => (
              <option key={item} value={item}>
                {item === 'all' ? t('common.all') : item}
              </option>
            ))}
          </select>
        </div>

        <div className="xl:col-span-2">
          <label className="block text-xs text-gray-400 font-medium mb-1">{t('outboundList.search.status')}</label>
          <select
            value={searchForm.status}
            onChange={(e) => handleFormChange('status', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-500"
          >
            {statusOptions.map((item) => (
              <option key={item} value={item}>
                {item === 'all' ? t('common.all') : t(`outboundList.status.${item}`)}
              </option>
            ))}
          </select>
        </div>

        <div className="xl:col-span-2 flex justify-end gap-2">
          <button
            type="button"
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-sm transition flex items-center gap-1.5"
          >
            <Search size={15} />
            {t('outboundList.actions.search')}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-4 py-2 rounded-lg transition flex items-center gap-1.5"
          >
            <RotateCcw size={15} />
            {t('outboundList.actions.reset')}
          </button>
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="flex gap-2 shrink-0">
        <button
          type="button"
          onClick={() => nav('/obd/outboundregist')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition flex items-center gap-1.5"
        >
          <Plus size={16} />
          {t('outboundList.actions.register')}
        </button>

        <button
          type="button"
          onClick={handleExcelDownload}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition flex items-center gap-1.5"
        >
          <Download size={16} />
          {t('outboundList.actions.excelDownload')}
        </button>
      </div>

      {/* 하단 메인 영역 */}
      <div className="flex gap-4 flex-1 min-h-0 w-full xl:flex-row flex-col">
        {/* 좌측 리스트 */}
        <div className="flex-1 bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col min-h-0">
          <div className="flex-1 overflow-auto border rounded-lg border-gray-100">
            <table className="w-full text-left text-sm border-collapse whitespace-nowrap">
              <thead className="bg-gray-50/80 text-gray-500 font-medium sticky top-0 z-10 border-b border-gray-100">
                <tr>
                  <th className="p-3.5">{t('outboundList.table.outboundNo')}</th>
                  <th className="p-3.5">{t('outboundList.table.shippedAt')}</th>
                  <th className="p-3.5">{t('outboundList.table.customer')}</th>
                  <th className="p-3.5">{t('outboundList.table.productName')}</th>
                  <th className="p-3.5 text-right">{t('outboundList.table.qty')}</th>
                  <th className="p-3.5">{t('outboundList.table.location')}</th>
                  <th className="p-3.5 text-center">{t('outboundList.table.status')}</th>
                  <th className="p-3.5">{t('outboundList.table.manager')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-600">
                {pagedOutbounds.length > 0 ? (
                  pagedOutbounds.map((item) => {
                    const isSelected = selectedOutbound?.outboundNo === item.outboundNo;

                    return (
                      <tr
                        key={item.outboundNo}
                        onClick={() => setSelectedOutbound(item)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-blue-50/70 hover:bg-blue-50' : 'hover:bg-slate-50/80'
                        }`}
                      >
                        <td className="p-3.5 font-mono text-gray-800">{item.outboundNo}</td>
                        <td className="p-3.5 text-gray-600">{item.shippedAt}</td>
                        <td className="p-3.5 text-gray-600">{item.customer}</td>
                        <td className="p-3.5 text-gray-700 font-medium">{item.productName}</td>
                        <td className="p-3.5 text-right font-semibold text-slate-800">
                          {item.qty.toLocaleString()}
                        </td>
                        <td className="p-3.5 text-gray-600">{item.location}</td>
                        <td className="p-3.5 text-center">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${getStatusBadgeClass(
                              item.status
                            )}`}
                          >
                            {t(`outboundList.status.${item.status}`)}
                          </span>
                        </td>
                        <td className="p-3.5 text-gray-600">{item.manager}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-400">
                      {t('outboundList.noData')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 페이지네이션 */}
          <div className="flex justify-center items-center gap-1.5 mt-4 shrink-0 text-sm">
            <button
              type="button"
              onClick={() => setPage(1)}
              disabled={page === 1}
              className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center bg-white text-gray-400 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronsLeft size={14} />
            </button>
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1}
              className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center bg-white text-gray-400 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={14} />
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setPage(num)}
                className={`w-8 h-8 rounded flex items-center justify-center font-semibold transition ${
                  page === num
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-200 bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                {num}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={page === totalPages}
              className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center bg-white text-gray-400 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight size={14} />
            </button>
            <button
              type="button"
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
              className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center bg-white text-gray-400 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronsRight size={14} />
            </button>
          </div>
        </div>

        {/* 우측 상세 */}
        <div className="w-full xl:w-80 bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between shrink-0">
          <div>
            <div className="border-b border-gray-100 pb-3 mb-4">
              <h3 className="text-xl font-bold text-gray-900">{t('outboundList.detailTitle')}</h3>
            </div>

            {selectedOutbound ? (
              <div className="space-y-5 text-sm">
                <div className="flex justify-between items-center gap-4">
                  <span className="text-gray-400">{t('outboundList.table.outboundNo')}</span>
                  <span className="font-mono text-gray-800">{selectedOutbound.outboundNo}</span>
                </div>

                <div className="flex justify-between items-center gap-4">
                  <span className="text-gray-400">{t('outboundList.table.shippedAt')}</span>
                  <span className="text-gray-700">{selectedOutbound.shippedAt}</span>
                </div>

                <div className="flex justify-between items-center gap-4">
                  <span className="text-gray-400">{t('outboundList.table.customer')}</span>
                  <span className="text-gray-700">{selectedOutbound.customer}</span>
                </div>

                <div className="flex justify-between items-center gap-4">
                  <span className="text-gray-400">{t('outboundList.table.manager')}</span>
                  <span className="text-gray-700">{selectedOutbound.manager}</span>
                </div>

                <div className="flex justify-between items-center gap-4">
                  <span className="text-gray-400">{t('outboundList.table.status')}</span>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${getStatusBadgeClass(
                      selectedOutbound.status
                    )}`}
                  >
                    {t(`outboundList.status.${selectedOutbound.status}`)}
                  </span>
                </div>

                <div className="flex justify-between items-start gap-4">
                  <span className="text-gray-400">{t('outboundList.table.note')}</span>
                  <span className="text-gray-700 text-right">{selectedOutbound.note || '-'}</span>
                </div>
              </div>
            ) : (
              <div className="py-16 text-center text-gray-400">{t('outboundList.selectMessage')}</div>
            )}
          </div>

          <div className="pt-6 mt-6 border-t border-gray-100">
            <button
              type="button"
              disabled={!selectedOutbound}
              onClick={() =>
                nav('/obd/outboundregist', {
                  state: {
                    mode: 'detail',
                    data: selectedOutbound,
                  },
                })
              }
              className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('outboundList.actions.detail')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}