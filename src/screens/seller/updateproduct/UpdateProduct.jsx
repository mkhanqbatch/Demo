import React from "react";
import "./updateproduct.scss";
import { Button, Checkbox, Form, Input, Radio, Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loaders/Loader";
import {
  setError,
  setSucess,
  updateProduct,
} from "../../../redux/slices/productSlice";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
function UpdateProduct() {
  const { loading, success, error } = useSelector((state) => state.product);
  const { state } = useLocation();

  const { token, user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const handleUpdateProduct = (values) => {
    dispatch(
      updateProduct({ _id: state._id, ...values, token, sellerId: user._id })
    );
  };
  useEffect(() => {
    form.setFieldsValue({
      name: state.name,
      asin: state.asin,
      description: state.description,
      price: state.price,
    });
  }, [state]);
  useEffect(() => {
    if (success) {
      message.success("Product is updated successfully");
      dispatch(setSucess());
    }
  }, [success]);
  useEffect(() => {
    if (error) {
      message.error(error.error);
      dispatch(setError());
    }
  }, [error]);
  return (
    <div className="add-product">
      {/* {loading ? <Loader /> : null} */}
      <h4>Update Product Information.</h4>
      <div className="new-product">
        <Form
          form={form}
          layout="vertical"
          className=""
          onFinish={handleUpdateProduct}
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
              {loading ? <span>Loading...</span> : <span>Update Product</span>}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default UpdateProduct;
