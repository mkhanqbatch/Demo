import React from "react";
import "./checkout.scss";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { message } from "antd";
import { api } from "../../../components/Util";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../../components/Loaders/Loader";
import { useState } from "react";
import { setSubscriptionId } from "../../../redux/slices/userSlice";
function CheckoutForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {
    state: { plan, priceId },
  } = useLocation();
  const { token: authToken, user } = useSelector((state) => state.users);
  // stripe items
  const stripe = useStripe();
  const elements = useElements();
  const createSubscription = async () => {
    setLoading(true);
    try {
      // create a payment method
      const paymentMethod = await stripe?.createPaymentMethod({
        type: "card",
        card: elements?.getElement(CardElement),
        billing_details: {
          name: user.name,
          email: user.email,
        },
      });

      // call the backend to create subscription
      const response = await api.post(
        "stripe/createSubscription",
        {
          paymentMethod: paymentMethod?.paymentMethod?.id,
          name: user.name,
          email: user.email,
          priceId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const confirmPayment = await stripe?.confirmCardPayment(
        response.data.clientSecret
      );
      setLoading(false);
      if (confirmPayment?.error) {
        message.error(confirmPayment?.error);
      } else {
        console.log("user obj is ", {
          userId: user._id,
          subscriptionId: response.data.subscriptionId,
        });
        const x = await api.post("auth/setSubscription", {
          subscriptionId: response.data.subscriptionId,
          userId: user._id,
        });

        dispatch(setSubscriptionId(response.data.subscriptionId));
        message.success("Subscription is created successfully.");
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      message.error(error);
    }
  };
  return (
    <div className="x-checkout">
      {loading ? <Loader /> : null}
      <p className="go-back" onClick={() => navigate("/")}>
        Go Back
      </p>
      <div className="top-heading">
        <h3>
          You are choosing a plan of{" "}
          <span style={{ color: "green" }}>{plan}</span>
        </h3>
      </div>
      <div className="chk-form">
        <div>
          <CardElement />
        </div>

        <br />
        <hr />
        <br />
        <button onClick={createSubscription} disabled={!stripe}>
          Subscribe
        </button>
      </div>
    </div>
  );
}

export default CheckoutForm;
