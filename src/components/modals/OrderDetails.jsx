import React from "react";
import { Descriptions, Modal, Row, Col } from "antd";
function OrderDetails({ showOrdersDetails, setShowOrdersDetails, orderInfo }) {
  console.log("order info ", orderInfo);
  return (
    <Modal
      title="Order Details"
      open={showOrdersDetails}
      onOk={() => setShowOrdersDetails(false)}
      onCancel={() => setShowOrdersDetails(false)}
      okText="Close"
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <br />
      <Row>
        <Col span={4}>
          <b>Order #:</b>
        </Col>
        <Col span={8}>{orderInfo?.orderNumber}</Col>
        <Col span={4}>
          <b>User name:</b>
        </Col>
        <Col span={8}>{orderInfo?.userName}</Col>
      </Row>
      <Row>
        <Col span={4}>
          <b>Address:</b>
        </Col>
        <Col span={18}>{orderInfo?.address}</Col>
      </Row>
      <br />
      <h4>Products</h4>
      {orderInfo?.products.map((prod) => {
        return (
          <Row>
            <Col span={4}>
              <b>ASIN:</b>
            </Col>
            <Col span={6}>{prod.asin}</Col>
            <Col span={4}>
              <b>Name:</b>
            </Col>
            <Col span={4}>{prod.name}</Col>
          </Row>
        );
      })}
    </Modal>
  );
}

export default OrderDetails;
