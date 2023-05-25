import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { getDataFromSessionStorage } from "../components/Util";
import Login from "../components/auth/login/Login";
import Signup from "../components/auth/signup/Signup";
import CustomerDashboard from "../screens/customer/customerDashboard/CustomerDashboard";
import CustomerPrivateRoutes from "./CustomerPrivateRoutes";
import SellerPrivateRoutes from "./SellerPrivateRoutes";
import AddProduct from "../screens/seller/addproduct/AddProduct";
import SellerDashboard from "../screens/seller/sellerdashboard/SellerDashboard";
import SellerLayout from "../Layout/seller/SellerLayout";
import CustomerLayout from "../Layout/customer/CustomerLayout";
import CustomerCart from "../screens/customer/customerCart/CustomerCart";
import { useSelector } from "react-redux";
import UpdateProduct from "../screens/seller/updateproduct/UpdateProduct";
import CustomerOrders from "../screens/customer/customerOrder/CustomerOrders";
import SellerOrders from "../screens/seller/orders/SellerOrders";
import CustomerSubscription from "../screens/customer/subscription/CustomerSubscription";
import CheckoutForm from "../screens/customer/checkout/CheckoutForm";
import UploadFile from "../screens/seller/addproduct/UploadFile";
export default function AppRoutes() {
  const { user } = useSelector((state) => state.users);
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              user?.role == "seller" ? (
                <Navigate to={"/seller/dashboard"} />
              ) : user?.role == "customer" ? (
                <Navigate to={"/customer/dashboard"} />
              ) : (
                <Login />
              )
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/customer/subscription"
            element={
              <CustomerPrivateRoutes>
                <CustomerSubscription />
              </CustomerPrivateRoutes>
            }
          />
          <Route path="/customer/checkout" element={<CheckoutForm />} />
          <Route
            path="/customer/dashboard"
            element={
              <CustomerPrivateRoutes>
                <CustomerLayout>
                  <CustomerDashboard />
                </CustomerLayout>
              </CustomerPrivateRoutes>
            }
          />
          <Route
            path="/customer/cart"
            element={
              <CustomerPrivateRoutes>
                <CustomerLayout>
                  <CustomerCart />
                </CustomerLayout>
              </CustomerPrivateRoutes>
            }
          />
          <Route
            path="/customer/orders"
            element={
              <CustomerPrivateRoutes>
                <CustomerLayout>
                  <CustomerOrders />
                </CustomerLayout>
              </CustomerPrivateRoutes>
            }
          />
          {/* seller routes */}

          <Route
            path="/seller/dashboard"
            element={
              <SellerPrivateRoutes>
                <SellerLayout>
                  <SellerDashboard />
                </SellerLayout>
              </SellerPrivateRoutes>
            }
          ></Route>
          <Route
            path="/seller/add-product"
            element={
              <SellerPrivateRoutes>
                <SellerLayout>
                  <AddProduct />
                </SellerLayout>
              </SellerPrivateRoutes>
            }
          ></Route>
          <Route
            path="/seller/upload-file"
            element={
              <SellerPrivateRoutes>
                <SellerLayout>
                  <UploadFile />
                </SellerLayout>
              </SellerPrivateRoutes>
            }
          ></Route>
          <Route
            path="/seller/update-product"
            element={
              <SellerPrivateRoutes>
                <SellerLayout>
                  <UpdateProduct />
                </SellerLayout>
              </SellerPrivateRoutes>
            }
          ></Route>
          <Route
            path="/seller/orders"
            element={
              <SellerPrivateRoutes>
                <SellerLayout>
                  <SellerOrders />
                </SellerLayout>
              </SellerPrivateRoutes>
            }
          />
        </Routes>
      </Router>
    </>
  );
}
