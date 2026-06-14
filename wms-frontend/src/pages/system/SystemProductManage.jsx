// pages/system/SystemProductManage.jsx (또는 ProductCategoryManage.jsx로 이름을 변경하세요)
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Folder, FolderOpen, ChevronDown, ChevronRight, Plus, Pencil, Trash2 } from 'lucide-react';

export default function SystemProductManage() {
  const { t } = useTranslation();

  // 샘플 데이터 - 분류 트리
  const [tree, setTree] = useState([
    {
      id: '01',
      label: '전자제품',
      open: true,
      children: [
        { id: '01-01', label: '컴퓨터' },
        { id: '01-02', label: '모니터' },
        { id: '01-03', label: '주변기기' },
      ]
    },
    {
      id: '02',
      label: '생활용품',
      open: true,
      children: [
        { id: '02-01', label: '주방용품' },
        { id: '02-02', label: '청소용품' },
      ]
    },
    {
      id: '03',
      label: '사무용품',
      open: false,
      children: []
    },
  ]);

  const [selectedNode, setSelectedNode] = useState('01-01');
  const [formData, setFormData] = useState({
    parentId: '',
    code: '01-01',
    name: '컴퓨터',
    description: '컴퓨터 및 관련 제품',
    isUse: true
  });

  const toggleFolder = (id) => {
    setTree(prev => prev.map(node => 
      node.id === id ? { ...node, open: !node.open } : node
    ));
  };

  const onSelectNode = (id) => {
    setSelectedNode(id);
    // 실제로는 해당 노드의 데이터를 불러와서 폼에 설정
  };

  return (
    <div className="p-4 flex flex-col gap-4 text-sm text-gray-700 h-full w-full">
      {/* 브레드크럼 */}
      <div className="flex items-center gap-2 text-lg text-gray-400 font-medium shrink-0 py-1 select-none">
        <span className="text-gray-500">⚙️ {t('codeManage.breadcrumb')}</span>
        <span className="text-gray-300 font-light">{'>'}</span>
        <span className="text-slate-800 font-bold">{t('productCategoryManage.title')}</span>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="flex gap-4 flex-1 min-h-0">
        
        {/* 좌측: 분류 트리 목록 */}
        <div className="w-80 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-100 font-bold text-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderOpen size={18} className="text-yellow-500" />
              {t('productCategoryManage.tree.title')}
            </div>
            <button className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition">
              <Plus size={16} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {tree.map((node) => (
              <div key={node.id} className="mb-1">
                {/* 1차 분류 */}
                <div
                  className="flex items-center gap-2 py-1.5 cursor-pointer hover:bg-gray-50 rounded px-1"
                  onClick={() => toggleFolder(node.id)}
                >
                  <ChevronDown
                    size={14}
                    className={`text-gray-400 transition-transform ${
                      node.open ? '' : '-rotate-90'
                    }`}
                  />
                  {node.open ? (
                    <FolderOpen size={16} className="text-yellow-500" />
                  ) : (
                    <Folder size={16} className="text-yellow-500" />
                  )}
                  <span className="text-sm text-gray-700">{node.label}</span>
                </div>

                {/* 2차 분류 */}
                {node.open && node.children && (
                  <div className="ml-6 border-l-2 border-gray-100 pl-2 mt-1 mb-1">
                    {node.children.map((child) => (
                      <div
                        key={child.id}
                        onClick={() => onSelectNode(child.id)}
                        className={`flex items-center gap-2 py-1.5 cursor-pointer rounded mx-1 ${
                          selectedNode === child.id
                            ? 'text-blue-600 bg-blue-50 font-medium'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <ChevronRight size={14} className="text-gray-300" />
                        <span className="text-sm">{child.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 우측: 분류 정보 폼 (기존 DetailForm 컴포넌트를 인라인으로 포함) */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-gray-800">{t('productCategoryManage.form.title')}</h3>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm shadow-sm transition flex items-center gap-1">
                <Plus size={16} />
                {t('productCategoryManage.actions.new')}
              </button>
              <div className="w-px h-6 bg-gray-300 mx-1"></div>
              <button className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium text-sm rounded-lg transition">
                {t('productCategoryManage.actions.cancel')}
              </button>
              <button className="px-4 py-2 border border-red-300 hover:bg-red-50 text-red-600 font-medium text-sm rounded-lg transition">
                {t('productCategoryManage.actions.delete')}
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm shadow-sm transition">
                {t('productCategoryManage.actions.save')}
              </button>
            </div>
          </div>

          {/* 폼 내용 */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-5 max-w-2xl">
              {/* 상위분류 */}
              <div className="flex items-center gap-4">
                <label className="w-24 text-gray-600 font-medium shrink-0">
                  {t('productCategoryManage.fields.parentCategory')} <span className="text-red-500">*</span>
                </label>
                <select
                  name="parentId"
                  value={formData.parentId}
                  onChange={(e) => setFormData({...formData, parentId: e.target.value})}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">{t('productCategoryManage.fields.topCategory')}</option>
                  <option value="01">01. 전자제품</option>
                  <option value="02">02. 생활용품</option>
                  <option value="03">03. 사무용품</option>
                </select>
              </div>

              {/* 분류코드 */}
              <div className="flex items-center gap-4">
                <label className="w-24 text-gray-600 font-medium shrink-0">
                  {t('productCategoryManage.fields.code')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value})}
                  placeholder={t('productCategoryManage.placeholders.code')}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* 분류명 */}
              <div className="flex items-center gap-4">
                <label className="w-24 text-gray-600 font-medium shrink-0">
                  {t('productCategoryManage.fields.name')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder={t('productCategoryManage.placeholders.name')}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* 설명 */}
              <div className="flex items-start gap-4">
                <label className="w-24 text-gray-600 font-medium shrink-0 pt-2.5">
                  {t('productCategoryManage.fields.description')}
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder={t('productCategoryManage.placeholders.description')}
                  rows={4}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm resize-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* 사용여부 */}
              <div className="flex items-center gap-4">
                <label className="w-24 text-gray-600 font-medium shrink-0">
                  {t('productCategoryManage.fields.useYn')}
                </label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="isUse"
                      value="true"
                      checked={formData.isUse === true}
                      onChange={(e) => setFormData({...formData, isUse: e.target.value === 'true'})}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-gray-700">{t('productCategoryManage.fields.use')}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="isUse"
                      value="false"
                      checked={formData.isUse === false}
                      onChange={(e) => setFormData({...formData, isUse: e.target.value === 'true'})}
                      className="w-4 h-4 text-gray-400 focus:ring-gray-500 cursor-pointer"
                    />
                    <span className="text-gray-700">{t('productCategoryManage.fields.unused')}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}