import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Processing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Tự động kích hoạt khi vào trang này
    // Giả lập thời gian chờ cổng thanh toán (Momo/VNPay) xử lý là 2 giây
    const timer = setTimeout(() => {
      // Sau 2 giây, tự động đá sang trang trạng thái thành công
      navigate('/order/status?status=success');
    }, 2000);

    // Dọn dẹp bộ nhớ nếu người dùng tắt ngang
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      padding: '20px',
      background: '#fff'
    }}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: '#1890ff' }} spin />} />
      <Title level={4} style={{ marginTop: '24px' }}>Đang xử lý giao dịch...</Title>
      <Text type="secondary" style={{ textAlign: 'center' }}>
        Hệ thống đang kết nối với cổng thanh toán.<br/>Vui lòng không đóng trình duyệt lúc này.
      </Text>
    </div>
  );
};

export default Processing;