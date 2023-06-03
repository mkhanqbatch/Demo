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
    const { name } = productFile;
    let key = "";
    if (name.length > 20) {
      let nameArr = name.split(".");
      key = `${name
        .slice(0, 20)
        .split(/[\s,]+/)
        .join("")}${Date.now()}.${nameArr.at(-1)}`;
      console.log(key);
    } else {
      let nameArr = name.split(".");
      key = `${nameArr[0].split(" ").join("")}-${Date.now()}.${nameArr.at(-1)}`;
      console.log(key);
    }
    setLoading(true);
    try {
      var formData = new FormData();
      formData.append("productFile", productFile);
      const params = { bucket: "khan.qbatch", key };
      // let url = `products/uploadFile`;
      let url = `products/presigned-url`;
      const response = await api.post(url, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const uploadFile = await api.put(response.data, productFile);
      const uploadFileInfo = await api.post(
        "products/save-file-info",
        {
          ...params,
          sellerId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("file info ", uploadFileInfo);
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
