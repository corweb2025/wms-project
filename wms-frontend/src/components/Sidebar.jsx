// components/Sidebar.jsx
import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Package, ArrowDownToLine, ArrowUpFromLine, ClipboardList, FileSearch, Settings, ChevronDown, Box } from 'lucide-react';

const menus = [
  { key: 'dashboard', to: '/dashboard', icon: LayoutDashboard },
  { 
    key: 'productManagement', 
    icon: Package, 
    children: [ 
      { key: 'productList', to: '/prd/productlist' }, 
      { key: 'productCreate', to: '/prd/productcreate' }, 
      { key: 'barcodePrint', to: '/prd/barcodeprint' } 
    ]
  },
  { 
    key: 'inboundManagement', 
    icon: ArrowDownToLine, 
    children: [ 
      { key: 'inboundList', to: '/ibd/inboundlist' }, 
      { key: 'inboundRegist', to: '/ibd/inboundregist' }, 
    ]
  },
  { 
    key: 'outboundManagement', 
    icon: ArrowUpFromLine, 
    children: [ 
      { key: 'outboundList', to: '/obd/outboundlist' }, 
      { key: 'outboundRegist', to: '/obd/outboundregist' }, 
    ]
  }, 
  { 
    key: 'inventoryManagement', 
    icon: ClipboardList, 
    children: [ 
      { key: 'inventoryList', to: '/ibt/inventorylist' }, 
      { key: 'inventoryChangeHistory', to: '/ibt/inventorychangehistory' }, 
      { key: 'inventoryMoveHistory', to: '/ibt/inventorymovehistory' }, 
    ]
  },
  { 
    key: 'reports', 
    icon: FileSearch, 
    children: [ 
      { key: 'inventoryReport', to: '/rpt/inventoryreport' }, 
      { key: 'ibtobdReport', to: '/rpt/ibtobdreport' }, 
    ]
  },
  { 
    key: 'systemSettings', 
    icon: Settings, 
    children: [
      { key: 'locationManage', to: '/sys/locationmanage' },
      { key: 'productCategoryManage', to: '/sys/productcategorymanage' },
      { key: 'userManagement', to: '/sys/usermanage' },
      { key: 'userAuthManagement', to: '/sys/userauthmanage' }, 
      { key: 'codeManagement', to: '/sys/codemanage' },
      { key: 'systemSetting', to: '/sys/systemsetting' },
    ]
  },  
];

export default function Sidebar({ collapsed }) {
  const { t } = useTranslation();
  const loc = useLocation();
  const [open, setOpen] = useState({ productManagement: true });

  useEffect(() => {
    menus.forEach(m => {
      if (m.children?.some(c => loc.pathname.startsWith(c.to))) {
        setOpen(o => ({ ...o, [m.key]: true }));
      }
    });
  }, [loc.pathname]);

  return (
    <aside className={`${collapsed ? 'w-[72px]' : 'w-[240px]'} bg-[#0f172a] text-[#cbd5e1] h-screen flex flex-col shrink-0 transition-all duration-300`}>
      <div className="h-14 flex items-center gap-2 px-3 border-b border-white/10">
        <div className="bg-[#2563eb] p-1.5 rounded-lg shrink-0">
          <Box size={18} className="text-white" />
        </div>
        {!collapsed && <span className="text-white font-bold text-lg">WMS</span>}
      </div>

      <nav className="px-2 py-3 overflow-y-auto">
        {menus.map(m => {
          if (!m.children) {
            return (
              <NavLink 
                key={m.key} 
                to={m.to} 
                title={t(`sidebar.${m.key}`)}
                className={({ isActive }) => 
                  `flex items-center gap-3 ${collapsed ? 'justify-center' : 'px-3'} py-2.5 my-0.5 rounded-lg text-[14px] 
                  ${isActive ? 'bg-[#2563eb] text-white' : 'hover:bg-white/10'}`
                }
              >
                <m.icon size={20} /> 
                {!collapsed && t(`sidebar.${m.key}`)}
              </NavLink>
            );
          }

          const isOpen = open[m.key] || false;
          const activeParent = m.children.some(c => loc.pathname.startsWith(c.to));

          return (
            <div key={m.key}>
              <button 
                onClick={() => !collapsed && setOpen(o => ({ ...o, [m.key]: !isOpen }))}
                title={t(`sidebar.${m.key}`)}
                className={`w-full flex items-center ${collapsed ? 'justify-center' : 'justify-between px-3'} py-2.5 my-0.5 rounded-lg text-[14px] 
                  ${activeParent ? 'bg-[#2563eb] text-white' : 'hover:bg-white/10'}`}
              >
                <span className="flex items-center gap-3">
                  <m.icon size={20} />
                  {!collapsed && t(`sidebar.${m.key}`)}
                </span>
                {!collapsed && (
                  <ChevronDown 
                    size={16} 
                    className={`transition ${isOpen ? 'rotate-180' : ''}`} 
                  />
                )}
              </button>

              {isOpen && !collapsed && (
                <div className="ml-7 mt-1 space-y-1 border-l border-white/10 pl-3">
                  {m.children.map(c => (
                    <NavLink 
                      key={c.to} 
                      to={c.to} 
                      className={({ isActive }) => 
                        `block py-1.5 text-[13px] ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'}`
                      }
                    >
                      • {t(`sidebar.${c.key}`)}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}