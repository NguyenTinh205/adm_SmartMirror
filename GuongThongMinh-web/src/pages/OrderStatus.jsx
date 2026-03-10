import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Result, Button, Card, Typography } from 'antd';

const { Text } = Typography;

const OrderStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Đọc tham số status từ URL
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get('status'); 

  // Kích hoạt Deep Link để quay về App Mobile
  const handleReturnApp = () => {
    navigate('/storepage');
  };

  if (status === 'success') {
    return (
      <div style={{ height: '100vh', background: '#fff', paddingTop: '60px' }}>
        <Result
          status="success"
          title="Thanh toán thành công!"
          subTitle="Đơn hàng của bạn đã được ghi nhận."
          extra={[
            <Card size="small" style={{ background: '#f5f5f5', borderRadius: '8px', marginBottom: '24px', textAlign: 'left' }} key="bill">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <Text type="secondary">Mã giao dịch</Text>
                <Text strong>TXN-{Date.now().toString().slice(-6)}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text type="secondary">Số tiền</Text>
                <Text strong style={{ color: '#52c41a' }}>+ 648,000 đ</Text>
              </div>
            </Card>,
            <Button type="primary" size="large" block key="app" onClick={handleReturnApp} style={{ height: '48px', borderRadius: '8px' }}>
              Quay lại Ứng dụng
            </Button>
          ]}
        />
      </div>
    );
  }

  // Trạng thái Thất bại / Hủy
  return (
    <div style={{ height: '100vh', background: '#fff', paddingTop: '60px' }}>
      <Result
        status="error"
        title="Giao dịch không thành công"
        subTitle="Có thể số dư không đủ hoặc bạn đã hủy giao dịch."
        extra={[
          <Button type="primary" size="large" block key="retry" onClick={() => navigate('/checkout')} style={{ height: '48px', borderRadius: '8px', marginBottom: '12px' }}>
            Thử thanh toán lại
          </Button>,
          <Button size="large" block type="text" key="cancel" onClick={handleReturnApp}>
            Hủy và Về Ứng Dụng
          </Button>
        ]}
      />
    </div>
  );
};

export default OrderStatus;