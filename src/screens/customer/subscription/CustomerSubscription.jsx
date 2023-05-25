import React from "react";
import "./subscription.scss";

import { useNavigate } from "react-router-dom";

function CustomerSubscription() {
  const navigate = useNavigate();

  return (
    <div className="subscription">
      <div className="cards">
        <h2>Subscription Plans</h2>
        <div className="cards-container">
          <div className="card">
            <h3>One Month Plan</h3>
            <p>
              <b>Subscription fee: 10.0$</b>
            </p>
            <span
              className="subscription-btn"
              onClick={() =>
                navigate("/customer/checkout", {
                  state: {
                    priceId: "price_1N8iOrAdMsJcPGNhm59VnzTp",
                    plan: "One Month Subscription",
                  },
                })
              }
            >
              Subscribe
            </span>
          </div>
          <div className="card">
            <h3>Six Month Plan</h3>
            <p>
              <b>Subscription fee: 50.0$</b>
            </p>
            <span
              className="subscription-btn"
              onClick={() =>
                navigate("/customer/checkout", {
                  state: {
                    priceId: "price_1N8iPSAdMsJcPGNhu6zhfICc",
                    plan: "Six Month Subscription",
                  },
                })
              }
            >
              Subscribe
            </span>
          </div>
          <div className="card">
            <h3>One Year Plan</h3>
            <p>
              <b>Subscription fee: 90.0$</b>
            </p>
            <span
              className="subscription-btn"
              onClick={() =>
                navigate("/customer/checkout", {
                  state: {
                    priceId: "price_1N8iPyAdMsJcPGNhMRfUALWN",
                    plan: "One Year Subscription",
                  },
                })
              }
            >
              Subscribe
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerSubscription;
