// pages/products/ProductCreate.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ProductCreate() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    category: 'Electrónica',
    unit: 'EA',
    brand: '',
    spec: '',
    safetyStock: '100',
    location: '',
    isUse: 'use',
    note: '',
    barcodeNumber: '',
    pageSize: '40 x 20 mm',
    printCount: '1'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-4 flex flex-col gap-4 text-sm text-gray-700 min-h-0 h-full w-full">
      
      {/* 1. 상단 메뉴 경로 타이틀 + 버튼 */}
      <div className="flex justify-between items-center shrink-0 py-1 select-none">
        <div className="flex items-center gap-2 text-lg text-gray-400 font-medium">
          <span className="text-gray-500">📦 {t('product.breadcrumb')}</span>
          <span className="text-gray-300 font-light"> {'>'} </span>
          <span className="text-slate-800 font-bold">{t('product.create.title')}</span>
        </div>
        <div className="flex gap-1.5">
          <button type="button" className="border border-gray-300 hover:bg-gray-50 text-gray-600 font-medium px-4 py-1.5 rounded text-sm shadow-sm transition">
            {t('product.create.actions.list')}
          </button>
          <button type="button" className="border border-gray-300 hover:bg-gray-50 text-gray-600 font-medium px-4 py-1.5 rounded text-sm shadow-sm transition">
            {t('product.create.actions.reset')}
          </button>
          <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-1.5 rounded text-sm shadow-sm transition">
            {t('product.create.actions.save')}
          </button>
        </div>
      </div>

      {/* 2. 본문 2단 레이아웃 */}
      <div className="flex gap-4 flex-1 min-h-0 w-full items-start">
        
        {/* 왼쪽: 기본 정보 입력 */}
        <div className="flex-1 bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4 max-h-full overflow-y-auto">
          <h3 className="text-base font-bold text-gray-800 border-b pb-2">{t('product.create.basicInfo')}</h3>
          
          <div className="space-y-4">
            {/* 2열 격자 배치 */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
              {/* 상품코드 */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">{t('product.create.fields.code')}</label>
                <input 
                  type="text" 
                  name="code" 
                  value={formData.code} 
                  onChange={handleChange} 
                  placeholder={t('product.create.placeholders.code')}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-400 focus:outline-none" 
                  readOnly 
                />
              </div>

              {/* 상품명 */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                  {t('product.create.fields.name')} <span className="text-rose-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder={t('product.create.placeholders.name')}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" 
                />
              </div>

              {/* 상품분류 */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                  {t('product.create.fields.category')} <span className="text-rose-500">*</span>
                </label>
                <select 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-500"
                >
                  <option value="전자제품">{t('product.categories.electronics')}</option>
                  <option value="주변기기">{t('product.categories.peripherals')}</option>
                </select>
              </div>

              {/* 단위 */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                  {t('product.create.fields.unit')} <span className="text-rose-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="unit" 
                  value={formData.unit} 
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" 
                />
              </div>

              {/* 브랜드 */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">{t('product.create.fields.brand')}</label>
                <select 
                  name="brand" 
                  value={formData.brand} 
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-500"
                >
                  <option value="">{t('product.create.placeholders.brand')}</option>
                </select>
              </div>

              {/* 규격 */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">{t('product.create.fields.spec')}</label>
                <select 
                  name="spec" 
                  value={formData.spec} 
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-500"
                >
                  <option value="">{t('product.create.placeholders.spec')}</option>
                </select>
              </div>

              {/* 안전재고 */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">{t('product.create.fields.safetyStock')}</label>
                <div className="relative flex items-center">
                  <input 
                    type="number" 
                    name="safetyStock" 
                    value={formData.safetyStock} 
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded pl-3 pr-8 py-2 text-sm focus:outline-none focus:border-blue-500 text-right" 
                  />
                  <span className="absolute right-3 text-xs text-gray-400 font-medium">{t('product.create.unit')}</span>
                </div>
              </div>

              {/* 보관위치 */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">{t('product.create.fields.location')}</label>
                <input 
                  type="text" 
                  name="location" 
                  value={formData.location} 
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" 
                />
              </div>
            </div>

            {/* 사용여부 및 비고 (전체 너비) */}
            <div className="space-y-3.5 pt-1.5">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">{t('product.create.fields.isUse')}</label>
                <div className="flex items-center gap-4 py-1">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input 
                      type="radio" 
                      name="isUse" 
                      value="사용" 
                      checked={formData.isUse === '사용'} 
                      onChange={handleChange}
                      className="text-blue-600 border-gray-300 focus:ring-0" 
                    />
                    <span>{t('product.create.status.use')}</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input 
                      type="radio" 
                      name="isUse" 
                      value="미사용" 
                      checked={formData.isUse === '미사용'} 
                      onChange={handleChange}
                      className="text-blue-600 border-gray-300 focus:ring-0" 
                    />
                    <span>{t('product.create.status.unuse')}</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">{t('product.create.fields.note')}</label>
                <textarea 
                  name="note" 
                  value={formData.note} 
                  onChange={handleChange} 
                  placeholder={t('product.create.placeholders.note')}
                  rows="3"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm resize-none focus:outline-none focus:border-blue-500" 
                />
              </div>
            </div>

          </div>
        </div>

        {/* 오른쪽: 바코드 정보 및 미리보기 */}
        <div className="w-[420px] shrink-0 flex flex-col gap-4 max-h-full overflow-y-auto">
          
          {/* 바코드 정보 입력 */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-gray-800 border-b pb-2">{t('product.create.barcodeInfo')}</h3>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">{t('product.create.fields.barcodeNumber')}</label>
              <input 
                type="text" 
                name="barcodeNumber" 
                value={formData.barcodeNumber} 
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" 
              />
            </div>
            {/* 버튼 그룹 */}
            <div className="grid grid-cols-3 gap-2 pt-1 text-xs font-semibold">
              <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded shadow-sm transition">
                {t('product.create.actions.generateBarcode')}
              </button>
              <button type="button" className="border border-gray-300 hover:bg-gray-50 text-gray-600 py-2 rounded shadow-sm transition">
                {t('product.create.actions.preview')}
              </button>
              <button type="button" className="border border-gray-300 hover:bg-gray-50 text-gray-600 py-2 rounded shadow-sm transition">
                {t('product.create.actions.print')}
              </button>
            </div>
          </div>

          {/* 바코드 미리보기 */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4 flex flex-col">
            <h3 className="text-base font-bold text-gray-800 border-b pb-2">{t('product.create.barcodePreview')}</h3>
            <div className="border border-gray-200 rounded-lg p-5 bg-white flex flex-col items-center justify-center shadow-inner my-auto min-h-[140px]">
              <div className="w-full flex flex-col items-center gap-1.5">
                {/* 바코드 그래픽 */}
                <div className="w-4/5 h-16 bg-white flex justify-center items-center gap-[2px] overflow-hidden px-2">
                  {[2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 3].map((w, idx) => (
                    <span key={idx} className="bg-black h-full shrink-0" style={{ width: `${w}px` }} />
                  ))}
                </div>
                <p className="font-mono text-xs tracking-[4px] text-gray-600 mt-1">
                  {formData.barcodeNumber || t('product.create.placeholders.barcode')}
                </p>
              </div>
            </div>
          </div>

          {/* 인쇄 옵션 */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-gray-800 border-b pb-2">{t('product.create.printOption')}</h3>
            
            <div className="space-y-3.5">
              {/* 용지크기 */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">{t('product.create.fields.pageSize')}</label>
                <select 
                  name="pageSize" 
                  value={formData.pageSize} 
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-500"
                >
                  <option value="40 x 20 mm">40 x 20 mm</option>
                  <option value="50 x 30 mm">50 x 30 mm</option>
                </select>
              </div>

              {/* 출력수량 */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">{t('product.create.fields.printCount')}</label>
                <input 
                  type="number" 
                  name="printCount" 
                  value={formData.printCount} 
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-right" 
                />
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100">
              <button 
                type="button" 
                className="w-full bg-slate-50 border border-gray-200 hover:bg-slate-100 text-gray-700 font-semibold py-2.5 rounded text-sm transition shadow-sm flex items-center justify-center gap-1.5"
              >
                🏷️ {t('product.create.labelPreview')}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}