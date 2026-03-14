import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Tag,
  Button,
  Space,
  Typography,
  message,
  Input
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined
} from "@ant-design/icons";
import axios from "axios";

const { Title } = Typography;

const ProductPage = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search,setSearch] = useState("");

  const fetchProducts = async () => {
    try {

      setLoading(true);

      const res = await axios.get(
        "http://localhost:3000/api/admin/products"
      );

      if (res.data.success) {
        setProducts(res.data.items || []);
      } else {
        message.error("Không tải được sản phẩm");
      }

    } catch (error) {
      console.error(error);
      message.error("Lỗi server");

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [

    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      render: (text) => <b>{text}</b>
    },

    {
      title: "Danh mục",
      dataIndex: "category_name",
      render:(v)=>(
        <Tag color="purple">{v || "N/A"}</Tag>
      )
    },

    {
      title: "Biến thể",
      render: (_, record) => {

        if (!record.variants || record.variants.length === 0) {
          return <Tag color="default">No Variant</Tag>;
        }

        return (
          <Space wrap>
            {record.variants.map((variant) => (
              <Tag
                key={variant.id}
                color="blue"
              >
                {variant.size} - {variant.color}
              </Tag>
            ))}
          </Space>
        );
      },
    },

    {
      title: "Status",
      dataIndex:"status",
      render:(v)=>(
        <Tag color={v==="active"?"green":"red"}>
          {v}
        </Tag>
      )
    },

    {
      title: "Action",
      render: (_, record) => (
        <Space>

          <Button
            icon={<EditOutlined/>}
            type="default"
          >
            Edit
          </Button>

          <Button
            danger
            icon={<DeleteOutlined/>}
          >
            Delete
          </Button>

        </Space>
      ),
    },
  ];

  return (
    <Card
      style={{
        borderRadius:10
      }}
    >

      <Space
        style={{
          width:"100%",
          justifyContent:"space-between",
          marginBottom:20
        }}
      >

        <Title level={3} style={{margin:0}}>
          Product Management
        </Title>

        <Space>

          <Input
            placeholder="Search product..."
            prefix={<SearchOutlined/>}
            onChange={(e)=>setSearch(e.target.value)}
            style={{width:220}}
          />

          <Button
            type="primary"
            icon={<PlusOutlined/>}
          >
            Add Product
          </Button>

        </Space>

      </Space>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredProducts}
        loading={loading}
        bordered
        pagination={{
          pageSize:8
        }}
      />

    </Card>
  );
};

export default ProductPage;