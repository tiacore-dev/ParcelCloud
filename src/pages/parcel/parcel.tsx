import * as React from 'react';
import {
  Breadcrumb,
  Button,
  Card,
  Layout,
  Space,
  Table
} from 'antd';
import Title from 'antd/es/typography/Title';
import { Link, useParams } from 'react-router-dom';
import { IParcelsRouteParams } from '../../core/router';
import { useDispatch, useSelector } from 'react-redux';
import { getParcelFailure, getParcelRequest, getParcelSuccess } from '../../store/modules/pages/parcel';
import { useApi } from '../../hooks/useApi';
import { IParcel, IParcelHistory, IParcelItem } from '../../interfaces/parcels/IParcel';
import { IauthToken, authToken } from '../../hooks/useAuth';
import { IState } from '../../store/modules';
import { historyColumns } from './components/historyColumns';
import { itemsColumns } from './components/itemsColumns';
import { dateToLocalString } from '../../utils/dateConverter';
import { PrintModal } from './components/printModal';
import { minPageHeight } from '../../utils/pageSettings';
import { isMobile } from '../../utils/isMobile';
import {itemsColumnsMobile} from './components/itemsColumnsMobile';
import { convertItemsDataMobile } from './components/convertItemsDataMobile';

interface GetParcelDto {
  parcelId: string;
  authToken: IauthToken
}

export interface IConvertedParcelItem {
    key: number
    weight?: number;
    h?: number;
    l?: number;
    w?: number;
    volume?: number;
    qt?: number;
    tWeight?: number;
    tVolume?: number;
    comment?: string;
    mobileData?: JSX.Element,
}

export const Parcel = () => {

  const { Content } = Layout;

  const routeParams: IParcelsRouteParams = useParams();

  const dispatch = useDispatch();

  const params: GetParcelDto = {
    authToken: authToken(),
    parcelId: routeParams.parcelId
  }

  React.useEffect(() => {
    dispatch(getParcelRequest())
    useApi<IParcel, GetParcelDto>('parcel', 'get', params).then((parcelData) => {
      dispatch(getParcelSuccess(parcelData))
    }).catch(err => {
      dispatch(getParcelFailure(err))
    })
  }, [])

  const parcelData = useSelector((state: IState) => state.pages.parcel.data)
  const isLoaded = useSelector((state: IState) => state.pages.parcel.loaded)

  // { (parcelData && (parcelData.tMax !== 0 || parcelData.tMin !== 0)) && <p>Температурный режим: {parcelData.tMin > 0 && "+"}{parcelData.tMin} {parcelData.tMax > 0 && "+"}{parcelData.tMax}</p> }

  let temperature: string = "Отсутствует"

  if (parcelData && (parcelData.tMax !== 0 || parcelData.tMin !== 0)) {
    temperature = `${parcelData.tMin > 0 && "+"}${parcelData.tMin} ${parcelData.tMax > 0 && "+"}${parcelData.tMax}`
  }

  // const itemsData: IConvertedParcelItem[] = 

  return <>



    <Breadcrumb
      style={{
        margin: '16px 0',
      }}
    >
      <Breadcrumb.Item>Главная</Breadcrumb.Item>
      <Breadcrumb.Item>
        <Link to="/parcels">Накладные</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>{parcelData?.number}</Breadcrumb.Item>

    </Breadcrumb>
    {isLoaded && parcelData && routeParams.parcelId === parcelData.id ?
      <Content
        style={{
          padding: "0 24px",
          margin: 0,
          minHeight: minPageHeight(),
          background: '#FFF',
        }}
      >
        <Title level={3}>{`Накладная ${parcelData.number}`}</Title>

        {parcelData &&
          <PrintModal
            data={parcelData}
          />
        }

        <Card
          title="Данные отправителя:"
          style={{ margin: "8px 0" }}
        >
          <p>Город:  {parcelData.sendCity}</p>
          <p>Адрес: {parcelData.sendAddress}</p>
          <p>Компания: {parcelData.sendCompany}</p>
          <p>ФИО: {parcelData.sendPerson}</p>
          <p>Телефон: {parcelData.sendPhone}</p>
          <p>Дополнительная информация:  {parcelData.sendAddInfo}</p>
        </Card>

        <Card
          title="Данные получателя:"
          style={{ margin: "8px 0" }}
        >
          <p>Город:  {parcelData.recCity}</p>
          <p>Адрес: {parcelData.recAddress}</p>
          <p>Компания: {parcelData.recCompany}</p>
          <p>ФИО: {parcelData.recPerson}</p>
          <p>Телефон: {parcelData.recPhone}</p>
          <p>Дополнительная информация: {parcelData.recAddInfo}</p>
        </Card>
        <Card
          title="Отправление:"
          style={{ margin: "8px 0" }}
        >
          <p>Температурный режим: {temperature}</p>
          <p>Итого мест: {parcelData.qt}</p>
          <p>Вес: {parcelData.weight}</p>
          <p>Объемный вес: {parcelData.volume}</p>
        </Card>
        {!!parcelData.items?.length && <>
          <Card
            title="Грузы:"
            style={{ margin: "8px 0" }}
          >
            {<Table
              pagination={false}
              dataSource={isMobile() 
                ? convertItemsDataMobile(parcelData?.items) 
                : parcelData?.items.map((el: IParcelItem, index: number) => ({ ...el, size: `${el.h}x${el.l}x${el.w}`, key: index }))}
              columns={isMobile() ?  itemsColumnsMobile : itemsColumns}
            />}
          </Card>
        </>}

        <Card
          title="Информация об оплате:"
          style={{ margin: "8px 0" }}
        >
          <p>Тип доставки: {parcelData.delType}</p>
          {!!parcelData.cost && <p>Стоимость доставки: {parcelData.cost}</p>}
          <p>Тип оплаты:  {parcelData.payType}</p>
        </Card>

        {parcelData.history?.length && <>
          <Card
            title="История накладной:"
            style={{ margin: "8px 0" }}
          >
            {<Table
              pagination={false}
              dataSource={[...parcelData.history]
                .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
                .map((el: IParcelHistory, index: number) => ({ ...el, date: dateToLocalString(el.date), key: index }))
              }

              columns={historyColumns}
            />}
          </Card>
        </>}


      </Content> : <></>}
  </>
}



