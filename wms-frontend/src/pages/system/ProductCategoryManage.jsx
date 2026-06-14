// pages/system/ProductCategoryManage.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Folder, FolderOpen, ChevronRight, ChevronDown, Pencil, Trash2 } from 'lucide-react';

export default function ProductCategoryManage() {
  const { t } = useTranslation();
  
  // 샘플 데이터 - 분류 트리
  const [categories, setCategories] = useState([
    {
      id: '01',
      code: '01',
      name: 'Electrónica',
      parentId: null,
      expanded: true,
      description: 'Todos los dispositivos electrónicos',
      isUse: true,
      children: [
        { id: '01-01', code: '01-01', name: 'Computadoras', parentId: '01', description: 'Computadoras y accesorios', isUse: true },
        { id: '01-02', code: '01-02', name: 'Monitores', parentId: '01', description: 'Productos de monitor', isUse: true },
        { id: '01-03', code: '01-03', name: 'Periféricos', parentId: '01', description: 'Teclado, ratón, etc', isUse: true },
      ]
    },
    {
      id: '02',
      code: '02',
      name: 'Artículos del hogar',
      parentId: null,
      expanded: true,
      description: 'Todos los artículos del hogar',
      isUse: true,
      children: [
        { id: '02-01', code: '02-01', name: 'Artículos de cocina', parentId: '02', description: 'Productos de cocina', isUse: true },
        { id: '02-02', code: '02-02', name: 'Artículos de limpieza', parentId: '02', description: 'Productos de limpieza', isUse: true },
      ]
    },
    {
      id: '03',
      code: '03',
      name: 'Artículos de oficina',
      parentId: null,
      expanded: false,
      description: 'Todos los artículos de oficina',
      isUse: true,
      children: []
    },
  ]);

  // 선택된 분류 상태
  const [selectedCategory, setSelectedCategory] = useState({
    id: '01-01',
    code: '01-01',
    name: 'Computadoras',
    parentId: '01',
    description: 'Computadoras y accesorios',
    isUse: true
  });

  // 신규 등록 모드 여부
  const [isNew, setIsNew] = useState(false);

  // 폼 데이터 상태
  const [formData, setFormData] = useState({
    parentId: '01',
    code: '01-01',
    name: 'Computadoras',
    description: 'Computadoras y accesorios',
    isUse: true
  });

  // 트리 열기/닫기 토글
  const toggleExpand = (e, categoryId) => {
    e.stopPropagation();
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId ? { ...cat, expanded: !cat.expanded } : cat
    ));
  };

  // 일반 클릭 시 정보 보기
  const handleSelectCategory = (category) => {
    setIsNew(false);
    setSelectedCategory(category);
    setFormData({
      parentId: category.parentId || '',
      code: category.code,
      name: category.name,
      description: category.description || '',
      isUse: category.isUse !== undefined ? category.isUse : true
    });
  };

  // 트리에서 [+] 아이콘 클릭 시 (하위 분류 추가)
  const handleTreeAdd = (e, parentId) => {
    e.stopPropagation();
    setIsNew(true);
    setSelectedCategory(null);
    setFormData({
      parentId: parentId || '',
      code: '',
      name: '',
      description: '',
      isUse: true
    });
    // 부모 폴더 열어주기
    if(parentId) {
      setCategories(prev => prev.map(cat => cat.id === parentId ? { ...cat, expanded: true } : cat));
    }
  };

  // 상단 [신규등록] 버튼 클릭 시
  const handleNew = () => {
    setIsNew(true);
    setSelectedCategory(null);
    setFormData({
      parentId: '',
      code: '',
      name: '',
      description: '',
      isUse: true
    });
  };

  // 입력 핸들러
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'radio') {
      setFormData(prev => ({ ...prev, [name]: value === 'true' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // 저장 (추가/수정 실제 반영)
  const handleSave = () => {
    if (!formData.code || !formData.name) {
      alert(t('productCategoryManage.alerts.codeNameRequired'));
      return;
    }

    if (isNew) {
      // 신규 추가 로직
      const newId = `new-${Date.now()}`;
      const newCategory = { ...formData, id: newId, children: [] };

      if (!formData.parentId) {
        // 1차 분류로 추가
        setCategories([...categories, newCategory]);
      } else {
        // 2차 분류로 추가
        setCategories(categories.map(cat => 
          cat.id === formData.parentId 
            ? { ...cat, children: [...(cat.children || []), newCategory], expanded: true }
            : cat
        ));
      }
      setSelectedCategory(newCategory);
      alert(t('productCategoryManage.alerts.newCategoryAdded'));
    } else {
      // 기존 수정 로직
      setCategories(categories.map(cat => {
        // 1차 분류 수정
        if (cat.id === selectedCategory.id) {
          return { ...cat, ...formData };
        }
        // 2차 분류 수정
        if (cat.children) {
          return {
            ...cat,
            children: cat.children.map(child => child.id === selectedCategory.id ? { ...child, ...formData } : child)
          };
        }
        return cat;
      }));
      setSelectedCategory({ ...selectedCategory, ...formData });
      alert(t('productCategoryManage.alerts.categoryUpdated'));
    }
    setIsNew(false);
  };

  // 삭제 로직
  const handleDelete = (e, targetId) => {
    if(e) e.stopPropagation();
    const idToDelete = targetId || selectedCategory?.id;

    if (!idToDelete) return;
    if (confirm(t('productCategoryManage.confirm.delete'))) {
      setCategories(prev => prev
        .filter(cat => cat.id !== idToDelete) // 1차 분류 삭제
        .map(cat => ({ // 2차 분류 삭제
          ...cat,
          children: cat.children ? cat.children.filter(child => child.id !== idToDelete) : []
        }))
      );
      
      if (selectedCategory?.id === idToDelete) {
        handleNew(); // 삭제된 항목을 보고 있었다면 폼 초기화
      }
      alert(t('productCategoryManage.alerts.deleted'));
    }
  };

  // 취소
  const handleCancel = () => {
    if (selectedCategory) {
      handleSelectCategory(selectedCategory);
    } else {
      handleNew();
    }
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
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {categories.map((category) => (
              <div key={category.id}>
                {/* 1차 분류 (group 적용으로 hover 시 아이콘 표시) */}
                <div 
                  className={`group flex items-center justify-between p-2 rounded-lg cursor-pointer transition ${
                    selectedCategory?.id === category.id && !isNew ? 'bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleSelectCategory(category)}
                >
                  <div className="flex items-center gap-1.5 flex-1 min-w-0">
                    <button 
                      className="p-0.5 text-gray-400 hover:text-gray-600 shrink-0"
                      onClick={(e) => toggleExpand(e, category.id)}
                    >
                      {category.expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                    {category.expanded ? (
                      <FolderOpen size={16} className="text-yellow-500 shrink-0" />
                    ) : (
                      <Folder size={16} className="text-yellow-500 shrink-0" />
                    )}
                    <span className={`font-medium truncate ${selectedCategory?.id === category.id && !isNew ? 'text-blue-700' : 'text-gray-700'}`}>
                      {category.code}. {category.name}
                    </span>
                  </div>
                </div>
                
                {/* 2차 분류 */}
                {category.expanded && category.children && (
                  <div className="ml-6 border-l-2 border-gray-100 pl-2 mt-1 mb-1">
                    {category.children.map((child) => (
                      <div
                        key={child.id}
                        onClick={() => handleSelectCategory(child)}
                        className={`group flex items-center justify-between p-2 rounded-lg cursor-pointer transition ${
                          selectedCategory?.id === child.id && !isNew ? 'bg-blue-50' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="text-gray-300 shrink-0">—</span>
                          <span className={`truncate ${selectedCategory?.id === child.id && !isNew ? 'text-blue-700 font-medium' : 'text-gray-600'}`}>
                            {child.code}. {child.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 우측: 분류 정보 폼 */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
          {/* 헤더 영역 (버튼 그룹 포함) */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-gray-800">{t('productCategoryManage.form.title')}</h3>
              {isNew && (
                <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs font-bold rounded-full">
                  {t('productCategoryManage.form.newMode')}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleNew}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm shadow-sm transition flex items-center gap-1"
              >
                <Plus size={16} />
                {t('productCategoryManage.actions.new')}
              </button>
              <div className="w-px h-6 bg-gray-300 mx-1"></div>
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium text-sm rounded-lg transition"
              >
                {t('productCategoryManage.actions.cancel')}
              </button>
              <button
                onClick={() => handleDelete()}
                className="px-4 py-2 border border-red-300 hover:bg-red-50 text-red-600 font-medium text-sm rounded-lg transition"
              >
                {t('productCategoryManage.actions.delete')}
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm shadow-sm transition"
              >
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
                  onChange={handleChange}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">{t('productCategoryManage.fields.topCategory')}</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.code}. {cat.name}</option>
                  ))}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                  placeholder={t('productCategoryManage.placeholders.description')}
                  rows={4}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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