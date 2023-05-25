import React, { useState, useEffect } from "react";
import "./login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Radio, message } from "antd";
import profile from "../../../assets/profile.png";
//loader
import Loader from "../../Loaders/Loader";
import { logIn, setError } from "../../../redux/slices/userSlice";

import { useDispatch, useSelector } from "react-redux";
//Redux
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, token, error } = useSelector((state) => state.users);
  const onFinishLogin = async (values) => {
    dispatch(logIn(values));
  };
  useEffect(() => {
    if (user?.role == "seller") {
      navigate("/seller/dashboard");
    } else if (user?.role == "customer") {
      navigate("/customer/dashboard");
    }
  }, [user]);
  useEffect(() => {
    if (error) {
      message.error(error.error);
      dispatch(setError());
    }
  }, [error]);
  return (
    <div className="main_login_div">
      {/* {loading ? <Loader /> : ""} */}
      <div className="login_background_div">
        <div className="login_content_div">
          <div className="login_wlp_div"></div>
          <div className="login_form_div">
            <div className="login_form_content_div">
              <div className="login_form_content_upper_div">
                <div className="login_form_content_upper_logo_div">
                  <div className="logo_div">
                    <img className="logo_img" src={profile} />
                  </div>
                </div>
              </div>
              <div className="login_form_content_from_div">
                <div className="form_div">
                  <div>
                    <h2 style={{ textAlign: "center" }}>
                      {"Welcome to Login Page"}
                    </h2>
                  </div>
                  <br />
                  <br />
                  <>
                    <Form
                      name="normal_login"
                      className="login-form"
                      onFinish={onFinishLogin}
                    >
                      <Form.Item
                        name="email"
                        hasFeedback
                        rules={[
                          {
                            type: "email",
                            message: "Enter a valid email",
                          },
                          {
                            required: true,
                            message: "Email is required",
                          },
                        ]}
                      >
                        <Input
                          type="email"
                          prefix={
                            <MailOutlined className="site-form-item-icon" />
                          }
                          placeholder="Enter email"
                        />
                      </Form.Item>
                      <Form.Item
                        name="password"
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Password is required",
                          },
                          {
                            min: 8,
                            message: "Password min 8 character long",
                          },
                        ]}
                      >
                        <Input.Password
                          prefix={
                            <LockOutlined className="site-form-item-icon" />
                          }
                          type="password"
                          placeholder="Enter password"
                          minLength={8}
                        />
                      </Form.Item>

                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="login-form-button submit_btn"
                        >
                          {loading ? <b>loading...</b> : <b>Login</b>}
                        </Button>
                      </Form.Item>
                    </Form>
                    <p>
                      New to Demo Store ?{" "}
                      <NavLink to="/signup">Join Now</NavLink>
                    </p>
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
