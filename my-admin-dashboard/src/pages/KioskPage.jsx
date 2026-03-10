import React from 'react';
import { Table, Tag, Card, Badge, Button, Space, Typography, Tooltip } from 'antd';
import { DesktopOutlined, SyncOutlined, SettingOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

const kioskData = [
  { id: "K001", name: "Kiosk Tầng 1 - Sảnh chính", location: "Khu A", status: "Online", lastActive: "10:30 03/03/2026" },
  { id: "K002", name: "Kiosk Tầng 2 - Đồ nữ", location: "Khu B", status: "Offline", lastActive: "09:15 02/03/2026" },
  { id: "K003", name: "Kiosk VIP - Phòng thử đồ", location: "Khu C", status: "Online", lastActive: "11:05 03/03/2026" },
];

const KioskPage = () => {
  const columns = [
    {
      title: 'Mã Kiosk',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <Text code>{text}</Text>,
    },
    {
      title: 'Tên & Vị trí',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <div className="font-bold">{text}</div>
          <Text type="secondary" style={{ fontSize: '12px' }}>Vị trí: {record.location}</Text>
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const isOnline = status === 'Online';
        return (
          <Tag 
            icon={isOnline ? <CheckCircleOutlined /> : <CloseCircleOutlined />} 
            color={isOnline ? 'success' : 'error'}
            style={{ borderRadius: '12px', padding: '0 10px' }}
          >
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Hoạt động cuối',
      dataIndex: 'lastActive',
      key: 'lastActive',
      render: (time) => (
        <Space direction="vertical" size={0}>
          <Text size="small">{time.split(' ')[0]}</Text>
          <Text type="secondary" style={{ fontSize: '12px' }}>{time.split(' ')[1]}</Text>
        </Space>
      )
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Tooltip title="Lấy lại kết nối">
            <Button type="text" icon={<SyncOutlined className="text-blue-500" />} />
          </Tooltip>
          <Button type="primary" ghost size="small" icon={<SettingOutlined />}>
            Cấu hình
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card 
        title={
          <Space>
            <DesktopOutlined className="text-blue-600" />
            <span className="text-blue-700 font-bold">Quản lý hệ thống Kiosk (Smart Mirror)</span>
          </Space>
        }
        extra={
          <Badge status="processing" text="Tổng 3 thiết bị đang kết nối" />
        }
        className="shadow-md rounded-xl"
      >
        <Table 
          columns={columns} 
          dataSource={kioskData} 
          rowKey="id"
          pagination={false}
          className="kiosk-table"
        />
      </Card>

      {/* Gợi ý thêm phần chú thích thiết bị lỗi */}
      <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-100">
        <Text type="warning" strong>Lưu ý: </Text>
        <Text type="secondary">Kiosk **K002** đã mất kết nối hơn 24h. Vui lòng kiểm tra lại đường truyền mạng tại Khu B.</Text>
      </div>
    </div>
  );
};

export default KioskPage;