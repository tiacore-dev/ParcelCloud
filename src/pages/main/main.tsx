import { Breadcrumb, Layout } from 'antd';
import * as React from 'react';
import { pushPath } from '../../core/history';

export const Main = () => {

  const { Content } = Layout;

  {React.useEffect(()=>{
    pushPath("/parcels")
  },[])}
  return (
    <>
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>Главная</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          background: '#FFF',
        }}
      >
        Main
      </Content>
    </>
  )
}