import { Table, Popconfirm, Space } from "antd";
import React from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "./sellerdashboard.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allProducts, deleteProduct } from "../../../redux/slices/productSlice";
import { useEffect } from "react";
import Loader from "../../../components/Loaders/Loader";
import { useNavigate } from "react-router-dom";
function SellerDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, products, success } = useSelector((state) => state.product);
  const { token, user } = useSelector((state) => state.users);
  const [query, setQuery] = useState("");
  const unique = (data) => {
    let keys = ["name", "desc", "asin"];
    return data.filter((product) =>
      keys.some((key) => product[key]?.toLowerCase()?.includes(query))
    );
  };
  const myproducts = [
    {
      id: 1,
      name: "Dairy Milk and Products",
      desc: "This is very helpfull product",
      price: 30,
      asin: "xyz3",
    },
    {
      id: 2,
      name: "Biscuits and Products",
      desc: "This is very helpfull product",
      price: 5,
      asin: "xywez3",
    },
    {
      id: 3,
      name: "Fruits and Products",
      desc: "This is very helpfull product",
      price: 10,
      asin: "xyz3kk",
    },
  ];
  const columns = [
    {
      title: "ASIN",
      dataIndex: "asin",
      key: "asin",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      render: (record) => {
        return (
          <Space>
            <Popconfirm
              title={"Are you sure?"}
              okText="Ok"
              cancelText="Cancel"
              onConfirm={() => {
                dispatch(deleteProduct({ id: record._id, token }));
              }}
            >
              <DeleteOutlined className="icon" />
            </Popconfirm>
            <EditOutlined
              className="icon edit"
              onClick={() => {
                navigate("/seller/update-product", {
                  state: { ...record },
                });
              }}
            />
          </Space>
        );
      },
    },
  ];
  useEffect(() => {
    dispatch(allProducts({ token, sellerId: user._id }));
  }, []);
  useEffect(() => {
    if (success) {
      // dispatch(allProducts(token));
    }
  }, [success]);
  return (
    <div className="seller-dashboard">
      {loading ? <Loader /> : null}
      <div className="top-search">
        <p>
          <b>All Products</b>
        </p>
        <input
          type="text"
          placeholder="Search a Product"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Table dataSource={unique(products)} columns={columns} rowKey="asin" />
    </div>
  );
}

export default SellerDashboard;
