import React, { useState } from 'react';
import { Layout, Menu, theme, Switch, Space } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import {
  DesktopOutlined,
  ShopOutlined,
  SkinOutlined,
  TeamOutlined,
  UserOutlined,
  SettingOutlined,
  BulbOutlined,
  BulbFilled
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();

  // Lấy chính xác các biến màu nền từ ConfigProvider (App.jsx)
  const { 
    token: { colorBgContainer, colorBgLayout, borderRadiusLG } 
  } = theme.useToken();

  const items = [
    { key: '/', icon: <DesktopOutlined />, label: 'Bảng điều khiển' },
    { key: '/kiosks', icon: <ShopOutlined />, label: 'Quản lý Kiosk' },
    { key: '/products', icon: <SkinOutlined />, label: 'Sản phẩm & Danh mục' },
    { key: '/customers', icon: <TeamOutlined />, label: 'Khách hàng' },
    { key: '/staffs', icon: <UserOutlined />, label: 'Nhân viên' },
    { key: '/settings', icon: <SettingOutlined />, label: 'Cài đặt' }
  ];

  return (
    // Bước 1: Ép màu nền của Layout gốc để xóa các khoảng trắng đệm
    <Layout style={{ minHeight: '100vh', background: colorBgLayout, transition: 'all 0.3s' }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(v) => setCollapsed(v)}
        style={{ background: '#001529', position: 'sticky', top: 0, left: 0, height: '100vh',overflow: 'hidden' }}
      >
        <div style={{ height: 32, margin: 16, background: 'rgba(255,255,255,.2)', color: '#fff', textAlign: 'center', lineHeight: '32px', fontWeight: 'bold' }}>
          SMART MIRROR
        </div>
        <Menu 
          theme="dark" 
          mode="inline" 
          selectedKeys={[location.pathname]} 
          items={items} 
          onClick={({ key }) => navigate(key)} 
          style={{ background: '#001529' }}
        />
      </Sider>
      
      {/* Bước 2: Đảm bảo Layout con cũng sử dụng colorBgLayout */}
      <Layout style={{ background: colorBgLayout }}>
        <Header style={{ 
          padding: '0 24px', 
          background: colorBgContainer, // Tự động sang xanh đen nhờ App.jsx
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderBottom: isDarkMode ? 'none' : '1px solid #f0f0f0',
          transition: 'all 0.3s'
        }}> 
          <h2 style={{ margin: 0, color: isDarkMode ? '#fff' : 'inherit', fontSize: '18px' }}>
            Hệ thống Quản trị Kiosk
          </h2>
          
          <Space>
            <span style={{ color: isDarkMode ? '#778da9' : '#555' }}>
              {isDarkMode ? 'Chế độ tối' : 'Chế độ sáng'}
            </span>
            <Switch
              checked={isDarkMode}
              onChange={toggleTheme}
              checkedChildren={<BulbFilled />}
              unCheckedChildren={<BulbOutlined />}
            />
          </Space>
        </Header>

        {/* Bước 3: Content phải để background transparent để hiện màu của Layout bên dưới */}
        <Content style={{ margin: '24px', background: 'transparent' }}>
          <div style={{ 
            padding: 24, 
            minHeight: 'calc(100vh - 112px)', // Trừ đi chiều cao của Header và Margin
            background: colorBgContainer, 
            borderRadius: borderRadiusLG,
            border: 'none',
            boxShadow: isDarkMode ? '0 4px 12px rgba(0,0,0,0.5)' : '0 2px 8px rgba(0,0,0,0.06)',
            transition: 'all 0.3s'
          }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;