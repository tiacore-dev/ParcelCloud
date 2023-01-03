import { Breadcrumb, Layout } from 'antd';
import * as React from 'react';
import { useParams } from 'react-router-dom';

export const Parcels = () => {

const { Content } = Layout;

  const { parcelId } = useParams<{parcelId: string}>();

    return (
        
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
            Parcels
            {parcelId}
          </Content>
        </Layout>
        
    )
}