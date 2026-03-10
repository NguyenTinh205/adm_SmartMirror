import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Radio, List, Avatar, Typography, Divider, Space } from 'antd';
import { ShopOutlined, SafetyCertificateFilled, CreditCardOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('momo');

  // Dữ liệu giả lập (Thực tế sẽ gọi API dựa vào ?token=... trên URL để lấy)
  const orderData = {
    orderId: 'ORD-889922',
    totalAmount: 648000,
    items: [
      { id: 1, name: 'Váy Maxi Hoa Nhí (Size M)', price: 349000, qty: 1, img: 'https://via.placeholder.com/60' },
      { id: 2, name: 'Sơ Mi Trắng Nam (Size L)', price: 299000, qty: 1, img: 'https://via.placeholder.com/60' }
    ]
  };

  const handlePay = () => {
    // Chuyển sang trang Processing giả lập việc gọi API tạo link thanh toán
    navigate('/payment/callback?status=success'); 
  };

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Header an toàn */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 20px', background: '#fff', position: 'sticky', top: 0, zIndex: 10 }}>
        <Title level={5} style={{ margin: 0 }}><ShopOutlined /> Thanh toán Đơn hàng</Title>
        <SafetyCertificateFilled style={{ color: '#52c41a', fontSize: '20px' }} />
      </div>

      <div style={{ padding: '16px' }}>
        {/* Chức năng 1: Load SP (Giỏ hàng) */}
        <Card size="small" title={<Text type="secondary">Mã đơn: {orderData.orderId}</Text>} style={{ borderRadius: '12px', marginBottom: '16px' }}>
          <List
            itemLayout="horizontal"
            dataSource={orderData.items}
            renderItem={item => (
              <List.Item style={{ padding: '8px 0', border: 'none' }}>
                <List.Item.Meta
                  avatar={<Avatar src={item.img} shape="square" size={48} />}
                  title={<Text style={{ fontSize: '14px' }}>{item.name}</Text>}
                  description={`x${item.qty}`}
                />
                <Text strong>{item.price.toLocaleString()} đ</Text>
              </List.Item>
            )}
          />
          <Divider style={{ margin: '12px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text strong>Tổng thanh toán</Text>
            <Text strong style={{ fontSize: '18px', color: '#cf1322' }}>{orderData.totalAmount.toLocaleString()} đ</Text>
          </div>
        </Card>

        {/* Chức năng 2: Xử lý thanh toán */}
        <Title level={5}>Phương thức thanh toán</Title>
        <Radio.Group onChange={(e) => setPaymentMethod(e.target.value)} value={paymentMethod} style={{ width: '100%' }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Card size="small" hoverable style={{ borderColor: paymentMethod === 'momo' ? '#d82d8b' : '#f0f0f0', borderRadius: '12px' }} onClick={() => setPaymentMethod('momo')}>
              <Radio value="momo"><Text strong style={{ marginLeft: 8 }}>Ví MoMo</Text></Radio>
            </Card>
            <Card size="small" hoverable style={{ borderColor: paymentMethod === 'vnpay' ? '#005baa' : '#f0f0f0', borderRadius: '12px' }} onClick={() => setPaymentMethod('vnpay')}>
              <Radio value="vnpay"><Text strong style={{ marginLeft: 8 }}>VNPay QR</Text></Radio>
            </Card>
            <Card size="small" hoverable style={{ borderColor: paymentMethod === 'atm' ? '#1890ff' : '#f0f0f0', borderRadius: '12px' }} onClick={() => setPaymentMethod('atm')}>
              <Radio value="atm"><CreditCardOutlined style={{ marginLeft: 8, marginRight: 8, color: '#1890ff' }}/><Text strong>Thẻ Ngân Hàng</Text></Radio>
            </Card>
          </Space>
        </Radio.Group>
      </div>

      {/* Nút thanh toán cố định dưới đáy */}
      <div style={{ position: 'fixed', bottom: 0, width: '100%', maxWidth: '480px', padding: '16px', background: '#fff', boxShadow: '0 -2px 10px rgba(0,0,0,0.05)' }}>
        <Button type="primary" size="large" block onClick={handlePay} style={{ height: '48px', borderRadius: '8px', fontSize: '16px' }}>
          Xác nhận {orderData.totalAmount.toLocaleString()} đ
        </Button>
      </div>
    </div>
  );
};

export default CheckoutPage;