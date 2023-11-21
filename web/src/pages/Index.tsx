import { LaptopOutlined } from '@ant-design/icons';
import { Layout, Menu, MenuProps } from 'antd';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import styles from './Index.module.less';

type MenuItem = Required<MenuProps>['items'][number];

const { Header, Content, Sider } = Layout;

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items = [getItem('记账', '/main/home', <LaptopOutlined />)];

const Index = () => {
  const navigate = useNavigate();
  const onClick = (e: { key: any }) => {
    navigate(e.key);
  };
  return (
    <Layout>
      <Header className={styles.header}>
        <div className='demo-logo' />
        {/* <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['2']} items={items1} /> */}
      </Header>
      <Layout className={styles.container}>
        <Sider width={200}>
          <Menu
            mode='inline'
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items}
            onClick={onClick}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: '75vh',
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Index;
