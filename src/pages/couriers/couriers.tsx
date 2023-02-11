import { Breadcrumb, Layout } from 'antd';
import * as React from 'react';

export const Couriers = () => {

const { Content } = Layout;

    return (
        <>
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Главная</Breadcrumb.Item>
            <Breadcrumb.Item>Курьеры</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: '#FFF',
            }}
          >
            Couriers
          </Content>
  
        </>
    )
}