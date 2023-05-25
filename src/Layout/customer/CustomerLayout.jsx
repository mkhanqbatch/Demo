import React from "react";
import "./customerlayout.scss";
import { BsCart2 } from "react-icons/bs";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import { MdDashboardCustomize, MdFormatListBulletedAdd } from "react-icons/md";
import profile from "../../assets/profile.png";
import { useDispatch, useSelector } from "react-redux";
import { resetUserSlice } from "../../redux/slices/userSlice";
import { resetCart } from "../../redux/slices/cartSlice";
function CustomerLayout({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  return (
    <div className="customer-layout">
      <div className="nav-bar">
        <h3 onClick={() => navigate("/customer/dashboard")}>Online Store</h3>
        <div className="cart">
          <BsCart2
            className="cart-icon"
            onClick={() => navigate("/customer/cart")}
          />
          <div className="cart-count">
            {cartItems?.length > 0 ? cartItems.length : 0}
          </div>
          {/* <RiLogoutCircleLine
            className="log-out"
            onClick={() => {
              if (window.confirm("Are You Sure ?")) {
                window.sessionStorage.clear();
                dispatch(resetUserSlice());
                navigate("/login");
              }
            }}
          /> */}
        </div>
      </div>
      <div className="side-bar">
        <img src={profile} alt="" />
        <Sidebar>
          <Menu>
            <MenuItem
              component={<Link to="/customer/dashboard" />}
              icon={<MdDashboardCustomize />}
            >
              Dashboard
            </MenuItem>
            <MenuItem
              component={<Link to="/customer/orders" />}
              icon={<MdFormatListBulletedAdd />}
            >
              My Orders
            </MenuItem>
            {/* <MenuItem
              component={<Link to="/customer/cart" />}
              icon={<BsCart2 />}
            >
              My Cart
            </MenuItem> */}
            <MenuItem
              // component={<Link to="/customer/cart" />}
              icon={<MdFormatListBulletedAdd />}
            >
              Profile
            </MenuItem>
            <MenuItem
              icon={<RiLogoutCircleLine />}
              onClick={() => {
                if (window.confirm("Are You Sure ?")) {
                  window.sessionStorage.clear();
                  dispatch(resetUserSlice());
                  dispatch(resetCart());
                  navigate("/login");
                }
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
      <div className="content">{children}</div>
    </div>
  );
}

export default React.memo(CustomerLayout);
