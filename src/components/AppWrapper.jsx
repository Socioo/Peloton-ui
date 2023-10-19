import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import {
  MdProductionQuantityLimits,
  MdPayment,
  MdShoppingCart,
  MdDashboard
} from 'react-icons/md';
import {GoOrganization} from 'react-icons/go';
import {FcSalesPerformance} from 'react-icons/fc';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import logo from '../assets/logo.png'
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <Layout style={{
      height: '100vh',
      margin: '0px'
    }}>
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" style={{ padding: 10 }}>
          <img src={logo} alt="logo" height={50}/>
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          items={[
            {
              key: 'dashboard',
              icon: <MdDashboard />,
              label: 'Dashboard',
              onClick: () => navigate('dashboard')
            },
            {
              key: 'sales',
              icon: <FcSalesPerformance />,
              label: 'Sales',
              onClick: () => navigate('sales')
            },
            {
              key: 'customers',
              icon: <GoOrganization />,
              label: 'Customers',
              onClick: () => navigate('customers')
            },
            {
              key: 'products',
              icon: <MdProductionQuantityLimits />,
              label: 'Products',
              onClick: () => navigate('products')
            },
            {
              key: 'payments',
              icon: <MdPayment />,
              label: 'Payment',
              onClick: () => navigate('payments')
            },
            {
              key: 'purchases',
              icon: <MdShoppingCart />,
              label: 'Purchases',
              onClick: () => navigate('purchases')
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout" style={{
      }}>
        <Header

          className="site-layout-background"
          style={{
            padding: 0,
            backgroundColor: 'white'
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            backgroundColor: 'white'
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;