import React from "react";
import "./loader.css";
import { Spin } from "antd";

export default function Loader() {
  return (
    <>
      <div className="overlay_div"></div>
      <div className="loading_div">
        <Spin />
      </div>
    </>
  );
}
