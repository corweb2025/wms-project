// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';   // ← 추가
import Login from './pages/Login';
import MainLayout from './layouts/MainLayout';

// 페이지 imports
import Dashboard from './pages/Dashboard';
import ProductList from './pages/products/ProductList';
import ProductCreate from './pages/products/ProductCreate';
import BarcodePrint from './pages/products/BarcodePrint';
import InboundList from './pages/inbound/InboundList';
import InboundRegist from './pages/inbound/InboundRegist';
import OutboundList from './pages/outbound/OutboundList';
import OutboundRegist from './pages/outbound/OutboundRegist';
import InventoryList from './pages/inventory/InventoryList';
import InventoryChangeHistory from './pages/inventory/InventoryChangeHistory';
import InventoryMoveHistory from './pages/inventory/InventoryMoveHistory';
import InventoryReport from './pages/report/InventoryReport';
import IbtObdReport from './pages/report/IbtObdReport';
import LocationManage from './pages/system/LocationManage';
import ProductCategoryManage from './pages/system/ProductCategoryManage';
import UserManage from './pages/system/UserManage';
import UserAuthManage from './pages/system/UserAuthManage';
import CodeManage from './pages/system/CodeManage';
import SystemSetting from './pages/system/SystemSetting';

// Protected Route
function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#f4f6f9]">로딩 중...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>                    {/* ← 다국어지원 */}        
          <Routes>
            {/* 로그인 페이지 (보호되지 않음) */}
            <Route path="/login" element={<Login />} />

            {/* 인증이 필요한 모든 페이지 */}
            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />

                {/* 상품관리 */}
                <Route path="prd/productlist" element={<ProductList />} />
                <Route path="prd/productcreate" element={<ProductCreate />} />
                <Route path="prd/barcodeprint" element={<BarcodePrint />} />

                {/* 입고관리 */}
                <Route path="ibd/inboundlist" element={<InboundList />} />
                <Route path="ibd/inboundregist" element={<InboundRegist />} />

                {/* 출고관리 */}
                <Route path="obd/outboundlist" element={<OutboundList />} />
                <Route path="obd/outboundregist" element={<OutboundRegist />} />

                {/* 재고관리 */}
                <Route path="ibt/inventorylist" element={<InventoryList />} />
                <Route path="ibt/inventorychangehistory" element={<InventoryChangeHistory />} />
                <Route path="ibt/inventorymovehistory" element={<InventoryMoveHistory />} />

                {/* 리포트 */}
                <Route path="rpt/inventoryreport" element={<InventoryReport />} />
                <Route path="rpt/ibtobdreport" element={<IbtObdReport />} />

                {/* 설정 */}
                <Route path="sys/locationmanage" element={<LocationManage />} />
                <Route path="sys/productcategorymanage" element={<ProductCategoryManage />} />
                <Route path="sys/usermanage" element={<UserManage />} />
                <Route path="sys/userauthmanage" element={<UserAuthManage />} />
                <Route path="sys/codemanage" element={<CodeManage />} />
                <Route path="sys/systemsetting" element={<SystemSetting />} />
              </Route>
            </Route>

            {/* 잘못된 경로는 로그인 페이지로 이동 */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </LanguageProvider>  
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;