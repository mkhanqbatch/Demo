import React from "react";
import "./sellerlayout.scss";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import { MdDashboardCustomize, MdFormatListBulletedAdd } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import profile from "../../assets/profile.png";
import { useDispatch } from "react-redux";
import { resetUserSlice } from "../../redux/slices/userSlice";
function SellerLayout({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="seller-layout">
      <div className="nav-bar">
        <h4>My Online Store</h4>
      </div>
      <div className="side-bar">
        <img src={profile} alt="" />
        <Sidebar>
          <Menu>
            <MenuItem
              component={<Link to="/seller/dashboard" />}
              icon={<MdDashboardCustomize />}
            >
              Dashboard
            </MenuItem>
            <MenuItem
              component={<Link to="/seller/add-product" />}
              icon={<MdFormatListBulletedAdd />}
            >
              Add Product
            </MenuItem>
            <MenuItem
              component={<Link to="/seller/orders" />}
              icon={<MdFormatListBulletedAdd />}
            >
              Orders
            </MenuItem>
            <MenuItem
              icon={<RiLogoutCircleLine />}
              onClick={() => {
                if (window.confirm("Are You Sure ?")) {
                  window.sessionStorage.clear();
                  dispatch(resetUserSlice());
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

export default SellerLayout;
