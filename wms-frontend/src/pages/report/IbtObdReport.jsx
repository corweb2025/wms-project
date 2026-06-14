// pages/report/IbtObdReport.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Download, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

export default function IbtObdReport() {
  const { t } = useTranslation();
  
  // 검색 조건 상태
  const [searchParams, setSearchParams] = useState({
    startDate: '2024-05-01',
    endDate: '2024-05-07',
    warehouse: 'all',
    type: 'all'
  });

  // 샘플 데이터 - 일별 입출고 현황
  const dailyData = [
    { date: '2024-05-01', inQty: 850, outQty: 650, inAmount: 8500000, outAmount: 6500000, inCount: 12, outCount: 10 },
    { date: '2024-05-02', inQty: 1200, outQty: 900, inAmount: 12000000, outAmount: 9000000, inCount: 15, outCount: 13 },
    { date: '2024-05-03', inQty: 1500, outQty: 1100, inAmount: 15000000, outAmount: 11000000, inCount: 18, outCount: 15 },
    { date: '2024-05-04', inQty: 700, outQty: 800, inAmount: 7000000, outAmount: 8000000, inCount: 10, outCount: 11 },
    { date: '2024-05-05', inQty: 400, outQty: 380, inAmount: 4000000, outAmount: 3800000, inCount: 8, outCount: 7 },
    { date: '2024-05-06', inQty: 350, outQty: 320, inAmount: 3500000, outAmount: 3200000, inCount: 7, outCount: 6 },
    { date: '2024-05-07', inQty: 320, outQty: 150, inAmount: 3200000, outAmount: 1500000, inCount: 6, outCount: 4 },
  ];

  // 차트용 데이터
  const chartData = [
    { date: '05-01', inQty: 850, outQty: 650, inAmt: 8.5, outAmt: 6.5 },
    { date: '05-02', inQty: 1200, outQty: 900, inAmt: 12, outAmt: 9 },
    { date: '05-03', inQty: 1500, outQty: 1100, inAmt: 15, outAmt: 11 },
    { date: '05-04', inQty: 700, outQty: 800, inAmt: 7, outAmt: 8 },
    { date: '05-05', inQty: 400, outQty: 380, inAmt: 4, outAmt: 3.8 },
    { date: '05-06', inQty: 350, outQty: 320, inAmt: 3.5, outAmt: 3.2 },
    { date: '05-07', inQty: 320, outQty: 150, inAmt: 3.2, outAmt: 1.5 },
  ];

  const maxQty = 1600;
  const maxAmt = 16;

  const handleSearch = () => {
    console.log('조회:', searchParams);
  };

  // 숫자 포맷
  const formatNumber = (num) => num.toLocaleString();

  return (
    <div className="p-4 flex flex-col gap-4 text-sm text-gray-700 min-h-0 h-full w-full overflow-auto">
      {/* 브레드크럼 */}
      <div className="flex items-center gap-2 text-lg text-gray-400 font-medium shrink-0 py-1 select-none">
        <span className="text-gray-500">📦 {t('sidebar.reports')}</span>
        <span className="text-gray-300 font-light"> {'>'} </span>
        <span className="text-slate-800 font-bold">{t('ibtObdReport.title')}</span>
      </div>

      {/* 조회조건 박스 */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm shrink-0">
        <div className="grid grid-cols-5 gap-3 items-end">
          {/* 조회기간 */}
          <div className="col-span-1">
            <label className="block text-xs text-gray-500 font-medium mb-1.5">{t('ibtObdReport.search.period')}</label>
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-white">
              <Calendar size={16} className="text-gray-400" />
              <span className="text-sm text-gray-600">
                {searchParams.startDate} ~ {searchParams.endDate}
              </span>
            </div>
          </div>

          {/* 창고 */}
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-1.5">{t('ibtObdReport.search.warehouse')}</label>
            <select 
              value={searchParams.warehouse}
              onChange={(e) => setSearchParams({...searchParams, warehouse: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">{t('ibtObdReport.search.all')}</option>
              <option value="A">{t('inventoryMoveHistory.search.warehouseA')}</option>
              <option value="B">{t('inventoryMoveHistory.search.warehouseB')}</option>
            </select>
          </div>

          {/* 구분 */}
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-1.5">{t('ibtObdReport.search.type')}</label>
            <select 
              value={searchParams.type}
              onChange={(e) => setSearchParams({...searchParams, type: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">{t('ibtObdReport.search.all')}</option>
              <option value="inbound">{t('ibtObdReport.search.inbound')}</option>
              <option value="outbound">{t('ibtObdReport.search.outbound')}</option>
            </select>
          </div>

          {/* 버튼 그룹 */}
          <div className="col-span-2 flex justify-end gap-2">
            <button 
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg text-sm shadow-sm transition"
            >
              {t('ibtObdReport.search.btnSearch')}
            </button>
            <button 
              className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-4 py-2 rounded-lg text-sm shadow-sm transition flex items-center gap-1"
            >
              <Download size={16} />
              {t('ibtObdReport.search.btnExcel')}
            </button>
          </div>
        </div>
      </div>

      {/* 요약 카드 영역 */}
      <div className="grid grid-cols-4 gap-4 shrink-0">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center">
          <span className="text-sm text-gray-500 mb-1">{t('ibtObdReport.summary.totalInQty')}</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-gray-800">5,320</span>
            <span className="text-sm text-gray-500">{t('ibtObdReport.unit.ea')}</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center">
          <span className="text-sm text-gray-500 mb-1">{t('ibtObdReport.summary.totalInAmount')}</span>
          <span className="text-2xl font-bold text-gray-800">53,200,000<span className="text-sm font-normal text-gray-500">{t('ibtObdReport.unit.won')}</span></span>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center">
          <span className="text-sm text-gray-500 mb-1">{t('ibtObdReport.summary.totalOutQty')}</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-gray-800">4,210</span>
            <span className="text-sm text-gray-500">{t('ibtObdReport.unit.ea')}</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center">
          <span className="text-sm text-gray-500 mb-1">{t('ibtObdReport.summary.totalOutAmount')}</span>
          <span className="text-2xl font-bold text-gray-800">42,100,000<span className="text-sm font-normal text-gray-500">{t('ibtObdReport.unit.won')}</span></span>
        </div>
      </div>

      {/* 차트 영역 */}
      <div className="grid grid-cols-2 gap-4 shrink-0 h-64">
        {/* 일별 입출고 수량 */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h3 className="text-base font-bold text-gray-800 mb-4">{t('ibtObdReport.chart.dailyQty')}</h3>
          <div className="flex items-end justify-around h-40 px-2">
            {chartData.map((item) => (
              <div key={item.date} className="flex flex-col items-center gap-2 flex-1">
                <div className="flex items-end gap-1 h-32">
                  {/* 입고 (파란색) */}
                  <div 
                    className="w-5 bg-blue-500 rounded-t-sm"
                    style={{height: `${(item.inQty / maxQty) * 128}px`}}
                  ></div>
                  {/* 출고 (회색) */}
                  <div 
                    className="w-5 bg-gray-400 rounded-t-sm"
                    style={{height: `${(item.outQty / maxQty) * 128}px`}}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">{item.date}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-2">
            <span className="flex items-center gap-1 text-xs text-gray-600">
              <span className="w-3 h-3 bg-blue-500 rounded-sm"></span> {t('ibtObdReport.inbound')}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-600">
              <span className="w-3 h-3 bg-gray-400 rounded-sm"></span> {t('ibtObdReport.outbound')}
            </span>
          </div>
        </div>

        {/* 일별 입출고 금액 */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h3 className="text-base font-bold text-gray-800 mb-4">{t('ibtObdReport.chart.dailyAmount')}</h3>
          <div className="flex items-end justify-around h-40 px-2">
            {chartData.map((item) => (
              <div key={item.date} className="flex flex-col items-center gap-2 flex-1">
                <div className="flex items-end gap-1 h-32">
                  {/* 입고 (파란색) */}
                  <div 
                    className="w-5 bg-blue-500 rounded-t-sm"
                    style={{height: `${(item.inAmt / maxAmt) * 128}px`}}
                  ></div>
                  {/* 출고 (회색) */}
                  <div 
                    className="w-5 bg-gray-400 rounded-t-sm"
                    style={{height: `${(item.outAmt / maxAmt) * 128}px`}}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">{item.date}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-2">
            <span className="flex items-center gap-1 text-xs text-gray-600">
              <span className="w-3 h-3 bg-blue-500 rounded-sm"></span> {t('ibtObdReport.inbound')}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-600">
              <span className="w-3 h-3 bg-gray-400 rounded-sm"></span> {t('ibtObdReport.outbound')}
            </span>
          </div>
        </div>
      </div>

      {/* 테이블 영역 */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex-1 flex flex-col min-h-0 overflow-hidden p-4">
        <div className="flex-1 overflow-auto border rounded-lg border-gray-200">
          <table className="w-full text-left text-sm border-collapse whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-600 font-medium sticky top-0 border-b border-gray-200">
              <tr>
                <th className="p-3 text-center font-semibold">{t('ibtObdReport.table.date')}</th>
                <th className="p-3 text-center font-semibold">{t('ibtObdReport.table.type')}</th>
                <th className="p-3 text-center font-semibold">{t('ibtObdReport.table.qty')}</th>
                <th className="p-3 text-center font-semibold">{t('ibtObdReport.table.amount')}</th>
                <th className="p-3 text-center font-semibold">{t('ibtObdReport.table.count')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {dailyData.flatMap((day) => [
                {
                  key: `${day.date}-in`,
                  date: day.date,
                  type: 'inbound',
                  qty: day.inQty,
                  amount: day.inAmount,
                  count: day.inCount,
                  isIn: true
                },
                {
                  key: `${day.date}-out`,
                  date: day.date,
                  type: 'outbound',
                  qty: day.outQty,
                  amount: day.outAmount,
                  count: day.outCount,
                  isIn: false
                }
              ]).map((item) => (
                <tr key={item.key} className="hover:bg-gray-50">
                  <td className="p-3 text-center text-gray-600">{item.date}</td>
                  <td className="p-3 text-center">
                    <div className={`flex items-center justify-center gap-1 ${item.isIn ? 'text-blue-600' : 'text-red-600'}`}>
                      {item.isIn ? (
                        <>
                          <ArrowDownLeft size={14} />
                          <span>{t('ibtObdReport.inbound')}</span>
                        </>
                      ) : (
                        <>
                          <ArrowUpRight size={14} />
                          <span>{t('ibtObdReport.outbound')}</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="p-3 text-center font-medium">{formatNumber(item.qty)}</td>
                  <td className="p-3 text-center font-medium">{formatNumber(item.amount)}</td>
                  <td className="p-3 text-center text-gray-600">{item.count}</td>
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
          <button className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center bg-white text-gray-600 hover:bg-gray-50">
            2
          </button>
          <button className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center bg-white text-gray-600 hover:bg-gray-50">
            3
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