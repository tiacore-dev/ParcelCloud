import * as React from "react";
import { Alert, Breadcrumb, Card, Layout, Spin, Table } from "antd";
import { Link, useParams } from "react-router-dom";
import { IParcelsRouteParams } from "../../core/router";
import { useDispatch, useSelector } from "react-redux";
import { IParcelHistory, IParcelItem } from "../../interfaces/parcels/IParcel";
import { authToken } from "../../hooks/useAuth";
import { IState } from "../../store/modules";
import { itemsColumns } from "./components/itemsColumns";
import { minPageHeight } from "../../utils/pageSettings";
import { isMobile } from "../../utils/isMobile";
import { itemsColumnsMobile } from "./components/itemsColumnsMobile";
import { convertItemsDataMobile } from "./components/convertItemsDataMobile";
import { historyDesktopColumns } from "./components/historyDesktop.columns";
import { historyMobileColumns } from "./components/historyMobile.columns";
import { GetParcelDto, getParcel } from "../../hooks/ApiActions/parcel";
import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import "./parcel.less";
import { ParcelActions } from "./components/actions";

export interface IConvertedParcelItem {
  key: number;
  weight?: number;
  h?: number;
  l?: number;
  w?: number;
  volume?: number;
  qt?: number;
  tWeight?: number;
  tVolume?: number;
  comment?: string;
  mobileData?: JSX.Element;
}

export const Parcel = () => {
  const { Content } = Layout;

  const routeParams: IParcelsRouteParams = useParams();

  const dispatch = useDispatch();

  const params: GetParcelDto = {
    authToken: authToken(),
    parcelId: routeParams.parcelId,
  };

  React.useEffect(() => {
    getParcel(dispatch, params);
  }, []);

  const parcelData = useSelector((state: IState) => state.pages.parcel.data);
  const isLoaded = useSelector((state: IState) => state.pages.parcel.loaded);
  const isLoading = useSelector((state: IState) => state.pages.parcel.loading);
  const errMsg = useSelector((state: IState) => state.pages.parcel.errMsg);

  let temperature: string = "Отсутствует";

  if (parcelData && (parcelData.tMax !== 0 || parcelData.tMin !== 0)) {
    temperature = `${parcelData.tMin > 0 && "+"}${parcelData.tMin} ${
      parcelData.tMax > 0 && "+"
    }${parcelData.tMax}`;
  }

  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
        items={[
          <Breadcrumb.Item>Главная</Breadcrumb.Item>,
          <Breadcrumb.Item>
            <Link to="/parcels">Накладные</Link>
          </Breadcrumb.Item>,
          <Breadcrumb.Item>{parcelData?.number}</Breadcrumb.Item>,
        ]}
      />
      {isLoaded && parcelData && routeParams.parcelId === parcelData.id ? (
        <Content
          style={{
            padding: "0 24px",
            margin: 0,
            minHeight: minPageHeight(),
            background: "#FFF",
          }}
        >
          <div className="parcel__title">
            <div className="parcel__number">{`${parcelData.number}`}</div>

            <div className="parcel__task">
              {parcelData.toDelivery ? (
                <LogoutOutlined className="parcel__task__delivery_icon" />
              ) : (
                <LoginOutlined className="parcel__task__receive_icon" />
              )}
              {parcelData.toDelivery
                ? "Доставить получателю"
                : "Забрать у отправителя"}
            </div>
            {parcelData.toReceiveСonfirmed === false && (
              <div className="parcel__task_unconfirmed">
                Не принято в работу
              </div>
            )}

            <ParcelActions parcelData={parcelData} params={params} />
          </div>

          <Card
            title="Данные отправителя:"
            style={{ margin: "8px 0" }}
            headStyle={{ backgroundColor: "#F8F8F8" }}
          >
            <p>Город: {parcelData.sendCity}</p>
            <p>Адрес: {parcelData.sendAddress}</p>
            <p>Компания: {parcelData.sendCompany}</p>
            <p>ФИО: {parcelData.sendPerson}</p>
            <p>Телефон: {parcelData.sendPhone}</p>
            <p>Дополнительная информация: {parcelData.sendAddInfo}</p>
          </Card>

          <Card
            title="Данные получателя:"
            headStyle={{ backgroundColor: "#F8F8F8" }}
            style={{ margin: "8px 0" }}
          >
            <p>Город: {parcelData.recCity}</p>
            <p>Адрес: {parcelData.recAddress}</p>
            <p>Компания: {parcelData.recCompany}</p>
            <p>ФИО: {parcelData.recPerson}</p>
            <p>Телефон: {parcelData.recPhone}</p>
            <p>Дополнительная информация: {parcelData.recAddInfo}</p>
          </Card>
          <Card
            title="Отправление:"
            headStyle={{ backgroundColor: "#F8F8F8" }}
            style={{ margin: "8px 0" }}
          >
            <p>Температурный режим: {temperature}</p>
            <p>Итого мест: {parcelData.qt}</p>
            <p>Вес: {parcelData.weight}</p>
            <p>Объемный вес: {parcelData.volume}</p>
          </Card>
          {!!parcelData.items?.length && (
            <>
              {
                <Table
                  pagination={false}
                  bordered
                  dataSource={
                    isMobile()
                      ? convertItemsDataMobile(parcelData?.items)
                      : parcelData?.items.map(
                          (el: IParcelItem, index: number) => ({
                            ...el,
                            size: `${el.h}x${el.l}x${el.w}`,
                            key: index,
                          }),
                        )
                  }
                  columns={isMobile() ? itemsColumnsMobile : itemsColumns}
                />
              }
            </>
          )}

          <Card
            title="Информация об оплате:"
            headStyle={{ backgroundColor: "#F8F8F8" }}
            style={{ margin: "8px 0" }}
          >
            <p>Тип доставки: {parcelData.delType}</p>
            {!!parcelData.cost && <p>Стоимость доставки: {parcelData.cost}</p>}
            <p>Тип оплаты: {parcelData.payType}</p>
          </Card>

          {parcelData.history?.length && (
            <>
              {
                <Table
                  pagination={false}
                  bordered
                  style={{ marginBottom: 12 }}
                  dataSource={[...parcelData.history]
                    .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
                    .map((el: IParcelHistory, index: number) => ({
                      ...el,
                      key: index,
                    }))}
                  columns={
                    isMobile() ? historyMobileColumns : historyDesktopColumns
                  }
                />
              }
            </>
          )}
        </Content>
      ) : isLoading ? (
        <Spin size="large" />
      ) : (
        <Alert
          message="Ошибка получения данных по накладной"
          description={`${errMsg}`}
          type="error"
          closable
        />
      )}
    </>
  );
};
