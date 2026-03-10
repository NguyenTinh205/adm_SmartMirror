import React, { useState } from 'react';
import { 
  Table, Button, Tag, Space, Modal, Form, Input, InputNumber, 
  Select, Card, Row, Col, Typography, Divider, message 
} from 'antd';
import { PlusOutlined, DeleteOutlined, LinkOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { Option } = Select;

// Dữ liệu mẫu (Đã chuyển thành định dạng mảng chuẩn)
const initialProducts = [
  {
    "id": "1c34a283-9d30-44f1-aa62-ffea1141433c",
    "name": "Váy Trắng Công Sở",
    "description": "Váy trắng thanh lịch cho môi trường công sở",
    "variants": [
      {
        "id": "3f846c76-821f-4ec8-b81a-a3554187ee18",
        "sku": "SKU-VAY-CONGSO-001-M-WHITE",
        "size": "M",
        "color": "Trắng",
        "price": 329000.00,
        "stock": 9,
      }
    ]
  },
  {
    "id": "2c17e5c2-905d-4f06-9c4a-82f392bbd6df",
    "name": "Váy Đen Dự Tiệc",
    "description": "Váy đen dáng ôm sang trọng",
    "variants": []
  }
];

const ProductPage = () => {
  // 1. Chuyển dữ liệu thành State để có thể cập nhật
  const [products, setProducts] = useState(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Xử lý khi Submit Form
  const handleAddProduct = (values) => {
    // values chứa cả thông tin sản phẩm và mảng variants
    const newProduct = {
      id: `NEW-PROD-${Date.now()}`, // Giả lập UUID của DB
      name: values.name,
      description: values.description,
      variants: values.variants ? values.variants.map((v, index) => ({
        id: `NEW-VAR-${Date.now()}-${index}`,
        sku: v.sku || `SKU-AUTO-${Date.now().toString().slice(-4)}`, // Tự sinh SKU nếu bỏ trống
        size: v.size,
        color: v.color,
        price: v.price || 0,
        stock: v.stock || 0,
        model_3d_url: v.model_3d_url || "",
      })) : [] // Nếu không thêm biến thể nào thì là mảng rỗng
    };

    // Thêm vào bảng
    setProducts([newProduct, ...products]);
    message.success('Thêm sản phẩm thành công!');
    
    // Đóng và reset form
    setIsModalOpen(false);
    form.resetFields();
  };

  const columns = [
    { title: 'Tên sản phẩm', dataIndex: 'name', key: 'name', render: (text) => <b>{text}</b> },
    { 
      title: 'Biến thể', 
      dataIndex: 'variants', 
      key: 'variants',
      render: (variants) => (
        <Space size={[0, 8]} wrap>
          {variants && variants.length > 0 ? (
            variants.map(v => (
              <Tag key={v.id} color="blue">{v.size} - {v.color}</Tag>
            ))
          ) : <Text type="secondary">Chưa có biến thể</Text>}
        </Space>
      )
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link">Sửa</Button>
          <Button type="link" danger onClick={() => {
            setProducts(products.filter(p => p.id !== record.id));
            message.success('Đã xóa sản phẩm!');
          }}>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <h2 style={{ margin: 0 }}>Quản lý Danh mục & Sản phẩm</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
          Thêm sản phẩm mới
        </Button>
      </div>

      <Card bordered={false} className="shadow-sm" style={{ borderRadius: '12px' }}>
        <Table dataSource={products} columns={columns} rowKey="id" />
      </Card>

      {/* MODAL THÊM SẢN PHẨM & BIẾN THỂ */}
      <Modal 
        title={<span style={{ fontSize: '18px' }}>Thêm Sản Phẩm & Biến Thể Mới</span>}
        open={isModalOpen} 
        onCancel={() => { setIsModalOpen(false); form.resetFields(); }} 
        footer={null}
        width={800} // Mở rộng Modal vì form biến thể cần nhiều diện tích
        centered
        style={{ top: 20 }}
      >
        <Form 
          form={form} 
          layout="vertical" 
          onFinish={handleAddProduct}
          style={{ maxHeight: '70vh', overflowY: 'auto', overflowX: 'hidden', paddingRight: '8px' }}
        >
          {/* PHẦN 1: THÔNG TIN CHUNG (Bảng Products) */}
          <Divider orientation="left">Thông tin chung</Divider>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Tên sản phẩm" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
                <Input placeholder="Ví dụ: Váy Maxi Hoa Nhí" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Mô tả sản phẩm" name="description">
                <Input.TextArea rows={3} placeholder="Nhập mô tả chi tiết..." />
              </Form.Item>
            </Col>
          </Row>

          {/* PHẦN 2: BIẾN THỂ (Bảng Product_Variants) */}
          <Divider orientation="left">Cấu hình Biến thể (Size, Màu, Giá...)</Divider>
          
          <Form.List name="variants">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Card 
                    key={key} 
                    size="small" 
                    style={{ marginBottom: 16, backgroundColor: '#f9f9f9', border: '1px dashed #d9d9d9' }}
                    title={`Biến thể ${name + 1}`}
                    extra={<Button type="text" danger icon={<DeleteOutlined />} onClick={() => remove(name)}>Xóa</Button>}
                  >
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item {...restField} name={[name, 'sku']} label="Mã SKU">
                          <Input placeholder="Tự sinh nếu để trống" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item {...restField} name={[name, 'size']} label="Kích cỡ (Size)" rules={[{ required: true, message: 'Chọn Size' }]}>
                          <Select placeholder="Chọn Size">
                            <Option value="S">S</Option>
                            <Option value="M">M</Option>
                            <Option value="L">L</Option>
                            <Option value="XL">XL</Option>
                            <Option value="FreeSize">FreeSize</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item {...restField} name={[name, 'color']} label="Màu sắc" rules={[{ required: true, message: 'Nhập màu' }]}>
                          <Input placeholder="VD: Trắng, Đen, Hồng..." />
                        </Form.Item>
                      </Col>
                    </Row>
                    
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item {...restField} name={[name, 'price']} label="Giá bán (VNĐ)" rules={[{ required: true, message: 'Nhập giá' }]}>
                          <InputNumber
                            style={{ width: '100%' }}
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            min={0}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item {...restField} name={[name, 'stock']} label="Tồn kho" rules={[{ required: true, message: 'Nhập số lượng' }]}>
                          <InputNumber style={{ width: '100%' }} min={0} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item {...restField} name={[name, 'model_3d_url']} label="Link File 3D (.glb)">
                          <Input prefix={<LinkOutlined />} placeholder="https://..." />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                ))}
                
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{ height: '40px' }}>
                    Thêm biến thể mới
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Divider />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <Button onClick={() => setIsModalOpen(false)}>Hủy bỏ</Button>
            <Button type="primary" htmlType="submit" size="large">Lưu Sản Phẩm</Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductPage;