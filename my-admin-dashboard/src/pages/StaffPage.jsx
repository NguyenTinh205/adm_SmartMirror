import React, { useState } from 'react';
import { Table, Button, Tag, Space, Avatar, Input, Card, Modal, Form, Select, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, LockOutlined, SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

// Đưa dữ liệu ra một biến khởi tạo
const initialStaffData = [
  {
    key: '1',
    id: 'ST01',
    name: 'Nguyễn Văn A',
    email: 'avana@gmail.com',
    role: 'Admin',
    branch: 'Chi nhánh Quận 1',
  },
  {
    key: '2',
    id: 'ST02',
    name: 'Trần Thị B',
    email: 'thib@gmail.com',
    role: 'Nhân viên',
    branch: 'Chi nhánh Quận 3',
  },
  {
    key: '3',
    id: 'ST03',
    name: 'Lê Văn C',
    email: 'vanc@gmail.com',
    role: 'Admin',
    branch: 'Chi nhánh Bình Thạnh',
  },
];

const StaffPage = () => {
  // 1. Quản lý trạng thái dữ liệu và tìm kiếm
  const [data, setData] = useState(initialStaffData);
  const [searchText, setSearchText] = useState(''); 
  
  // 2. Quản lý trạng thái Modal (bật/tắt hộp thoại)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Xử lý mở Modal
  const showModal = () => setIsModalOpen(true);

  // Xử lý đóng Modal
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields(); // Xóa sạch form khi đóng
  };

  // Xử lý khi Submit form thêm nhân viên
  const handleAddStaff = (values) => {
    const newStaff = {
      key: Date.now().toString(), // Tạo key ngẫu nhiên
      id: values.id,
      name: values.name,
      email: values.email,
      role: values.role,
      branch: values.branch,
    };
    
    setData([...data, newStaff]); // Thêm vào bảng
    message.success('Thêm nhân viên thành công!');
    
    setIsModalOpen(false); // Đóng modal
    form.resetFields(); // Xóa form
  };

  // Định nghĩa cột (Giữ nguyên của bạn)
  const columns = [
    {
      title: 'Họ và tên',
      key: 'name_display',
      render: (text, record) => (
        <Space size="middle">
          <Avatar shape="square" size="large" style={{ backgroundColor: '#f56a00' }}>
            {record.name.charAt(0)}
          </Avatar>
          <div>
            <div style={{ fontWeight: '600' }}>{record.name}</div>
            <div style={{ fontSize: '12px', color: '#888' }}>{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Mã nhân viên',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: 'Chức vụ',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={role === 'Admin' ? 'magenta' : 'geekblue'} style={{ fontWeight: '500' }}>
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Chi nhánh',
      dataIndex: 'branch',
      key: 'branch',
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button type="text" icon={<EditOutlined />} title="Chỉnh sửa" />
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
            title="Xóa" 
            onClick={() => {
              setData(data.filter(item => item.key !== record.key));
              message.success('Đã xóa nhân viên!');
            }} 
          />
          <Button type="text" icon={<LockOutlined />} title="Khóa tài khoản" />
        </Space>
      ),
    },
  ];

  // Lọc dữ liệu theo ô tìm kiếm
  const filteredData = data.filter((item) => 
    item.name.toLowerCase().includes(searchText.toLowerCase()) || 
    item.id.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ padding: '24px' }}>
      <Card
        title={<span style={{ fontSize: '20px', fontWeight: 'bold' }}>Quản lý Đội ngũ Nhân viên</span>}
        extra={
          <Space>
            <Input 
              placeholder="Tìm tên hoặc mã NV..." 
              prefix={<SearchOutlined />} 
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 250 }} 
            />
            {/* Gắn sự kiện showModal vào nút */}
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
              Thêm nhân viên
            </Button>
          </Space>
        }
        bordered={false}
        className="staff-page-card"
        style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
      >
        <Table 
          columns={columns} 
          dataSource={filteredData} 
          pagination={{ pageSize: 5 }} 
          bordered 
        />
      </Card>

      {/* MODAL THÊM NHÂN VIÊN */}
      <Modal
        title={<span style={{ fontSize: '18px' }}>Thêm nhân viên mới</span>}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null} // Ẩn footer mặc định để dùng nút trong form
        centered
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddStaff}
          style={{ marginTop: '20px' }}
        >
          <Form.Item 
            label="Họ và tên" 
            name="name" 
            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
          >
            <Input placeholder="Ví dụ: Nguyễn Văn A" />
          </Form.Item>

          <Form.Item 
            label="Email" 
            name="email" 
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <Input placeholder="Ví dụ: avana@gmail.com" />
          </Form.Item>

          <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
            <Form.Item 
              label="Mã nhân viên" 
              name="id" 
              rules={[{ required: true, message: 'Nhập mã!' }]}
            >
              <Input placeholder="VD: ST04" />
            </Form.Item>

            <Form.Item 
              label="Chức vụ" 
              name="role" 
              rules={[{ required: true, message: 'Chọn chức vụ!' }]}
              style={{ minWidth: '150px' }}
            >
              <Select placeholder="Chọn chức vụ">
                <Option value="Admin">Admin</Option>
                <Option value="Nhân viên">Nhân viên</Option>
              </Select>
            </Form.Item>
          </Space>

          <Form.Item 
            label="Chi nhánh làm việc" 
            name="branch" 
            rules={[{ required: true, message: 'Vui lòng chọn chi nhánh!' }]}
          >
            <Select placeholder="Chọn chi nhánh">
              <Option value="Chi nhánh Quận 1">Chi nhánh Quận 1</Option>
              <Option value="Chi nhánh Quận 3">Chi nhánh Quận 3</Option>
              <Option value="Chi nhánh Bình Thạnh">Chi nhánh Bình Thạnh</Option>
            </Select>
          </Form.Item>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '30px' }}>
            <Button onClick={handleCancel}>Hủy bỏ</Button>
            <Button type="primary" htmlType="submit">Xác nhận Thêm</Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default StaffPage;