import { Table, Popconfirm, Space } from "antd";
import React from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
function CustomerOrdersTable({ data }) {
  const columns = [
    {
      title: "Order#",
      dataIndex: "orderNumber",
      key: "orderNumber",
    },
    {
      title: "Products",
      render: (record) => {
        return record.products.map((pro) => pro.name).join(",");
      },
    },
    {
      title: "Total Amount",
      render: (record) => {
        return <span>{record.amount}.00 $</span>;
      },
    },
    {
      title: "Status",
      render: (record) => {
        return (
          <span>{record.orderStatus.filter((val) => val.status)[0].label}</span>
        );
      },
    },
  ];
  return <Table dataSource={data} columns={columns} rowKey="asin" />;
}

export default CustomerOrdersTable;
