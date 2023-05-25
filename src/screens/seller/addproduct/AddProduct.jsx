import React from "react";
import "./addproduct.scss";
import { Button, Checkbox, Form, Input, Radio, Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loaders/Loader";
import {
  addProduct,
  setError,
  setSucess,
} from "../../../redux/slices/productSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function AddProduct() {
  const navigate = useNavigate();
  const { loading, success, error } = useSelector((state) => state.product);
  const { token, user } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const handleAddProduct = (values) => {
    dispatch(addProduct({ ...values, token, sellerId: user._id }));
  };
  useEffect(() => {
    if (success) {
      form.resetFields();
      message.success("Product is Added");
      dispatch(setSucess());
    }
  }, [success]);
  useEffect(() => {
    if (error) {
      message.error(error.err.error);
      dispatch(setError());
    }
  }, [error]);
  return (
    <div className="add-product">
      {/* {loading ? <Loader /> : null} */}
      <div className="product-info">
        <h4>New Product Form.</h4>
        <p>
          <b>-OR-</b>
        </p>
        <p className="upload" onClick={() => navigate("/seller/upload-file")}>
          Upload File
        </p>
      </div>
      <div className="new-product">
        <Form
          form={form}
          layout="vertical"
          className=""
          onFinish={handleAddProduct}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Name is required",
              },
            ]}
          >
            <Input className="input-primary" placeholder="product name" />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Price is required",
              },
            ]}
          >
            <Input
              className="input-primary"
              placeholder="product price"
              type="number"
            />
          </Form.Item>
          <Form.Item
            label="ASIN"
            name="asin"
            rules={[
              {
                required: true,
                message: "ASIN is required",
              },
            ]}
          >
            <Input className="input-primary" placeholder="product ASIN" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Description is required",
              },
            ]}
          >
            <Input
              className="input-primary"
              placeholder="product description"
              value="a"
            />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" className="btn-primary" type="primary">
              {loading ? <span>Loading...</span> : <span>Add Product</span>}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default AddProduct;
