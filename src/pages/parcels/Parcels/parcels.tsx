import { Breadcrumb, Layout, Table, DatePicker, Space } from 'antd';
import * as React from 'react';
import { useApi } from '../../../hooks/useApi';
import { parcelsDesktopColumns } from './components/desktop.columns';
import { IauthToken, authToken } from '../../../hooks/useAuth';
import { convertParcelsData } from './convertParcelsData';
import { getParcelsFailure, getParcelsRequest, getParcelsSuccess } from '../../../store/modules/pages/parcels';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../../store/modules';
import { IParcelsSettingsState } from '../../../store/modules/settings/parcels';
import { Filters } from './components/filters';


interface GetParcelsDto extends IParcelsSettingsState {
  authToken: IauthToken
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

  const filters = useSelector((state: IState) => state.settings.parcelsSettings.filters)
  const param: GetParcelsDto = {
    authToken: authToken(),
    filters
  }

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getParcelsRequest())
    useApi<IParcelsResponce[], GetParcelsDto>('parcels', 'get', param).then((parcelsData) => {
      dispatch(getParcelsSuccess(convertParcelsData(parcelsData)))
    }).catch(err => {
      dispatch(getParcelsFailure(err))
    })
  }, [filters])

  const parcelsData = useSelector((state: IState) => state.pages.parcels.data)
  const isLoading = useSelector((state: IState) => state.pages.parcels.loading)

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
       <Filters />
        {isLoading ? <></> :  <Table dataSource={parcelsData} columns={parcelsDesktopColumns} />}
       

      </Content>
    </>

  )
}


