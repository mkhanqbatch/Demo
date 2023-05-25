import React from "react";
import "./orders.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loader from "../../../components/Loaders/Loader";
import { useNavigate } from "react-router-dom";
import CustomerOrdersTable from "../../../components/tables/customerOrders/CustomerOrdersTable";
import { customerOrder } from "../../../redux/slices/orderSlice";
function CustomerOrders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, success, orders } = useSelector((state) => state.order);
  const { token, user } = useSelector((state) => state.users);
  const [query, setQuery] = useState("");
  const unique = (data) => {
    let keys = ["orderNumber"];
    return data
      .map((order) => {
        let oNum = order.orderNumber.toString();
        return {
          ...order,
          orderNumber: oNum,
        };
      })
      .filter((order) =>
        keys.some((key) => order[key]?.toLowerCase()?.includes(query))
      );
  };

  useEffect(() => {
    dispatch(customerOrder({ token, userId: user._id }));
  }, []);
  useEffect(() => {}, [orders]);
  return (
    <div className="customer-orders">
      {loading ? <Loader /> : null}
      <div className="top-search">
        <p>
          <b>Customer Orders</b>
        </p>
        <input
          type="text"
          placeholder="Search a Order"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <CustomerOrdersTable data={unique(orders)} />
    </div>
  );
}

export default CustomerOrders;
