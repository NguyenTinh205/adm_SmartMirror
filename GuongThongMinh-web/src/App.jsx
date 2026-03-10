import React from 'react';
// Thêm chữ Navigate vào đây
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import CheckoutPage from './pages/CheckoutPage';
import Processing from './pages/Processing';
import OrderStatus from './pages/OrderStatus';
import StorePage from './pages/StorePage';
function App() {
  return (
    <div style={{ background: '#f0f2f5', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '480px', background: '#fafafa', position: 'relative', minHeight: '100vh', boxShadow: '0 0 20px rgba(0,0,0,0.05)' }}>
        <Router>
          <Routes>
            
            <Route path="/" element={<Navigate to="/checkout" replace />} />

            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/payment/callback" element={<Processing />} />
            <Route path="/order/status" element={<OrderStatus />} />
            <Route path="/storepage" element={<StorePage />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}
//<StorePage />
export default App;