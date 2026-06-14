// pages/system/SystemSetting.jsx
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

const tabs = [
  { key: 'basic', label: '기본설정' },
  { key: 'inbound', label: '입고설정' },
  { key: 'outbound', label: '출고설정' },
  { key: 'alarm', label: '알림설정' },
];

const initialForms = {
  basic: {
    companyName: 'Compañía de NAMU, Ltd.',
    businessNo: '123-45-67890',
    ceoName: 'Daniel',
    address: 'Bolivia Santa Cruz 123',
    phone: '02-1234-5678',
    email: 'sample@company.com',
    defaultWarehouse: '1창고',
    defaultLanguage: '한국어',
    timezone: '(GMT+09:00) 서울',
    dateFormat: 'YYYY-MM-DD',
    useYn: '사용',
  },
  inbound: {
    autoReceiveNo: '사용',
    defaultInboundType: '구매입고',
    inspectionRequired: '사용',
    inboundMemo: '입고 시 검수 절차를 우선 적용합니다.',
  },
  outbound: {
    autoIssueNo: '사용',
    defaultOutboundType: '판매출고',
    stockCheck: '사용',
    outboundMemo: '출고 확정 전 재고를 자동 점검합니다.',
  },
  alarm: {
    lowStockAlert: '사용',
    inboundDelayAlert: '사용',
    outboundDelayAlert: '미사용',
    alertEmail: 'alarm@company.com',
  },
};

export default function SystemSetting() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('basic');
  const [savedForms, setSavedForms] = useState(initialForms);
  const [forms, setForms] = useState(initialForms);

  const currentForm = useMemo(() => forms[activeTab], [forms, activeTab]);

  const updateField = (field, value) => {
    setForms((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [field]: value,
      },
    }));
  };

  const handleCancel = () => {
    setForms((prev) => ({
      ...prev,
      [activeTab]: { ...savedForms[activeTab] },
    }));
  };

  const handleSave = () => {
    setSavedForms((prev) => ({
      ...prev,
      [activeTab]: { ...forms[activeTab] },
    }));
    alert(t('systemSetting.alerts.saveSuccess'));
  };

  const renderBasicTab = () => (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-10 gap-y-4">
      {/* 좌측 */}
      <div className="space-y-4">
        <FormRow label={t('systemSetting.basic.companyName')}>
          <input
            type="text"
            value={currentForm.companyName}
            onChange={(e) => updateField('companyName', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500"
          />
        </FormRow>

        <FormRow label={t('systemSetting.basic.businessNo')}>
          <input
            type="text"
            value={currentForm.businessNo}
            onChange={(e) => updateField('businessNo', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500"
          />
        </FormRow>

        <FormRow label={t('systemSetting.basic.ceoName')}>
          <input
            type="text"
            value={currentForm.ceoName}
            onChange={(e) => updateField('ceoName', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500"
          />
        </FormRow>

        <FormRow label={t('systemSetting.basic.address')}>
          <input
            type="text"
            value={currentForm.address}
            onChange={(e) => updateField('address', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500"
          />
        </FormRow>

        <FormRow label={t('systemSetting.basic.phone')}>
          <input
            type="text"
            value={currentForm.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500"
          />
        </FormRow>

        <FormRow label={t('systemSetting.basic.email')}>
          <input
            type="email"
            value={currentForm.email}
            onChange={(e) => updateField('email', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500"
          />
        </FormRow>
      </div>

      {/* 우측 */}
      <div className="space-y-4">
        <FormRow label={t('systemSetting.basic.defaultWarehouse')}>
          <select
            value={currentForm.defaultWarehouse}
            onChange={(e) => updateField('defaultWarehouse', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-500"
          >
            <option value="1">{t('systemSetting.basic.warehouse1')}</option>
            <option value="2">{t('systemSetting.basic.warehouse2')}</option>
            <option value="3">{t('systemSetting.basic.warehouse3')}</option>
          </select>
        </FormRow>

        <FormRow label={t('systemSetting.basic.defaultLanguage')}>
          <select
            value={currentForm.defaultLanguage}
            onChange={(e) => updateField('defaultLanguage', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-500"
          >
            <option value="ko">{t('systemSetting.basic.korean')}</option>
            <option value="en">{t('systemSetting.basic.english')}</option>
            <option value="ja">{t('systemSetting.basic.japanese')}</option>
          </select>
        </FormRow>

        <FormRow label={t('systemSetting.basic.timezone')}>
          <select
            value={currentForm.timezone}
            onChange={(e) => updateField('timezone', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-500"
          >
            <option value="seoul">{t('systemSetting.basic.timezoneSeoul')}</option>
            <option value="beijing">{t('systemSetting.basic.timezoneBeijing')}</option>
            <option value="london">{t('systemSetting.basic.timezoneLondon')}</option>
          </select>
        </FormRow>

        <FormRow label={t('systemSetting.basic.dateFormat')}>
          <select
            value={currentForm.dateFormat}
            onChange={(e) => updateField('dateFormat', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-500"
          >
            <option value="YYYY-MM-DD">{t('systemSetting.basic.format1')}</option>
            <option value="YYYY.MM.DD">{t('systemSetting.basic.format2')}</option>
            <option value="MM/DD/YYYY">{t('systemSetting.basic.format3')}</option>
          </select>
        </FormRow>

        <FormRow label={t('systemSetting.basic.useYn')}>
          <div className="flex items-center gap-6 h-[42px]">
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="radio"
                name="useYn"
                checked={currentForm.useYn === '사용'}
                onChange={() => updateField('useYn', '사용')}
                className="w-4 h-4 text-blue-600"
              />
              {t('systemSetting.basic.use')}
            </label>

            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="radio"
                name="useYn"
                checked={currentForm.useYn === '미사용'}
                onChange={() => updateField('useYn', '미사용')}
                className="w-4 h-4 text-blue-600"
              />
              {t('systemSetting.basic.unused')}
            </label>
          </div>
        </FormRow>
      </div>
    </div>
  );

  const renderInboundTab = () => (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-10 gap-y-4">
      <div className="space-y-4">
        <FormRow label={t('systemSetting.inbound.autoReceiveNo')}>
          <select
            value={currentForm.autoReceiveNo}
            onChange={(e) => updateField('autoReceiveNo', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-500"
          >
            <option>{t('systemSetting.basic.use')}</option>
            <option>{t('systemSetting.basic.unused')}</option>
          </select>
        </FormRow>

        <FormRow label={t('systemSetting.inbound.defaultInboundType')}>
          <select
            value={currentForm.defaultInboundType}
            onChange={(e) => updateField('defaultInboundType', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-500"
          >
            <option>{t('systemSetting.inbound.purchaseInbound')}</option>
            <option>{t('systemSetting.inbound.returnInbound')}</option>
            <option>{t('systemSetting.inbound.moveInbound')}</option>
          </select>
        </FormRow>
      </div>

      <div className="space-y-4">
        <FormRow label={t('systemSetting.inbound.inspectionRequired')}>
          <select
            value={currentForm.inspectionRequired}
            onChange={(e) => updateField('inspectionRequired', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-500"
          >
            <option>{t('systemSetting.basic.use')}</option>
            <option>{t('systemSetting.basic.unused')}</option>
          </select>
        </FormRow>

        <FormRow label={t('systemSetting.inbound.inboundMemo')}>
          <textarea
            rows={4}
            value={currentForm.inboundMemo}
            onChange={(e) => updateField('inboundMemo', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm resize-none focus:outline-none focus:border-blue-500"
          />
        </FormRow>
      </div>
    </div>
  );

  const renderOutboundTab = () => (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-10 gap-y-4">
      <div className="space-y-4">
        <FormRow label={t('systemSetting.outbound.autoIssueNo')}>
          <select
            value={currentForm.autoIssueNo}
            onChange={(e) => updateField('autoIssueNo', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-500"
          >
            <option>{t('systemSetting.basic.use')}</option>
            <option>{t('systemSetting.basic.unused')}</option>
          </select>
        </FormRow>

        <FormRow label={t('systemSetting.outbound.defaultOutboundType')}>
          <select
            value={currentForm.defaultOutboundType}
            onChange={(e) => updateField('defaultOutboundType', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-500"
          >
            <option>{t('systemSetting.outbound.salesOutbound')}</option>
            <option>{t('systemSetting.outbound.moveOutbound')}</option>
            <option>{t('systemSetting.outbound.returnOutbound')}</option>
          </select>
        </FormRow>
      </div>

      <div className="space-y-4">
        <FormRow label={t('systemSetting.outbound.stockCheck')}>
          <select
            value={currentForm.stockCheck}
            onChange={(e) => updateField('stockCheck', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-500"
          >
            <option>{t('systemSetting.basic.use')}</option>
            <option>{t('systemSetting.basic.unused')}</option>
          </select>
        </FormRow>

        <FormRow label={t('systemSetting.outbound.outboundMemo')}>
          <textarea
            rows={4}
            value={currentForm.outboundMemo}
            onChange={(e) => updateField('outboundMemo', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm resize-none focus:outline-none focus:border-blue-500"
          />
        </FormRow>
      </div>
    </div>
  );

  const renderAlarmTab = () => (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-10 gap-y-4">
      <div className="space-y-4">
        <FormRow label={t('systemSetting.alarm.lowStockAlert')}>
          <select
            value={currentForm.lowStockAlert}
            onChange={(e) => updateField('lowStockAlert', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-500"
          >
            <option>{t('systemSetting.basic.use')}</option>
            <option>{t('systemSetting.basic.unused')}</option>
          </select>
        </FormRow>

        <FormRow label={t('systemSetting.alarm.inboundDelayAlert')}>
          <select
            value={currentForm.inboundDelayAlert}
            onChange={(e) => updateField('inboundDelayAlert', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-500"
          >
            <option>{t('systemSetting.basic.use')}</option>
            <option>{t('systemSetting.basic.unused')}</option>
          </select>
        </FormRow>
      </div>

      <div className="space-y-4">
        <FormRow label={t('systemSetting.alarm.outboundDelayAlert')}>
          <select
            value={currentForm.outboundDelayAlert}
            onChange={(e) => updateField('outboundDelayAlert', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-500"
          >
            <option>{t('systemSetting.basic.use')}</option>
            <option>{t('systemSetting.basic.unused')}</option>
          </select>
        </FormRow>

        <FormRow label={t('systemSetting.alarm.alertEmail')}>
          <input
            type="email"
            value={currentForm.alertEmail}
            onChange={(e) => updateField('alertEmail', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500"
          />
        </FormRow>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return renderBasicTab();
      case 'inbound':
        return renderInboundTab();
      case 'outbound':
        return renderOutboundTab();
      case 'alarm':
        return renderAlarmTab();
      default:
        return null;
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4 text-sm text-gray-700 min-h-0 h-full w-full">
      {/* 브레드크럼 */}
      <div className="flex items-center gap-2 text-lg text-gray-400 font-medium shrink-0 py-1 select-none">
        <span className="text-gray-500">⚙️ {t('systemSetting.breadcrumb')}</span>
        <span className="text-gray-300 font-light">{'>'}</span>
        <span className="text-slate-800 font-bold">{t('systemSetting.title')}</span>
      </div>

      {/* 메인 카드 */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex-1 flex flex-col min-h-0 overflow-hidden">
        <div className="shrink-0">
          <div className="flex items-center justify-between gap-4 border-b border-gray-200 mb-6">
            <div className="flex items-center gap-6">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`pb-3 text-sm font-medium transition border-b-2 ${
                      isActive
                        ? 'text-blue-600 border-blue-600'
                        : 'text-gray-500 border-transparent hover:text-gray-700'
                    }`}
                  >
                    {t(`systemSetting.tabs.${tab.key}`)}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-2 pb-3 shrink-0">
              <button
                type="button"
                onClick={handleCancel}
                className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-5 py-2 rounded transition"
              >
                {t('systemSetting.actions.cancel')}
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded shadow-sm transition"
              >
                {t('systemSetting.actions.save')}
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-auto">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}

function FormRow({ label, children }) {
  return (
    <div className="grid grid-cols-[110px_minmax(0,1fr)] items-center gap-4">
      <label className="text-sm font-medium text-gray-700 shrink-0">{label}</label>
      <div>{children}</div>
    </div>
  );
}