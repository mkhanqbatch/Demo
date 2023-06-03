import { Table, Popconfirm, Space, Dropdown } from "antd";
import React, { useState } from "react";
import { DownOutlined, EyeOutlined } from "@ant-design/icons";
import OrderDetails from "../../modals/OrderDetails";
import {
  updateOrderStatus,
  sellerOrder,
} from "../../../redux/slices/orderSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
function SellerOrdersTable({ data: tableData }) {
  // console.log("table data ", tableData);
  const { loading } = useSelector((state) => state.order);
  const { token, user } = useSelector((state) => state.users);
  const [showOrdersDetails, setShowOrdersDetails] = useState(false);
  const [updatedFlag, setUpdatedFlag] = useState(1);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [orderInfo, setOrderInfo] = useState(null);
  const dropHandler = ({ key }, order) => {
    dispatch(updateOrderStatus({ token, orderId: order._id, status: key }));
    setUpdatedFlag(updatedFlag + 1);
  };
  const columns = [
    {
      title: "Order#",
      dataIndex: "orderNumber",
      key: "orderNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "User name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Order Status",
      render: (record) => {
        let items = [
          { key: "Pending", label: "Pending" },
          { key: "InProgress", label: "InProgress" },
          { key: "Dispatched", label: "Dispatched" },
          { key: "Delivered", label: "Delivered" },
        ];
        return (
          <Dropdown
            menu={{ items, onClick: (e) => dropHandler(e, record) }}
            trigger={["click"]}
          >
            <Space>
              {record.status}
              <DownOutlined />
            </Space>
          </Dropdown>
        );
      },
    },
    {
      title: "Action",
      render: (record) => {
        return (
          <Space>
            <EyeOutlined
              className="icon"
              onClick={() => {
                setOrderInfo(record);
                setShowOrdersDetails(true);
              }}
            />
          </Space>
        );
      },
    },
  ];
  useEffect(() => {
    setData(tableData);
  }, [tableData]);
  useEffect(() => {
    dispatch(sellerOrder({ token, sellerId: user._id }));
  }, [updatedFlag]);
  return (
    <>
      {showOrdersDetails ? (
        <OrderDetails
          showOrdersDetails={showOrdersDetails}
          setShowOrdersDetails={setShowOrdersDetails}
          orderInfo={orderInfo}
        />
      ) : null}
      <Table dataSource={data} columns={columns} rowKey="orderNumber" />
    </>
  );
}

export default SellerOrdersTable;
