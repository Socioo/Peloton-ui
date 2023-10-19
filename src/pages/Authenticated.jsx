import React, { useContext, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  UserSwitchOutlined,
  AuditOutlined,
} from "@ant-design/icons";
import {
  MdProductionQuantityLimits,
  MdPayment,
  MdShoppingCart,
  MdDashboard,
} from "react-icons/md";
import { GoOrganization } from "react-icons/go";
import { FcSalesPerformance } from "react-icons/fc";
import { Layout, Menu, Avatar, Dropdown } from "antd";

import Customers from "./Customers";
import Dashboard from "./Dashboard";
import Payments from "./Payments";
import Products from "./Products";
import Purchases from "./Purchases";
import Sales from "./Sales";
import Users from "./Users";
import logo from "../assets/logo.png";
import { logout } from "../utils/helper";
import AuthContext from "../context/AuthContext";
import Role from "./Role";
import AuditLog from "./AuditLog";

const { Header, Sider, Content } = Layout;

const Authenticated = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  console.log(user);
  return (
    <Layout
      style={{
        height: "130vh",
        margin: "0px",
      }}
    >
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" style={{ padding: 10 }}>
          <img src={logo} alt="logo" height={50} />
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          items={[
            {
              key: "dashboard",
              icon: <MdDashboard />,
              label: "Dashboard",
              onClick: () => navigate("/"),
            },
            {
              key: "sales",
              icon: <FcSalesPerformance />,
              label: "Sales",
              onClick: () => navigate("/sales"),
            },
            {
              key: "customers",
              icon: <GoOrganization />,
              label: "Customers",
              onClick: () => navigate("/customers"),
            },
            {
              key: "products",
              icon: <MdProductionQuantityLimits />,
              label: "Products",
              onClick: () => navigate("/products"),
            },
            {
              key: "payments",
              icon: <MdPayment />,
              label: "Payments",
              onClick: () => navigate("/payments"),
            },
            {
              key: "purchases",
              icon: <MdShoppingCart />,
              label: "Purchases",
              onClick: () => navigate("/purchases"),
            },
            {
              key: "auditlog",
              icon: <AuditOutlined />,
              label: "Audit Log",
              onClick: () => navigate("/auditlog"),
            },
            {
              key: "users",
              icon: <UserOutlined />,
              label: "Users",
              onClick: () => navigate("/users"),
            },
            {
              key: "roles",
              icon: <UserSwitchOutlined />,
              label: "Roles",
              onClick: () => navigate("/roles"),
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout" style={{}}>
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "60px",
            }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
            <div style={{ padding: "0px 10px" }}>
                <Dropdown menu={{ items: [
                  {
                    key: '1',
                    label: 'Logout',
                    onClick: logout
                  },
                ] }}>
                  {/* <Avatar>AB</Avatar> */}
                  <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                </Dropdown>
            </div>
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            backgroundColor: "white",
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/products" element={<Products />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/auditlog" element={<AuditLog />} />
            <Route path="/users" element={<Users />} />
            <Route path="/roles" element={<Role />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Authenticated;
