import React from 'react';
import { Card, Row, Col, Statistic, List, Avatar, Tag, Typography, theme } from 'antd';
import { 
  SkinOutlined, 
  WarningOutlined, 
  DesktopOutlined, 
  ArrowUpOutlined, 
  UserOutlined,
  HistoryOutlined 
} from '@ant-design/icons';

const { Title, Text } = Typography;

const recentActivities = [
  { id: 1, user: 'Nguyễn Văn A', action: 'thử đồ AI', target: 'Váy Đen Dự Tiệc', time: '2 phút trước' },
  { id: 2, user: 'Kiosk K001', action: 'vừa kết nối lại', target: 'Sảnh chính', time: '15 phút trước' },
  { id: 3, user: 'Admin', action: 'cập nhật sản phẩm', target: 'Váy Maxi Hoa Nhí', time: '1 giờ trước' },
];

const Dashboard = () => {
  // Lấy token màu từ ConfigProvider để đồng bộ khi gạt Switch
  const { token } = theme.useToken();

  return (
    // BỎ bg-gray-50 để dùng màu nền từ ConfigProvider
    <div className="p-0"> 
      <Title level={3} style={{ marginBottom: 24 }}>Tổng quan hệ thống Smart Mirror</Title>
      
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={8}>
          <Card bordered={false} className="shadow-sm border-b-4" style={{ borderBottomColor: '#1890ff' }}>
            <Statistic
              title={<Text type="secondary">Tổng sản phẩm</Text>}
              value={24}
              prefix={<SkinOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
            <Text type="secondary" style={{ fontSize: '12px' }}>
              Tăng 10% so với tháng trước <ArrowUpOutlined />
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={8}>
          <Card bordered={false} className="shadow-sm border-b-4" style={{ borderBottomColor: '#cf1322' }}>
            <Statistic
              title={<Text type="secondary">Cần thêm biến thể</Text>}
              value={1}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
            <Text type="danger" strong>Sản phẩm: Váy Đen Dự Tiệc</Text>
          </Card>
        </Col>

        <Col xs={24} sm={8}>
          <Card bordered={false} className="shadow-sm border-b-4" style={{ borderBottomColor: '#3f8600' }}>
            <Statistic
              title={<Text type="secondary">Kiosk Online</Text>}
              value={3}
              suffix="/ 5"
              prefix={<DesktopOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
            <Text type="secondary" style={{ fontSize: '12px' }}>2 thiết bị đang Offline</Text>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card 
            title="Thống kê lượt thử đồ AI" 
            className="shadow-sm h-full"
            extra={<Tag color="blue">Hàng tuần</Tag>}
          >
            {/* Chỉnh sửa khu vực biểu đồ: BỎ bg-gray-50, dùng màu nền token */}
            <div 
              className="h-64 flex flex-col items-center justify-center rounded-lg border border-dashed"
              style={{ 
                backgroundColor: token.colorFillAlter, // Dùng màu nền nhẹ của Antd
                borderColor: token.colorBorder 
              }}
            >
              <span className="text-4xl mb-2">📊</span>
              <Text type="secondary"> Đang kết nối dữ liệu từ API... </Text>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card 
            title={<span><HistoryOutlined /> Hoạt động gần đây</span>} 
            className="shadow-sm h-full"
          >
            <List
              itemLayout="horizontal"
              dataSource={recentActivities}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} style={{ backgroundColor: token.colorFillContent }} />}
                    title={<Text strong>{item.user}</Text>}
                    description={
                      <span>
                        <Text type="secondary">{item.action}</Text> <Text type="primary">{item.target}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: '11px' }}>{item.time}</Text>
                      </span>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;