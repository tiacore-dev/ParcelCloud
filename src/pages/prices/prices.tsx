import { Breadcrumb, Layout } from 'antd';
import * as React from 'react';

export const Parcels = () => {

  const { Content } = Layout;

  return (

    <>
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>Главная</Breadcrumb.Item>
        <Breadcrumb.Item>Расчет тарифа</Breadcrumb.Item>

      </Breadcrumb>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          background: '#FFF',
        }}
      >
        
      </Content>
    </>

  )
}


