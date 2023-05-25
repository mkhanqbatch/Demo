import React, { useState } from "react";
import { InboxOutlined, EyeOutlined } from "@ant-design/icons";
import "./addproduct.scss";
import { Form, Modal, Input, Button, Upload, message, Row, Col } from "antd";
import { api } from "../../../components/Util";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loaders/Loader";
const { Dragger } = Upload;
function UploadFile() {
  const { user, token } = useSelector((state) => state.users);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const { productFile } = values;
    setLoading(true);
    try {
      var formData = new FormData();
      formData.append("productFile", productFile);
      formData.append("sellerId", user._id);
      let url = `products/uploadFile`;
      const response = await api.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      message.info(response.data);
      setLoading(false);
      form.resetFields();
    } catch (e) {
      console.log("Error ", e);
      setLoading(false);
    }
  };
  const onFinishFailed = () => {};
  return (
    <div className="upload-file">
      {loading ? <Loader /> : null}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Products File"
          name="productFile"
          rules={[
            {
              required: true,
              message: "Product File is required",
            },
          ]}
        >
          <Dragger
            listType="text"
            multiple={false}
            maxCount={1}
            accept={".csv"}
            onChange={(e) => {
              if (e.file.status === "removed") {
                form.setFieldValue("productFile", "");
              } else {
                form.setFieldValue("productFile", e.file.originFileObj);
              }
            }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Dragger>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Upload File
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UploadFile;
