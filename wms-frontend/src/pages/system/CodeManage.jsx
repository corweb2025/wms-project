// pages/system/CodeManage.jsx
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FolderOpen, Plus, Pencil, Save, Trash2, X } from 'lucide-react';

const initialCodeGroups = [
  { id: 'partnerType', name: 'Tipo de socio' },
  { id: 'outboundType', name: 'Tipo de salida' },
  { id: 'inboundType', name: 'Tipo de entrada' },
  { id: 'moveType', name: 'Tipo de movimiento' },
  { id: 'inspectionType', name: 'Tipo de inspección' },
  { id: 'unitCode', name: 'Unidad' },
  { id: 'statusCode', name: 'Estado' },
];

const initialCodeMap = {
  partnerType: [
    { id: 1, code: 'CUS', name: 'Cliente', desc: 'Clientes', useYn: 'Usar' },
    { id: 2, code: 'SUP', name: 'Proveedor', desc: 'Proveedor', useYn: 'Usar' },
  ],
  outboundType: [
    { id: 1, code: 'SALE', name: 'Salida por venta', desc: 'Salida por venta', useYn: 'Usar' },
    { id: 2, code: 'MOVE', name: 'Salida por traslado', desc: 'Salida por traslado', useYn: 'Usar' },
  ],
  inboundType: [
    { id: 1, code: 'BUY', name: 'Entrada por compra', desc: 'Entrada por compra', useYn: 'Usar' },
    { id: 2, code: 'RETURN', name: 'Entrada por devolución', desc: 'Entrada por devolución', useYn: 'Usar' },
  ],
  moveType: [
    { id: 1, code: 'WH', name: 'Movimiento de almacén', desc: 'Movimiento de almacén', useYn: 'Usar' },
    { id: 2, code: 'LOC', name: 'Movimiento de ubicación', desc: 'Movimiento de ubicación', useYn: 'Usar' },
  ],
  inspectionType: [
    { id: 1, code: 'REG', name: 'Inspección regular', desc: 'Inspección regular', useYn: 'Usar' },
    { id: 2, code: 'SPT', name: 'Inspección puntual', desc: 'Inspección puntual', useYn: 'Usar' },
  ],
  unitCode: [
    { id: 1, code: 'EA', name: 'Unidad', desc: 'Unidads', useYn: 'Usar' },
    { id: 2, code: 'BOX', name: 'Caja', desc: 'Unidad de caja', useYn: 'Usar' },
    { id: 3, code: 'SET', name: 'Set', desc: 'Unidad de set', useYn: 'Usar' },
    { id: 4, code: 'PAL', name: 'Palé', desc: 'Unidad de palé', useYn: 'Usar' },
  ],
  statusCode: [
    { id: 1, code: 'NORMAL', name: 'Normal', desc: '사용 가능 상태', useYn: 'Usar' },
    { id: 2, code: 'WARN', name: 'Advertencia', desc: '주의 필요 상태', useYn: 'Usar' },
    { id: 3, code: 'SHORT', name: 'Faltante', desc: '재고 부족 상태', useYn: 'Usar' },
  ],
};

const cloneCodeMap = (source) =>
  Object.fromEntries(
    Object.entries(source).map(([key, rows]) => [
      key,
      rows.map((row) => ({ ...row })),
    ])
  );

const createEmptyRow = () => ({
  id: `new-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  code: '',
  name: '',
  desc: '',
  useYn: '사용',
});

const createNewGroup = () => ({
  id: `group-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  name: '신규코드그룹',
});

export default function CodeManage() {
  const { t } = useTranslation();
  const [groups, setGroups] = useState(initialCodeGroups);
  const [selectedGroupId, setSelectedGroupId] = useState(
    initialCodeGroups.find((item) => item.id === 'unitCode')?.id ||
    initialCodeGroups[0]?.id ||
    ''
  );

  const [savedCodeMap, setSavedCodeMap] = useState(() => cloneCodeMap(initialCodeMap));
  const [draftCodeMap, setDraftCodeMap] = useState(() => cloneCodeMap(initialCodeMap));

  const [editingGroupId, setEditingGroupId] = useState(null);
  const [editingGroupName, setEditingGroupName] = useState('');

  const selectedGroup = useMemo(
    () => groups.find((group) => group.id === selectedGroupId) || null,
    [groups, selectedGroupId]
  );

  const currentRows = selectedGroupId ? draftCodeMap[selectedGroupId] || [] : [];

  const handleSelectGroup = (groupId) => {
    setSelectedGroupId(groupId);
  };

  const handleAddGroup = () => {
    const newGroup = createNewGroup();

    setGroups((prev) => [...prev, newGroup]);
    setSavedCodeMap((prev) => ({ ...prev, [newGroup.id]: [] }));
    setDraftCodeMap((prev) => ({ ...prev, [newGroup.id]: [] }));

    setSelectedGroupId(newGroup.id);
    setEditingGroupId(newGroup.id);
    setEditingGroupName(newGroup.name);
  };

  const handleStartEditGroup = (group) => {
    setSelectedGroupId(group.id);
    setEditingGroupId(group.id);
    setEditingGroupName(group.name);
  };

  const handleSaveGroupName = (groupId) => {
    const nextName = editingGroupName.trim();

    if (!nextName) {
      alert(t('codeManage.common.groupNameRequired'));
      return;
    }

    setGroups((prev) =>
      prev.map((group) =>
        group.id === groupId ? { ...group, name: nextName } : group
      )
    );

    setEditingGroupId(null);
    setEditingGroupName('');
  };

  const handleDeleteGroup = (groupId) => {
    const targetGroup = groups.find((group) => group.id === groupId);
    if (!targetGroup) return;

    const ok = window.confirm(
      t('codeManage.confirm.deleteGroup', { name: targetGroup.name })
    );
    if (!ok) return;

    const deletedIndex = groups.findIndex((group) => group.id === groupId);
    const nextGroups = groups.filter((group) => group.id !== groupId);

    setGroups(nextGroups);

    setSavedCodeMap((prev) => {
      const next = { ...prev };
      delete next[groupId];
      return next;
    });

    setDraftCodeMap((prev) => {
      const next = { ...prev };
      delete next[groupId];
      return next;
    });

    if (editingGroupId === groupId) {
      setEditingGroupId(null);
      setEditingGroupName('');
    }

    if (selectedGroupId === groupId) {
      const nextSelected =
        nextGroups[deletedIndex] || nextGroups[deletedIndex - 1] || null;
      setSelectedGroupId(nextSelected?.id || '');
    }
  };

  const handleChangeRow = (rowIndex, field, value) => {
    if (!selectedGroupId) return;

    setDraftCodeMap((prev) => ({
      ...prev,
      [selectedGroupId]: (prev[selectedGroupId] || []).map((row, index) =>
        index === rowIndex ? { ...row, [field]: value } : row
      ),
    }));
  };

  const handleToggleUse = (rowIndex) => {
    const current = currentRows[rowIndex];
    if (!current) return;

    handleChangeRow(rowIndex, 'useYn', current.useYn === '사용' ? '미사용' : '사용');
  };

  const handleAddRow = () => {
    if (!selectedGroupId) {
      alert(t('codeManage.common.selectGroup'));
      return;
    }

    setDraftCodeMap((prev) => ({
      ...prev,
      [selectedGroupId]: [...(prev[selectedGroupId] || []), createEmptyRow()],
    }));
  };

  const handleDeleteRow = (rowIndex) => {
    if (!selectedGroupId) return;

    setDraftCodeMap((prev) => ({
      ...prev,
      [selectedGroupId]: (prev[selectedGroupId] || []).filter(
        (_, index) => index !== rowIndex
      ),
    }));
  };

  const handleCancel = () => {
    if (!selectedGroupId) return;

    setDraftCodeMap((prev) => ({
      ...prev,
      [selectedGroupId]: (savedCodeMap[selectedGroupId] || []).map((row) => ({ ...row })),
    }));
  };

  const handleSave = () => {
    if (!selectedGroupId) return;

    setSavedCodeMap((prev) => ({
      ...prev,
      [selectedGroupId]: (draftCodeMap[selectedGroupId] || []).map((row) => ({ ...row })),
    }));

    alert(t('codeManage.common.saveSuccess'));
  };

  return (
    <div className="p-4 flex flex-col gap-4 text-sm text-gray-700 min-h-0 h-full w-full">
      {/* 브레드크럼 + 우측 버튼 */}
      <div className="flex items-center justify-between gap-3 shrink-0 py-1">
        <div className="flex items-center gap-2 text-lg text-gray-400 font-medium select-none">
          <span className="text-gray-500">⚙️ {t('codeManage.breadcrumb')}</span>
          <span className="text-gray-300 font-light">{'>'}</span>
          <span className="text-slate-800 font-bold">{t('codeManage.title')}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleAddRow}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded shadow-sm transition flex items-center gap-1.5"
          >
            <Plus size={16} />
            {t('codeManage.actions.add')}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-5 py-2 rounded transition"
          >
            {t('codeManage.actions.cancel')}
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded shadow-sm transition"
          >
            {t('codeManage.actions.save')}
          </button>
        </div>
      </div>

      <div className="flex gap-4 flex-1 min-h-0 w-full items-start">
        {/* 좌측 코드그룹 */}
        <div className="w-72 bg-white border border-gray-200 rounded-xl p-4 shadow-sm shrink-0 h-full overflow-y-auto">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2 text-gray-800 font-bold">
              <FolderOpen size={17} className="text-amber-500" />
              <span>{t('codeManage.common.codeGroup')}</span>
            </div>

            <button
              type="button"
              title={t('codeManage.actions.addGroup')}
              onClick={handleAddGroup}
              className="w-8 h-8 rounded-lg border border-gray-200 hover:bg-gray-50 text-blue-600 flex items-center justify-center transition"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="space-y-1">
            {groups.length > 0 ? (
              groups.map((group) => {
                const isSelected = selectedGroupId === group.id;
                const isEditing = editingGroupId === group.id;

                return (
                  <div
                    key={group.id}
                    className={`group flex items-center gap-2 rounded-lg transition ${
                      isSelected ? 'bg-blue-50' : 'hover:bg-slate-50'
                    }`}
                  >
                    {isEditing ? (
                      <div className="flex-1 min-w-0 px-3 py-2">
                        <input
                          type="text"
                          value={editingGroupName}
                          autoFocus
                          onChange={(e) => setEditingGroupName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveGroupName(group.id);
                            if (e.key === 'Escape') {
                              setEditingGroupId(null);
                              setEditingGroupName('');
                            }
                          }}
                          className="w-full border border-blue-300 rounded px-2.5 py-2 text-sm bg-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSelectGroup(group.id)}
                        className={`flex-1 text-left px-4 py-2.5 rounded-lg font-medium transition ${
                          isSelected ? 'text-blue-600' : 'text-gray-600'
                        }`}
                      >
                        {t(`codeManage.groups.${group.id}`)}
                      </button>
                    )}

                    <div
                      className={`flex items-center gap-1 pr-2 ${
                        isSelected || isEditing ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      } transition-opacity`}
                    >
                      <button
                        type="button"
                        title={isEditing ? t('codeManage.actions.groupSave') : t('codeManage.actions.groupEdit')}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isEditing) {
                            handleSaveGroupName(group.id);
                          } else {
                            handleStartEditGroup(group);
                          }
                        }}
                        className="w-7 h-7 rounded-md hover:bg-white text-blue-600 flex items-center justify-center transition"
                      >
                        {isEditing ? <Save size={15} /> : <Pencil size={15} />}
                      </button>

                      <button
                        type="button"
                        title={t('codeManage.actions.groupDelete')}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteGroup(group.id);
                        }}
                        className="w-7 h-7 rounded-md hover:bg-white text-rose-500 flex items-center justify-center transition"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-sm text-gray-400 px-2 py-6 text-center">
                {t('codeManage.common.noGroups')}
              </div>
            )}
          </div>
        </div>

        {/* 우측 코드 목록 */}
        <div className="flex-1 bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col min-h-0 overflow-hidden">
          <div className="flex items-center justify-between mb-4 shrink-0">
            <div className="text-sm font-semibold text-gray-800">
              {selectedGroup ? t(`codeManage.groups.${selectedGroup.id}`) : t('codeManage.common.selectGroup')}
            </div>
            <div className="text-xs text-gray-400">
              {t('codeManage.common.total')} {currentRows.length}{t('codeManage.common.count')}
            </div>
          </div>

          <div className="flex-1 overflow-auto border rounded-lg border-gray-100">
            <table className="w-full text-left text-sm border-collapse whitespace-nowrap">
              <thead className="bg-gray-50/70 text-gray-500 font-medium sticky top-0 border-b border-gray-100 z-10">
                <tr>
                  <th className="p-3.5 min-w-[180px]">{t('codeManage.table.code')}</th>
                  <th className="p-3.5 min-w-[220px]">{t('codeManage.table.codeName')}</th>
                  <th className="p-3.5 min-w-[280px]">{t('codeManage.table.description')}</th>
                  <th className="p-3.5 text-center min-w-[120px]">{t('codeManage.table.useYn')}</th>
                  <th className="p-3.5 text-center min-w-[90px]">{t('codeManage.table.delete')}</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 text-gray-600">
                {selectedGroup ? (
                  currentRows.length > 0 ? (
                    currentRows.map((row, rowIndex) => (
                      <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5">
                          <input
                            type="text"
                            value={row.code}
                            onChange={(e) =>
                              handleChangeRow(rowIndex, 'code', e.target.value)
                            }
                            placeholder={t('codeManage.table.codePlaceholder')}
                            className="w-full rounded px-2.5 py-2 text-sm text-gray-800 border border-transparent bg-transparent outline-none focus:border-blue-500 focus:bg-white"
                          />
                        </td>

                        <td className="p-3.5">
                          <input
                            type="text"
                            value={row.name}
                            onChange={(e) =>
                              handleChangeRow(rowIndex, 'name', e.target.value)
                            }
                            placeholder={t('codeManage.table.namePlaceholder')}
                            className="w-full rounded px-2.5 py-2 text-sm text-gray-700 border border-transparent bg-transparent outline-none focus:border-blue-500 focus:bg-white"
                          />
                        </td>

                        <td className="p-3.5">
                          <input
                            type="text"
                            value={row.desc}
                            onChange={(e) =>
                              handleChangeRow(rowIndex, 'desc', e.target.value)
                            }
                            placeholder={t('codeManage.table.descPlaceholder')}
                            className="w-full rounded px-2.5 py-2 text-sm text-gray-700 border border-transparent bg-transparent outline-none focus:border-blue-500 focus:bg-white"
                          />
                        </td>

                        <td className="p-3.5 text-center">
                          <button
                            type="button"
                            onClick={() => handleToggleUse(rowIndex)}
                            className={`text-xs px-3 py-1 rounded-full font-bold transition ${
                              row.useYn === '사용'
                                ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {row.useYn}
                          </button>
                        </td>

                        <td className="p-3.5 text-center">
                          <button
                            type="button"
                            onClick={() => handleDeleteRow(rowIndex)}
                            className="text-rose-400 hover:text-rose-500 transition inline-flex items-center justify-center"
                            title={t('codeManage.actions.delete')}
                          >
                            <X size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-10 text-center text-gray-400">
                        {t('codeManage.common.noCodes')}
                      </td>
                    </tr>
                  )
                ) : (
                  <tr>
                    <td colSpan={5} className="p-10 text-center text-gray-400">
                      {t('codeManage.common.selectGroup')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}