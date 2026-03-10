import React from 'react';
import { ConfigProvider, theme } from 'antd';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext.jsx';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import KioskPage from './pages/KioskPage';
import ProductPage from './pages/ProductPage';
import CustomerPage from './pages/CustomerPage';
import StaffPage from './pages/StaffPage.jsx';
import SettingPage from './pages/SettingPage';

const AppContent = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <ConfigProvider
      theme={{
        // Thuật toán gốc của Ant Design
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 8,
          // Màu sắc tùy chỉnh theo tone Xanh Đen của bạn
          colorBgContainer: isDarkMode ? '#1b263b' : '#ffffff', 
          colorBgLayout: isDarkMode ? '#0d1b2a' : '#f5f5f5',
          colorTextBase: isDarkMode ? '#e0e1dd' : '#000000',
          // Đồng bộ màu viền trong dark mode để tránh viền trắng
          colorBorder: isDarkMode ? '#415a77' : '#d9d9d9',
          colorBorderSecondary: isDarkMode ? '#1b263b' : '#f0f0f0',
          colorSplit: isDarkMode ? '#1b263b' : '#f0f0f0',
        },
        components: {
          Card: {
            colorBgContainer: isDarkMode ? '#1b263b' : '#ffffff',
          },
          Layout: {
            colorBgHeader: isDarkMode ? '#1b263b' : '#ffffff',
            // Đảm bảo Sidebar (Sider) cũng có tone màu chuẩn
            colorBgTrigger: '#001529', 
          },
          Menu: {
            darkItemBg: '#001529', // Màu của Sidebar menu
          }
        }
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="kiosks" element={<KioskPage />} />
            <Route path="products" element={<ProductPage />} />
            <Route path="customers" element={<CustomerPage />} />
            <Route path="staffs" element={<StaffPage />} />
            <Route path="settings" element={<SettingPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};

// ĐÂY LÀ PHẦN BỊ THIẾU TRONG CODE CỦA BẠN:
const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;