import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getDataFromSessionStorage } from "../components/Util";

const SellerPrivateRoutes = ({ children }) => {
  const { user } = useSelector((state) => state.users);
  return user.role == "seller" ? children : <Navigate to="/" />;
};

export default SellerPrivateRoutes;
