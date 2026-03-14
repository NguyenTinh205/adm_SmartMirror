import React, { useEffect, useState } from "react";
import { Card, Table, Tag, Typography, Button, Space } from "antd";
import { DesktopOutlined, SettingOutlined, ReloadOutlined } from "@ant-design/icons";
import { getKiosks } from "../services/kioskApi";

const { Title, Text } = Typography;

const formatLastActive = (value) => {
  if (!value) return { time: "--:--", date: "--/--/----" };

  const d = new Date(value);

  const time = d.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const date = d.toLocaleDateString("vi-VN");

  return { time, date };
};

const Kiosks = () => {
  const [kiosks, setKiosks] = useState([]);
  const [summary, setSummary] = useState({
    total: 0,
    online: 0,
    offline: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchKiosks = async () => {
    try {
      setLoading(true);
      const data = await getKiosks();

      console.log("Kiosks API:", data);

      setKiosks(data.items || []);
      setSummary(data.summary || { total: 0, online: 0, offline: 0 });
    } catch (error) {
      console.error("Lỗi tải danh sách kiosk:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKiosks();
  }, []);

  const columns = [
    {
      title: "Mã Kiosk",
      dataIndex: "code",
      key: "code",
      render: (value) => <Tag>{value}</Tag>,
    },
    {
      title: "Tên & Vị trí",
      key: "name_location",
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{record.name}</div>
          <Text type="secondary">Vị trí: {record.location || "Chưa cập nhật"}</Text>
        </div>
      ),
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (_, record) =>
        record.is_online ? (
          <Tag color="success">ONLINE</Tag>
        ) : (
          <Tag color="error">OFFLINE</Tag>
        ),
    },
    {
      title: "Hoạt động cuối",
      key: "last_active",
      render: (_, record) => {
        const x = formatLastActive(record.last_active);
        return (
          <div>
            <div>{x.time}</div>
            <Text type="secondary">{x.date}</Text>
          </div>
        );
      },
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<ReloadOutlined />}
            onClick={fetchKiosks}
          />
          <Button
            icon={<SettingOutlined />}
            type="default"
            onClick={() => {
              console.log("Cấu hình kiosk:", record);
            }}
          >
            Cấu hình
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Title level={4} style={{ margin: 0 }}>
          <DesktopOutlined /> Quản lý hệ thống Kiosk (Smart Mirror)
        </Title>

        <Text>
          <span style={{ color: "#1677ff", marginRight: 8 }}>•</span>
          Tổng {summary.online} thiết bị đang kết nối
        </Text>
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={kiosks}
        loading={loading}
        pagination={false}
      />

      {summary.offline > 0 && kiosks.some((k) => !k.is_online) && (
        <div style={{ marginTop: 16 }}>
          <Text>
            <span style={{ color: "#fa8c16", fontWeight: 600 }}>Lưu ý:</span>{" "}
            Có {summary.offline} kiosk đang offline. Vui lòng kiểm tra kết nối mạng hoặc trạng thái thiết bị.
          </Text>
        </div>
      )}
    </Card>
  );
};

export default Kiosks;