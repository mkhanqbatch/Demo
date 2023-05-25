import React from "react";
import { Spin } from "antd";

export default function () {
  return (
    <div>
      <div className="loading_div">
        <Spin />
      </div>
    </div>
  );
}
