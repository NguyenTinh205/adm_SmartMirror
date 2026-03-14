import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  List,
  Avatar,
  Tag,
  Typography,
  theme,
} from "antd";
import axios from "axios";
import {
  SkinOutlined,
  WarningOutlined,
  DesktopOutlined,
  ArrowUpOutlined,
  UserOutlined,
  HistoryOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const Dashboard = () => {
  const { token } = theme.useToken();

  const [data, setData] = useState({
    total_products: 0,
    need_variants: 0,
    kiosks_online: 0,
    total_kiosks: 0,
    total_users: 0,
    recent_activities: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get("http://localhost:3000/api/admin/dashboard");

        console.log("Dashboard API:", res.data);

        setData({
          total_products: res.data?.summary?.total_products || 0,
          need_variants: res.data?.summary?.need_variants || 0,
          kiosks_online: res.data?.summary?.kiosks_online || 0,
          total_kiosks: res.data?.summary?.total_kiosks || 0,
          total_users: res.data?.summary?.total_users || 0,
          recent_activities: res.data?.recent_activities || [],
        });
      } catch (err) {
        console.error("Lỗi load dashboard:", err);
        setError("Không thể tải dữ liệu dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="p-0">
      <Title level={3} style={{ marginBottom: 24 }}>
        Tổng quan hệ thống Smart Mirror
      </Title>

      {error && (
        <div style={{ marginBottom: 16 }}>
          <Text type="danger">{error}</Text>
        </div>
      )}

      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            className="shadow-sm border-b-4"
            style={{ borderBottomColor: "#1890ff" }}
          >
            <Statistic
              title={<Text type="secondary">Tổng sản phẩm</Text>}
              value={data.total_products}
              prefix={<SkinOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
            <Text type="secondary" style={{ fontSize: "12px" }}>
              Dữ liệu lấy từ PostgreSQL <ArrowUpOutlined />
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            className="shadow-sm border-b-4"
            style={{ borderBottomColor: "#cf1322" }}
          >
            <Statistic
              title={<Text type="secondary">Cần thêm biến thể</Text>}
              value={data.need_variants}
              prefix={<WarningOutlined />}
              valueStyle={{ color: "#cf1322" }}
            />
            <Text type="danger" strong>
              Sản phẩm chưa có biến thể
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            className="shadow-sm border-b-4"
            style={{ borderBottomColor: "#3f8600" }}
          >
            <Statistic
              title={<Text type="secondary">Kiosk Online</Text>}
              value={data.kiosks_online}
              suffix={`/ ${data.total_kiosks}`}
              prefix={<DesktopOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
            <Text type="secondary" style={{ fontSize: "12px" }}>
              Tổng số kiosk trong hệ thống
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            className="shadow-sm border-b-4"
            style={{ borderBottomColor: "#722ed1" }}
          >
            <Statistic
              title={<Text type="secondary">Khách hàng</Text>}
              value={data.total_users}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#722ed1" }}
            />
            <Text type="secondary" style={{ fontSize: "12px" }}>
              Tổng user trong database
            </Text>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card
            title="Thống kê lượt thử đồ AI"
            className="shadow-sm h-full"
            extra={<Tag color="blue">Hàng tuần</Tag>}
          >
            <div
              className="h-64 flex flex-col items-center justify-center rounded-lg border border-dashed"
              style={{
                backgroundColor: token.colorFillAlter,
                borderColor: token.colorBorder,
              }}
            >
              {loading ? (
                <Text type="secondary">Đang tải dữ liệu từ API...</Text>
              ) : (
                <>
                  <span className="text-4xl mb-2">📊</span>
                  <Text type="secondary">
                    Khu vực này có thể nối thêm biểu đồ sau
                  </Text>
                </>
              )}
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title={
              <span>
                <HistoryOutlined /> Hoạt động gần đây
              </span>
            }
            className="shadow-sm h-full"
          >
            <List
              itemLayout="horizontal"
              dataSource={data.recent_activities}
              locale={{ emptyText: "Chưa có hoạt động gần đây" }}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        icon={<UserOutlined />}
                        style={{ backgroundColor: token.colorFillContent }}
                      />
                    }
                    title={<Text strong>{item.user || "Hệ thống"}</Text>}
                    description={
                      <span>
                        <Text type="secondary">{item.action || "Hoạt động"}</Text>{" "}
                        <Text type="primary">{item.target || ""}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: "11px" }}>
                          {item.time || ""}
                        </Text>
                      </span>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;