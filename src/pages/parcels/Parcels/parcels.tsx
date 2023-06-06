import { Breadcrumb, Layout, Table } from 'antd';
import * as React from 'react';
import { useApi } from '../../../hooks/useApi';
import { parcelsDesktopColumns } from './components/desktop.columns';
import { IauthToken, authToken } from '../../../hooks/useAuth';
import { convertParcelsData } from './convertParcelsData';


interface IParcelsFilter {

  date: Date,
  number: string,

}

interface GetParcelsDto {
  authToken: IauthToken
  filterts?: IParcelsFilter,
  sort?: Record<string, 1 | -1>,
  limit?: number,
  offset?: number
}

export interface IParcelsResponce {
  date: string,
  number: string,
  recCity: string,
  recAddress: string,
  recCompany: string, 
  sendCity: string,
  sendAddress: string,
  sendCompany: string,
  qt: number,
  weight: number,
  volume: number,
  price: number,
  statusType: string,
  statusValue: string,
  statusDate: string,

}

export interface IParcelsCovertedData {
  key: string,
  number: JSX.Element,
  rec: JSX.Element,
  send: JSX.Element,
  items: JSX.Element,
  status: JSX.Element,
}

export const Parcels = () => {

  const { Content } = Layout;

  const [data, setData] = React.useState<IParcelsCovertedData[]>([])

  const param: GetParcelsDto = {
    authToken: authToken()
  }

  React.useEffect(()=>{
    useApi<IParcelsResponce[], GetParcelsDto>('parcels', 'get', param).then((parcelsData ) => {
      setData(convertParcelsData(parcelsData))
    })
  }, [])

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
        <Table dataSource={data} columns={parcelsDesktopColumns} />
        
      </Content>
    </>

  )
}


