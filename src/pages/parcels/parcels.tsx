import { Breadcrumb, Layout, Table } from 'antd';
import * as React from 'react';
import { useApi } from '../../hooks/useApi';
import { parcelsDesktopColumns } from './components/desktop.columns';
import { IauthToken, authToken } from '../../hooks/useAuth';
import { convertParcelsData } from './convertParcelsData';
import { getParcelsFailure, getParcelsRequest, getParcelsSuccess } from '../../store/modules/pages/parcels';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../store/modules';
import { IParcelsSettingsState } from '../../store/modules/settings/parcels';
import { Filters } from './components/filters';
import './parcels.less'
import { IParcelsList } from '../../interfaces/parcels/IParcelsList';
import { pushPath } from '../../core/history';
import { parcelsMobileColumns } from './components/mobile.columns';
import { isMobile } from '../../utils/isMobile';
import { convertParcelsDataMobile } from './convertParcelsDataMobile';
import { minPageHeight } from '../../utils/pageSettings';


interface GetParcelsDto extends IParcelsSettingsState {
  authToken: IauthToken
}

export interface IParcelsCovertedData {
  key: string,
  number?: JSX.Element,
  rec?: JSX.Element,
  send?: JSX.Element,
  items?: JSX.Element,
  status?: JSX.Element,
  mobileData?: JSX.Element,
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
    useApi<IParcelsList[], GetParcelsDto>('parcels', 'get', param).then((parcelsData) => {
      dispatch(getParcelsSuccess(parcelsData))
    }).catch(err => {
      dispatch(getParcelsFailure(err))
    })
  }, [filters])

  const parcelsData = useSelector((state: IState) => state.pages.parcels.data)
  const convertedParcelsData = isMobile() ? convertParcelsDataMobile(parcelsData) : convertParcelsData(parcelsData)
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
          minHeight: minPageHeight(),
          background: '#FFF',
        }}
      >
        <Filters />
        {isLoading ? <></> :
          <Table
            dataSource={convertedParcelsData}
            columns={isMobile() ? parcelsMobileColumns : parcelsDesktopColumns}
            onRow={(record) => {
              return {
                onClick: () => {
                  pushPath(`/parcels/${record.key}`)
                }, 
              };
            }}
          />}


      </Content>
    </>

  )
}


