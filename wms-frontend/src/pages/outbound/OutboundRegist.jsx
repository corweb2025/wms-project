// pages/outbound/OutboundRegist.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Scan } from 'lucide-react';

export default function OutboundRegist() {
  const { t } = useTranslation();
  
  // 폼 데이터 상태
  const [formData, setFormData] = useState({
    outboundNo: 'OUT-2024-0001', // 자동 생성 예시
    outboundDate: '2024-05-07',
    manager: 'Daniel',
    customer: 'Cliente A',
    barcode: '',
    quantity: '50',
    location: 'A-01-01',
    remark: ''
  });

  // 스캔된 상품 정보
  const [scannedProduct, setScannedProduct] = useState({
    code: 'A-001',
    name: 'A-001 Producto 1',
    currentStock: 150
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleScan = () => {
    console.log('스캔:', formData.barcode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('저장:', formData);
    alert(t('outboundRegist.actions.save') + ' 완료');
  };

  const handleCancel = () => {
    if (confirm(t('outboundRegist.actions.cancel') + ' 하시겠습니까?')) {
      console.log('취소');
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4 text-sm text-gray-700 min-h-0 h-full w-full">
      {/* 브레드크럼 */}
      <div className="flex items-center gap-2 text-lg text-gray-400 font-medium shrink-0 py-1 select-none">
        <span className="text-gray-500">📦 {t('sidebar.outboundManagement')}</span>
        <span className="text-gray-300 font-light"> {'>'} </span>
        <span className="text-slate-800 font-bold">{t('outboundRegist.title')}</span>
      </div>

      {/* 메인 폼 카드 */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex-1 flex flex-col overflow-hidden">
        <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-y-auto p-6">
          
          {/* 상단 기본 정보 영역 */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-5 mb-6">
            {/* 출고번호 */}
            <div className="flex items-center gap-4">
              <label className="w-24 text-gray-600 font-medium shrink-0">
                {t('outboundRegist.fields.outboundNo')}
              </label>
              <input 
                type="text" 
                name="outboundNo"
                value={formData.outboundNo}
                readOnly
                className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-600 focus:outline-none"
              />
            </div>

            {/* 출고일자 */}
            <div className="flex items-center gap-4">
              <label className="w-24 text-gray-600 font-medium shrink-0">
                {t('outboundRegist.fields.outboundDate')}
              </label>
              <div className="flex-1 relative">
                <input 
                  type="date" 
                  name="outboundDate"
                  value={formData.outboundDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 출고담당자 */}
            <div className="flex items-center gap-4">
              <label className="w-24 text-gray-600 font-medium shrink-0">
                {t('outboundRegist.fields.manager')} <span className="text-red-500">*</span>
              </label>
              <select 
                name="manager"
                value={formData.manager}
                onChange={handleChange}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option>Daniel</option>
                <option>Jecica</option>
                <option>Piter</option>
                <option>Susana</option>
              </select>
            </div>

            {/* 출고처 */}
            <div className="flex items-center gap-4">
              <label className="w-24 text-gray-600 font-medium shrink-0">
                {t('outboundRegist.fields.customer')} <span className="text-red-500">*</span>
              </label>
              <select 
                name="customer"
                value={formData.customer}
                onChange={handleChange}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option>Cliente A</option>
                <option>Cliente B</option>
                <option>Cliente C</option>
                <option>Cliente D</option>
                <option>Cliente E</option>
              </select>
            </div>
          </div>

          {/* 바코드 스캔 영역 */}
          <div className="mb-6">
            <div className="flex items-center gap-3 bg-gray-50/50 border border-gray-200 rounded-lg p-2">
              <div className="flex items-center gap-2 px-3 text-gray-600 font-medium shrink-0">
                <Scan size={18} />
                <span>{t('outboundRegist.fields.barcodeScan')}</span>
              </div>
              <input 
                type="text" 
                name="barcode"
                value={formData.barcode}
                onChange={handleChange}
                placeholder={t('outboundRegist.fields.barcodePlaceholder')}
                className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <button 
                type="button"
                onClick={handleScan}
                className="flex items-center gap-1.5 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 font-medium shrink-0 transition"
              >
                <Scan size={16} />
                {t('outboundRegist.fields.scan')}
              </button>
            </div>
          </div>

          {/* 상품 정보 및 출고 상세 영역 */}
          <div className="grid grid-cols-2 gap-6 flex-1">
            {/* 왼쪽: 상품정보 카드 */}
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
              <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-700">{t('outboundRegist.fields.productInfo')}</h3>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-4">
                  <label className="w-20 text-gray-500 text-sm shrink-0">{t('outboundRegist.fields.productCode')}</label>
                  <span className="font-mono text-gray-800 font-medium">{scannedProduct.code}</span>
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-20 text-gray-500 text-sm shrink-0">{t('outboundRegist.fields.productName')}</label>
                  <span className="text-gray-800 font-medium">{scannedProduct.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-20 text-gray-500 text-sm shrink-0">{t('outboundRegist.fields.currentStock')}</label>
                  <span className="text-blue-600 font-bold">{scannedProduct.currentStock} {t('outboundRegist.unit')}</span>
                </div>
              </div>
            </div>

            {/* 오른쪽: 출고 상세 정보 */}
            <div className="space-y-5">
              {/* 출고수량 */}
              <div className="flex items-center gap-4">
                <label className="w-24 text-gray-600 font-medium shrink-0">
                  {t('outboundRegist.fields.quantity')} <span className="text-red-500">*</span>
                </label>
                <div className="flex-1 flex items-center gap-2">
                  <input 
                    type="number" 
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <span className="text-gray-500 w-8">{t('outboundRegist.unit')}</span>
                </div>
              </div>

              {/* 출고위치 */}
              <div className="flex items-center gap-4">
                <label className="w-24 text-gray-600 font-medium shrink-0">
                  {t('outboundRegist.fields.location')} <span className="text-red-500">*</span>
                </label>
                <select 
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option>A-01-01</option>
                  <option>A-01-02</option>
                  <option>B-02-01</option>
                  <option>C-01-02</option>
                  <option>D-02-01</option>
                  <option>E-01-01</option>
                </select>
              </div>

              {/* 비고 */}
              <div className="flex items-start gap-4">
                <label className="w-24 text-gray-600 font-medium shrink-0 pt-2.5">
                  {t('outboundRegist.fields.remark')}
                </label>
                <textarea 
                  name="remark"
                  value={formData.remark}
                  onChange={handleChange}
                  placeholder={t('outboundRegist.fields.remarkPlaceholder')}
                  rows={4}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* 하단 버튼 영역 */}
          <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
            <button 
              type="button"
              onClick={handleCancel}
              className="px-8 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
            >
              {t('outboundRegist.actions.cancel')}
            </button>
            <button 
              type="submit"
              className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm transition"
            >
              {t('outboundRegist.actions.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}