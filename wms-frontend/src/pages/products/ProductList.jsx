// pages/products/ProductList.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Download, Upload, Plus, Edit2, Printer, Trash2 } from 'lucide-react';

export default function ProductList() {
  const { t } = useTranslation();

  // 샘플 데이터 목록
  const [products] = useState([
    { code: 'A-001', name: 'Producto A-001 1', category: 'Electrónica', spec: 'Especificación 1', unit: 'EA', currentStock: 150, safetyStock: 100, status: 'normal', isUse: 'use', bcode: '8801234567890', loc: 'A-01-01' },
    { code: 'A-002', name: 'Producto A-002 2', category: 'Electrónica', spec: 'Especificación 1', unit: 'EA', currentStock: 80, safetyStock: 80, status: 'normal', isUse: 'use', bcode: '8801234567891', loc: 'A-01-02' },
    { code: 'A-003', name: 'Producto A-003 3', category: 'Periféricos', spec: 'Especificación 2', unit: 'EA', currentStock: 30, safetyStock: 30, status: 'caution', isUse: 'use', bcode: '8801234567892', loc: 'B-02-01' },
    { code: 'A-004', name: 'Producto A-004 4', category: 'Artículos del hogar', spec: 'Especificación 1', unit: 'EA', currentStock: 20, safetyStock: 30, status: 'shortage', isUse: 'use', bcode: '8801234567893', loc: 'C-01-05' },
    { code: 'A-005', name: 'Producto A-005 5', category: 'Artículos de oficina', spec: 'Especificación 3', unit: 'EA', currentStock: 10, safetyStock: 20, status: 'shortage', isUse: 'unused', bcode: '8801234567894', loc: 'D-03-02' },
  ]);

  const [selectedProduct, setSelectedProduct] = useState(products[0]);

  return (
    <div className="p-4 flex flex-col gap-4 text-sm text-gray-700 min-h-0 h-full w-full">
      
      {/* 브레드크럼 */}
      <div className="flex items-center gap-2 text-lg text-gray-400 font-medium shrink-0 py-1 select-none">
        <span className="text-gray-500">📦 {t('product.breadcrumb')}</span>
        <span className="text-gray-300 font-light"> {'>'} </span>
        <span className="text-slate-800 font-bold">{t('product.title')}</span>
      </div>

      <div className="flex gap-4 flex-1 min-h-0 w-full items-start">
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          
          {/* 1. 검색 필터바 */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm grid grid-cols-6 gap-3 shrink-0 items-end">
            <div>
              <label className="block text-xs text-gray-400 font-medium mb-1">{t('product.search.code')}</label>
              <input type="text" className="w-full border border-gray-300 rounded px-2.5 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 font-medium mb-1">{t('product.search.name')}</label>
              <input type="text" className="w-full border border-gray-300 rounded px-2.5 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 font-medium mb-1">{t('product.search.category')}</label>
              <select className="w-full border border-gray-300 rounded px-2.5 py-2 text-sm bg-white focus:outline-none focus:border-blue-500">
                <option>{t('common.all', '전체')}</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 font-medium mb-1">{t('product.search.usage')}</label>
              <select className="w-full border border-gray-300 rounded px-2.5 py-2 text-sm bg-white focus:outline-none focus:border-blue-500">
                <option>{t('common.all', '전체')}</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 font-medium mb-1">{t('product.search.stockStatus')}</label>
              <select className="w-full border border-gray-300 rounded px-2.5 py-2 text-sm bg-white focus:outline-none focus:border-blue-500">
                <option>{t('common.all', '전체')}</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button className="w-full bg-slate-700 hover:bg-slate-800 text-white font-semibold py-2 rounded text-sm shadow-sm transition flex items-center justify-center gap-1">
                🔍 {t('product.search.btnSearch')}
              </button>
            </div>
          </div>

          {/* 2. 테이블 영역 */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex-1 flex flex-col min-h-0 overflow-hidden">
            <div className="flex gap-1.5 mb-4 shrink-0 text-sm">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded shadow-sm flex items-center gap-1.5">
                <Plus size={16}/> {t('product.actions.add')}
              </button>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded shadow-sm flex items-center gap-1.5">
                <Upload size={16}/> {t('product.actions.uploadExcel')}
              </button>
              <button className="border border-gray-300 hover:bg-gray-50 text-gray-600 font-medium px-4 py-2 rounded shadow-sm flex items-center gap-1.5">
                <Download size={16}/> {t('product.actions.downloadExcel')}
              </button>
            </div>

            <div className="flex-1 overflow-auto border rounded-lg border-gray-100">
              <table className="w-full text-left text-sm border-collapse whitespace-nowrap">
                <thead className="bg-gray-50/70 text-gray-500 font-medium sticky top-0 border-b border-gray-100">
                  <tr>
                    <th className="p-3.5">{t('product.fields.code')}</th>
                    <th className="p-3.5">{t('product.fields.name')}</th>
                    <th className="p-3.5">{t('product.fields.category')}</th>
                    <th className="p-3.5">{t('product.fields.spec')}</th>
                    <th className="p-3.5">{t('product.fields.unit')}</th>
                    <th className="p-3.5 text-right">{t('product.fields.currentStock')}</th>
                    <th className="p-3.5 text-right">{t('product.fields.safetyStock')}</th>
                    <th className="p-3.5 text-center">{t('product.fields.status')}</th>
                    <th className="p-3.5 text-center">{t('product.fields.isUse')}</th>
                    <th className="p-3.5 text-center">{t('product.fields.manage')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-600">
                  {products.map((item) => {
                    const isSelected = selectedProduct?.code === item.code;
                    return (
                      <tr key={item.code} onClick={() => setSelectedProduct(item)}
                        className={`hover:bg-slate-50/80 cursor-pointer transition-colors ${isSelected ? 'bg-blue-50/50 hover:bg-blue-50' : ''}`}
                      >
                        <td className="p-3.5 font-mono font-semibold text-gray-800">{item.code}</td>
                        <td className="p-3.5 text-gray-700 font-medium">{item.name}</td>
                        <td className="p-3.5 text-gray-500">{item.category}</td>
                        <td className="p-3.5 text-gray-400">{item.spec}</td>
                        <td className="p-3.5 text-gray-400">{item.unit}</td>
                        <td className="p-3.5 text-right font-semibold text-slate-800">{item.currentStock.toLocaleString()}</td>
                        <td className="p-3.5 text-right text-gray-400">{item.safetyStock.toLocaleString()}</td>
                        <td className="p-3.5 text-center">
                          <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                            item.status === 'normal' ? 'bg-emerald-50 text-emerald-600' :
                            item.status === 'caution' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                          }`}>
                            {t(`product.status.${item.status}`)}
                          </span>
                        </td>
                        <td className="p-3.5 text-center text-gray-400">{t(`product.status.${item.isUse}`)}</td>
                        <td className="p-3.5 text-center space-x-2" onClick={(e) => e.stopPropagation()}>
                          <button className="text-blue-600 hover:underline">{t('product.actions.edit')}</button>
                          <button className="text-gray-400 hover:underline">{t('product.actions.print')}</button>
                          <button className="text-rose-500 hover:underline">{t('product.actions.delete')}</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 오른쪽 상세 패널 */}
        <div className="w-80 bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col justify-between shrink-0 h-full overflow-y-auto">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gray-800 border-b pb-2">{t('product.detailTitle')}</h3>
            <div className="space-y-3 text-sm text-gray-600">
              {[
                { label: 'code', val: selectedProduct?.code, mono: true },
                { label: 'name', val: selectedProduct?.name, bold: true },
                { label: 'category', val: selectedProduct?.category },
                { label: 'unit', val: selectedProduct?.unit },
                { label: 'currentStock', val: `${selectedProduct?.currentStock?.toLocaleString()} EA`, color: 'text-blue-600' },
                { label: 'safetyStock', val: `${selectedProduct?.safetyStock?.toLocaleString()} EA` },
                { label: 'loc', val: selectedProduct?.loc, mono: true, bg: true },
                { label: 'isUse', val: t(`product.status.${selectedProduct?.isUse}`) }
              ].map((row, i) => (
                <div key={i} className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-400">{t(`product.fields.${row.label}`)}</span>
                  <span className={`${row.mono ? 'font-mono' : ''} ${row.bold ? 'font-medium' : ''} ${row.color || 'text-gray-800'} ${row.bg ? 'bg-gray-50 px-2 py-0.5 rounded border border-gray-200/50' : ''}`}>
                    {row.val}
                  </span>
                </div>
              ))}
            </div>

            {/* 바코드 목업 */}
            <div className="mt-6 border border-gray-200 rounded-lg p-4 bg-white flex flex-col items-center shadow-inner">
              <div className="w-full h-14 flex justify-center items-center gap-[2px] bg-white overflow-hidden px-1">
                {[2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 3].map((w, idx) => (
                  <span key={idx} className="bg-black h-full shrink-0" style={{ width: `${w}px` }} />
                ))}
              </div>
              <p className="font-mono text-xs tracking-[3px] text-gray-500 mt-1">{selectedProduct?.bcode}</p>
            </div>
          </div>

          <div className="flex gap-2 border-t pt-4 mt-6 text-sm">
            <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2 rounded transition">
              {t('product.actions.edit')}
            </button>
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded shadow-sm transition">
              {t('product.actions.barcodePrint')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}