import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Row, Col, Tabs, Button, Badge } from 'antd';
import { ShoppingCartOutlined, ShopOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

// 1. Dữ liệu giả lập (Lấy từ bảng product_categories)
const categories = [
  { key: 'all', label: 'Tất cả' },
  { key: 'nu', label: 'Thời trang Nữ' },
  { key: 'nam', label: 'Thời trang Nam' },
  { key: 'phu-kien', label: 'Phụ kiện' },
];

// 2. Dữ liệu giả lập (Lấy từ bảng products và product_variants)
const mockProducts = [
  {
    id: 'p1',
    categoryId: 'nu',
    name: 'Váy Hoa Vintage Nhẹ Nhàng',
    price: 299000,
    sold: 124,
    img: 'https://via.placeholder.com/300x400/f7a8b8/FFFFFF?text=Vay+Hoa'
  },
  {
    id: 'p2',
    categoryId: 'nu',
    name: 'Áo Thun Basic Nữ Form Rộng',
    price: 150000,
    sold: 89,
    img: 'https://via.placeholder.com/300x400/ffcccb/000000?text=Ao+Thun'
  },
  {
    id: 'p3',
    categoryId: 'nam',
    name: 'Sơ Mi Trắng Nam Lịch Lãm',
    price: 259000,
    sold: 210,
    img: 'https://via.placeholder.com/300x400/dddddd/000000?text=So+Mi'
  },
  {
    id: 'p4',
    categoryId: 'nam',
    name: 'Quần Jeans Nam Xanh Đậm',
    price: 399000,
    sold: 45,
    img: 'https://via.placeholder.com/300x400/1e3a8a/FFFFFF?text=Jeans'
  }
];

const StorePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  // Lọc sản phẩm theo danh mục đang chọn
  const filteredProducts = activeTab === 'all' 
    ? mockProducts 
    : mockProducts.filter(p => p.categoryId === activeTab);

  // Xử lý khi bấm Mua ngay -> Đẩy sang trang Checkout
  const handleBuyNow = (product) => {
    // Trong thực tế, bạn sẽ lưu product vào State Giỏ hàng (Context/Redux)
    // Tạm thời điều hướng thẳng sang trang thanh toán
    navigate('/checkout');
  };

  return (
    <div style={{ paddingBottom: '80px', background: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header - Thanh điều hướng trên cùng */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '16px 20px', 
        background: '#fff', 
        position: 'sticky', 
        top: 0, 
        zIndex: 10,
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}>
        <Title level={4} style={{ margin: 0, color: '#1890ff' }}><ShopOutlined /> Smart Mirror</Title>
        <Badge count={2} size="small">
          <Button type="text" icon={<ShoppingCartOutlined style={{ fontSize: '24px' }} />} onClick={() => navigate('/checkout')} />
        </Badge>
      </div>

      {/* Phân loại Danh mục (Vuốt ngang trên Mobile) */}
      <div style={{ background: '#fff', padding: '0 16px', borderBottom: '1px solid #f0f0f0' }}>
        <Tabs 
          defaultActiveKey="all" 
          items={categories} 
          onChange={(key) => setActiveTab(key)}
          tabBarGutter={24}
          // Tùy chỉnh để thanh Tab có thể vuốt ngang trên điện thoại
          style={{ marginBottom: 0 }}
        />
      </div>

      {/* Lưới hiển thị Sản phẩm (2 Cột) */}
      <div style={{ padding: '16px' }}>
        <Row gutter={[12, 16]}>
          {filteredProducts.map((product) => (
            <Col span={12} key={product.id}>
              <Card
                hoverable
                cover={<img alt={product.name} src={product.img} style={{ height: '180px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }} />}
                style={{ borderRadius: '8px', overflow: 'hidden' }}
                bodyStyle={{ padding: '12px' }}
              >
                {/* Tên sản phẩm giới hạn 2 dòng */}
                <div style={{ height: '44px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', marginBottom: '8px' }}>
                  <Text strong style={{ fontSize: '13px' }}>{product.name}</Text>
                </div>
                
                {/* Giá tiền và Lượt bán */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px' }}>
                  <Text strong style={{ color: '#cf1322', fontSize: '16px' }}>
                    {product.price.toLocaleString()} đ
                  </Text>
                  <Text type="secondary" style={{ fontSize: '11px' }}>
                    Đã bán {product.sold}
                  </Text>
                </div>

                {/* Nút Mua ngay */}
                <Button 
                  type="primary" 
                  size="small" 
                  block 
                  style={{ borderRadius: '6px' }}
                  onClick={() => handleBuyNow(product)}
                >
                  Mua ngay
                </Button>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Thông báo nếu danh mục không có sản phẩm */}
        {filteredProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <Text type="secondary">Chưa có sản phẩm nào trong danh mục này.</Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default StorePage;