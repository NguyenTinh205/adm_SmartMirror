import React from 'react';
import { Table, Tag, Card, Avatar, Input, Space, Button, Statistic } from 'antd';
import { UserOutlined, SearchOutlined, GiftOutlined, EyeOutlined } from '@ant-design/icons';

const customerData = [
  { id: 1, name: "Nguyễn Văn A", email: "vana@gmail.com", phone: "0901234xxx", points: 150, lastTryOn: "Váy Đen Dự Tiệc" },
  { id: 2, name: "Trần Thị B", email: "thib@gmail.com", phone: "0988776xxx", points: 45, lastTryOn: "Váy Maxi Hoa Nhí" },
  { id: 3, name: "Lê Thị C", email: "lethic@gmail.com", phone: "0912333xxx", points: 210, lastTryOn: "Váy Trắng Công Sở" },
];

const CustomerPage = () => {
  const columns = [
    {
      title: 'Khách hàng',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#87d068' }} />
          <div>
            <div className="font-bold">{text}</div>
            <div className="text-xs text-gray-400">{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Thử đồ AI gần nhất',
      dataIndex: 'lastTryOn',
      key: 'lastTryOn',
      render: (tag) => (
        <Tag color="purple" style={{ borderRadius: '10px' }}>
          {tag}
        </Tag>
      ),
    },
    {
      title: 'Điểm thưởng',
      dataIndex: 'points',
      key: 'points',
      sorter: (a, b) => a.points - b.points,
      render: (points) => (
        <Space className="text-blue-600 font-bold">
          <GiftOutlined />
          {points}
        </Space>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: () => (
        <Button type="link" icon={<EyeOutlined />}>Xem lịch sử</Button>
      ),
    },
  ];

  return (
    <div className="p-6">
      {/* Header Thống kê nhanh */}
      <div className="flex gap-4 mb-6">
        <Card className="flex-1 shadow-sm">
          <Statistic 
            title="Tổng khách hàng" 
            value={customerData.length} 
            prefix={<UserOutlined />} 
          />
        </Card>
        <Card className="flex-1 shadow-sm">
          <Statistic 
            title="Tổng điểm tích lũy" 
            value={405} 
            valueStyle={{ color: '#3f8600' }}
            prefix={<GiftOutlined />} 
          />
        </Card>
      </div>

      {/* Bảng danh sách */}
      <Card 
        title={<span className="text-purple-700 font-bold">Danh sách Khách hàng</span>}
        extra={
          <Input 
            placeholder="Tìm theo tên/SĐT..." 
            prefix={<SearchOutlined />} 
            className="w-64"
          />
        }
        className="shadow-md rounded-xl"
      >
        <Table 
          columns={columns} 
          dataSource={customerData} 
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default CustomerPage;