import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getDataFromSessionStorage } from "../components/Util";
import CustomerSubscription from "../screens/customer/subscription/CustomerSubscription";
const CustomerPrivateRoutes = ({ children }) => {
  const { user } = useSelector((state) => state.users);

  return user?.role == "customer" ? (
    user?.subscriptionId ? (
      children
    ) : (
      <CustomerSubscription />
    )
  ) : (
    <Navigate to="/" />
  );
};

export default CustomerPrivateRoutes;
