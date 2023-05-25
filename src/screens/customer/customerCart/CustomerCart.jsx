import React, { useState } from "react";
import "./customercart.scss";
import productImg from "../../../assets/product.png";
import { Row, Col, Button, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import {
  setTotalPrice,
  setCartItems,
  resetCart,
} from "../../../redux/slices/cartSlice";
import TextArea from "antd/es/input/TextArea";
import {
  newOrder,
  setError,
  setSuccess,
} from "../../../redux/slices/orderSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function CustomerCart() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { cartItems: cartProducts, totalPrice } = useSelector(
    (state) => state.cart
  );
  const { token, user } = useSelector((state) => state.users);
  const { error, success, loading } = useSelector((state) => state.order);
  const addProductToCart = (product) => {
    let oldProduct = cartProducts?.find((p) => p._id == product._id);
    if (oldProduct) {
      let updatePro = { ...oldProduct };
      updatePro.q++;
      let index = cartProducts.findIndex((val) => val._id == product._id);
      let arr = [...cartProducts];
      arr.splice(index, 1, updatePro);
      dispatch(setTotalPrice(totalPrice + product.price));
      dispatch(setCartItems(arr));
    } else {
      console.log("xx");
      let arr = [...cartProducts];
      arr.push({
        ...product,
        q: 1,
      });
      dispatch(setTotalPrice(totalPrice + product.price));
      dispatch(setCartItems(arr));
    }
  };
  const removeProductFromCart = (product) => {
    let oldProduct = cartProducts?.find((p) => p._id == product._id);
    if (oldProduct) {
      let updatePro = { ...oldProduct };
      if (updatePro.q > 1) {
        updatePro.q--;
        let index = cartProducts.findIndex((val) => val._id == product._id);
        let arr = [...cartProducts];
        arr.splice(index, 1, updatePro);
        dispatch(setCartItems(arr));
        dispatch(setTotalPrice(totalPrice - product?.price));
      } else {
        let index = cartProducts.findIndex((val) => val._id == product._id);
        let arr = [...cartProducts];
        arr.splice(index, 1);
        dispatch(setCartItems(arr));
        dispatch(setTotalPrice(totalPrice - product?.price));
      }
    }
  };
  const handleCheckOut = (values) => {
    const { address } = values;
    let products = cartProducts.map((p) => {
      return { asin: p.asin, sellerId: p.sellerId };
    });
    dispatch(
      newOrder({
        userId: user._id,
        products,
        totalAmount: totalPrice,
        subTotal: totalPrice,
        discount: 0,
        address,
        orderNumber: Date.now(),
        token,
      })
    );
  };
  const [isCheckout, setIsCheckout] = useState(false);
  useEffect(() => {
    if (success) {
      message.success("Order is created Successfully.");
      navigate("/customer/orders");
      dispatch(setSuccess());
      dispatch(resetCart());
    }
  }, [success]);
  useEffect(() => {
    if (error) {
      message.error(error.error);
      dispatch(setError());
    }
  }, [error]);
  return (
    <div className="customer-cart">
      <h3>Customer Cart</h3>
      {cartProducts?.length > 0 ? (
        <div className="products">
          {cartProducts?.map((prod) => {
            let product = prod;
            return (
              <div className="product" key={product._id}>
                <img src={productImg} />
                <div className="details">
                  <p>
                    <b>{product.name}</b>
                  </p>
                  <p>{product.desc}</p>
                  <p className="price">$ {product.price}.00</p>
                </div>
                <div className="add-remove-cart">
                  <div
                    className="btn rmv"
                    onClick={() => removeProductFromCart(product)}
                  >
                    -
                  </div>
                  <p>{product?.q}</p>
                  <div
                    className="btn add"
                    onClick={() => addProductToCart(product)}
                  >
                    +
                  </div>
                </div>
              </div>
            );
          })}
          {!isCheckout ? (
            <div className="check-out">
              <div className="row">
                <p>
                  <b>Sub Total</b>
                </p>
                <p>$ {totalPrice}.00</p>
              </div>
              <div className="row">
                <p
                  className="check-out-btn"
                  onClick={() => setIsCheckout(true)}
                >
                  Check Out
                </p>
              </div>
            </div>
          ) : (
            <div className="check-out-details">
              <br />
              <p>
                <b>Checkout details:</b>
              </p>
              <br />
              <Form
                form={form}
                layout="vertical"
                className=""
                onFinish={handleCheckOut}
              >
                <Row>
                  <Col span={24}>
                    <Form.Item
                      label="Address"
                      name="address"
                      rules={[
                        {
                          required: true,
                          message: "Address is required",
                        },
                      ]}
                    >
                      <TextArea
                        rows={4}
                        className="input-primary"
                        placeholder="Enter address"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row
                  justify="space-between"
                  style={{ backgroundColor: "lightGray", padding: "5px" }}
                >
                  <Col span={10}>
                    <b>
                      <span>Sub Total:</span>
                    </b>
                    <span>&nbsp;{totalPrice}.00 $</span>
                  </Col>
                  <Col span={10}>
                    <b>
                      <span>Discount:</span>
                    </b>
                    <span>&nbsp;0.0 $</span>
                  </Col>
                </Row>
                <Row
                  justify="space-between"
                  style={{ backgroundColor: "lightGray", padding: "5px" }}
                >
                  <Col span={10}>
                    <b>
                      <span>Total :</span>
                    </b>
                    <span>&nbsp;{totalPrice}.00$</span>
                  </Col>
                  <Col span={10}></Col>
                </Row>
                <br />
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button submit_btn"
                    disabled={loading}
                  >
                    {!loading ? "Checkout" : "Loading..."}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          )}
        </div>
      ) : (
        <p style={{ color: "red" }}>
          Currently there is no product in the CART.
        </p>
      )}
    </div>
  );
}

export default CustomerCart;
