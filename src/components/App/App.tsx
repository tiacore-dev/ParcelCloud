import * as React from 'react'
// import * as ReactDOM from 'react-dom'
import {  Breadcrumb, Layout  } from 'antd'
import { AppHeader } from '../AppHeader/AppHeader';
import { AppFooter } from '../AppFooter/AppFooter';
import { LentMenu } from '../LeftMenu/LeftMenu';

const { Content } = Layout;

export const App = () => {

  return (
    <Layout>
    {AppHeader}
      <Layout>
        {LentMenu}
        <Layout
          style={{
            padding: '0 24px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Главная</Breadcrumb.Item>
            <Breadcrumb.Item>Склад</Breadcrumb.Item>
            <Breadcrumb.Item>Приемки на склад</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: '#FFF',
            }}
          >
            Content
          </Content>
        </Layout>
        
      </Layout>
     {AppFooter}
    </Layout>
  );
};