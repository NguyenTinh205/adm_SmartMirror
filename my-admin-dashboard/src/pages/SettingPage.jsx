import React from 'react';
import { Card, Form, Input, Button, Switch, Divider, Select, Row, Col, Typography, Space, Tabs, theme } from 'antd';
import { 
  SettingOutlined, 
  LockOutlined, 
  CloudServerOutlined,
  SaveOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const SettingPage = () => {
  const [form] = Form.useForm();
  
  // Lấy màu nền động từ ConfigProvider để tự động đổi màu khi gạt Switch trên Header
  const { token: { colorBgContainer } } = theme.useToken();

  return (
    // Xóa màu nền xanh đen cứng, để thẻ cha quản lý màu
    <div style={{ padding: '0px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        
        {/* Xóa color: '#fff' để chữ tự động đen khi sáng, trắng khi tối */}
        <Title level={3} style={{ margin: 0 }}>
          <SettingOutlined /> Cài đặt hệ thống
        </Title>

        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: '1',
              label: 'Chung',
              children: (
                <Row gutter={[24, 24]}>
                  {/* Cấu hình Kiosk */}
                  <Col xs={24} lg={16}>
                    <Card title="Cấu hình Kiosk AI" className="shadow-sm" style={{ backgroundColor: colorBgContainer }}>
                      <Form form={form} layout="vertical">
                        <Row gutter={16}>
                          <Col span={12}>
                            <Form.Item label="Tên hệ thống hiển thị">
                              <Input defaultValue="SMART MIRROR AI" />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item label="Ngôn ngữ mặc định">
                              <Select defaultValue="vi">
                                <Option value="vi">Tiếng Việt</Option>
                                <Option value="en">English</Option>
                              </Select>
                            </Form.Item>
                          </Col>
                        </Row>
                        
                        <Divider />
                        
                        <Form.Item label="Tự động làm mới dữ liệu (giây)">
                          <Input type="number" defaultValue={30} style={{ width: '100px' }} />
                        </Form.Item>

                        <Space>
                          <Switch defaultChecked />
                          <Text>Cho phép khách hàng chụp ảnh tại Kiosk</Text>
                        </Space>
                        
                        <div style={{ marginTop: '24px' }}>
                          <Button type="primary" icon={<SaveOutlined />}>
                            Lưu cấu hình
                          </Button>
                        </div>
                      </Form>
                    </Card>
                  </Col>

                  {/* Trạng thái Server */}
                  <Col xs={24} lg={8}>
                    <Card title="Hệ thống" className="shadow-sm" style={{ backgroundColor: colorBgContainer }}>
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <div className="flex justify-between items-center mb-4">
                          <Text type="secondary">Trạng thái Server: </Text>
                          <Button type="text" style={{ color: '#52c41a' }}>Đang hoạt động</Button>
                        </div>
                        <Divider style={{ margin: '12px 0' }} />
                        <Button block icon={<CloudServerOutlined />}>Kiểm tra cập nhật</Button>
                        <Button block danger ghost icon={<LockOutlined />} style={{ marginTop: '12px' }}>Đăng xuất từ xa</Button>
                      </Space>
                    </Card>
                  </Col>
                </Row>
              ),
            },
            {
              key: '2',
              label: 'Bảo mật',
              children: (
                <Card className="shadow-sm" style={{ backgroundColor: colorBgContainer }}>
                  <Form layout="vertical">
                    <Form.Item label="Mật khẩu hiện tại">
                      <Input.Password />
                    </Form.Item>
                    <Form.Item label="Mật khẩu mới">
                      <Input.Password />
                    </Form.Item>
                    <Button type="primary">Đổi mật khẩu</Button>
                  </Form>
                </Card>
              ),
            },
          ]}
        />
      </Space>
    </div>
  );
};

export default SettingPage; 