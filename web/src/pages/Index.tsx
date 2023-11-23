import { Layout, Menu, MenuProps } from 'antd';
import { cloneDeep, head, List, toString } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import http from '@/api/http';

import styles from './Index.module.less';
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const { Header, Content, Sider } = Layout;

const Index = () => {
  const [menu, setMenu] = useState([]);
  const [openKey] = useState<Array<any>>([]);
  const [selectKey] = useState<Array<any>>([]);
  const navigate = useNavigate();

  const onClick = (e: { key: any }) => {
    navigate(e.key);
  };

  const findOpenKey = (nav: List<any> | null | undefined) => {
    const firstElement = head(nav) as any;
    if (firstElement.children && firstElement.children.length) {
      return toString(firstElement.key);
    }
  };

  const findSelectKey = (nav: List<any> | null | undefined): any => {
    const firstElement = head(nav) as any;
    if (firstElement.children && firstElement.children.length) {
      return findSelectKey(firstElement.children);
    } else {
      return toString(firstElement.key);
    }
  };

  const getOpenKey = useCallback(() => openKey, [openKey]);
  const getSelectKey = useCallback(() => selectKey, [selectKey]);

  useEffect(() => {
    http.get('/nav').then((res) => {
      const nav = cloneDeep(res.data.items);
      setMenu(nav);
      const defaultOpenKey = findOpenKey(nav);
      openKey.push(defaultOpenKey);
      const defaultSelectKey = findSelectKey(nav);
      selectKey.push(defaultSelectKey);
    });
  }, []);

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
            defaultSelectedKeys={getSelectKey()}
            defaultOpenKeys={getOpenKey()}
            style={{ height: '100%', borderRight: 0 }}
            items={menu}
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
