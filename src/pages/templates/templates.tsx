import { Breadcrumb, Layout, Table, DatePicker, Space } from 'antd';
import * as React from 'react';
import { templatesDesktopColumns } from './components/desktop.columns';
import {  useSelector } from 'react-redux';
import { IState } from '../../store/modules';
// import { pushPath } from '../../core/history';


export const Templates = () => {

  const { Content } = Layout;
  const templatesData = useSelector((state: IState) => state.dictionaries.templates.data)
  const isLoading = useSelector((state: IState) => state.dictionaries.templates.loading)

  return (


    <>
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>Главная</Breadcrumb.Item>
        <Breadcrumb.Item>Накладные</Breadcrumb.Item>

      </Breadcrumb>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          background: '#FFF',
        }}
      >
        {isLoading ? <></> :
          <Table
            dataSource={templatesData.map(template => ({...template, key: template.id}))}
            columns={templatesDesktopColumns}
            onRow={(record) => {
              return {
                onClick: () => {
                  // pushPath(`/templates/${record.id}`)
                }, 
              };
            }}
          />}


      </Content>
    </>

  )
}


