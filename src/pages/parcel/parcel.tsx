import * as React from "react";
import { Alert, Breadcrumb, Card, Layout, Spin, Table } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IParcelItem } from "../../interfaces/parcels/IParcel";
import { authToken } from "../../hooks/useAuth";
import { IState } from "../../store/modules";
import { itemsColumns } from "./components/itemsColumns";
import { minPageHeight } from "../../utils/pageSettings";
import { isMobile } from "../../utils/isMobile";
import { itemsColumnsMobile } from "./components/itemsColumnsMobile";
import { convertItemsDataMobile } from "./components/convertItemsDataMobile";
import { GetParcelDto, getParcel } from "../../hooks/ApiActions/parcel";
import {
  AppstoreTwoTone,
  CheckCircleTwoTone,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./parcel.less";
import { ParcelActions } from "./components/actions";
import { History } from "../../components/history/history";
import { ActionDialog } from "../../hooks/ActionDialogs";
import { TemplateContent } from "../template/components/content";
import { setTemplatStateData } from "../../store/modules/pages/template";
import { ITemplate } from "../../interfaces/templates/ITemplate";
import {
  EditeTemplateDto,
  editTemplateAction,
} from "../../hooks/ApiActions/templates";
import {
  setAppHeaderTitle,
  setShowBackButton,
} from "../../store/modules/settings/general";
import { dateToLocalString } from "../../utils/dateConverter";

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

  const routeParams = useParams();

  const dispatch = useDispatch();

  const token = authToken();
  const params: GetParcelDto = {
    authToken: token,
    parcelId: routeParams.parcelId,
  };

  React.useEffect(() => {
    getParcel(dispatch, params);
  }, [routeParams.parcelId]);

  const parcelData = useSelector((state: IState) => state.pages.parcel.data);
  const isLoaded = useSelector((state: IState) => state.pages.parcel.loaded);
  const isLoading = useSelector((state: IState) => state.pages.parcel.loading);
  const errMsg = useSelector((state: IState) => state.pages.parcel.errMsg);

  const title = React.useMemo(
    () => (parcelData ? "Накладная " + parcelData.number : "Накладная"),
    [parcelData],
  );

  React.useEffect(() => {
    if (isMobile()) {
      dispatch(setShowBackButton(true));
      dispatch(setAppHeaderTitle(title));
    }
  }, [title]);

  let temperature: string = "Отсутствует";

  if (parcelData && (parcelData.tMax !== 0 || parcelData.tMin !== 0)) {
    temperature = `${parcelData.tMin > 0 && "+"}${parcelData.tMin} ${
      parcelData.tMax > 0 && "+"
    }${parcelData.tMax}`;
  }
  const templateData = useSelector((state: IState) => state.pages.template);

  const templateParams: EditeTemplateDto = {
    ...templateData,
    authToken: token,
    id: "create",
  };

  const senderToTemplate = isMobile() ? null : (
    <ActionDialog
      buttonText="Сохранить в шаблон"
      buttonIcon={<AppstoreTwoTone twoToneColor="#ff1616" />}
      modalTitle={"Сохранить шаблон"}
      modalText={<TemplateContent />}
      onOpen={() => {
        const templateData: ITemplate = {
          city: parcelData.sendCity,
          address: parcelData.sendAddress,
          company: parcelData.sendCompany,
          person: parcelData.sendPerson,
          phone: parcelData.sendPhone,
          addInfo: parcelData.sendAddInfo,
        };

        dispatch(setTemplatStateData(templateData));
      }}
      onConfirm={() => editTemplateAction(dispatch, templateParams)}
    />
  );

  const recipientToTemplate = isMobile() ? null : (
    <ActionDialog
      buttonText="Сохранить в шаблон"
      buttonIcon={<AppstoreTwoTone twoToneColor="#ff1616" />}
      modalTitle={"Сохранить шаблон"}
      modalText={<TemplateContent />}
      onOpen={() => {
        const templateData: ITemplate = {
          city: parcelData.recCity,
          address: parcelData.recAddress,
          company: parcelData.recCompany,
          person: parcelData.recPerson,
          phone: parcelData.recPhone,
          addInfo: parcelData.recAddInfo,
        };

        dispatch(setTemplatStateData(templateData));
      }}
      onConfirm={() => editTemplateAction(dispatch, templateParams)}
    />
  );

  return (
    <>
      <Breadcrumb
        className="breadcrumb"
        style={isMobile() && { backgroundColor: "#F8F8F8" }}
        items={[
          { title: "Главная" },
          {
            title: "Накладные",
            // <Link to="/parcels">Накладные</Link>
          },
          { title: parcelData?.number },
        ]}
      />
      {isLoaded && parcelData && routeParams.parcelId === parcelData.id ? (
        <Content
          style={{
            padding: "0 24px 12px 24px",
            margin: 0,
            // minHeight: minPageHeight(),
            background: "#FFF",
          }}
        >
          <div
            className="parcel__title"
            style={{ flexDirection: isMobile() ? "column" : "row" }}
          >
            {!isMobile() && (
              <div className="parcel__number">{`${parcelData.number}`}</div>
            )}

            <div className="parcel__task">
              {parcelData.toDelivery && (
                <LogoutOutlined className="parcel__task__delivery_icon" />
              )}
              {parcelData.toReceive && (
                <LoginOutlined className="parcel__task__receive_icon" />
              )}
              {parcelData.status === "delivered" && (
                <CheckCircleTwoTone
                  twoToneColor="#52c41a"
                  className="parcel__task__delivery_icon"
                />
              )}

              {parcelData.toDelivery &&
                (isMobile() ? "Доставить" : "Доставить получателю")}
              {parcelData.toReceive &&
                (isMobile() ? "Получить" : "Получить у отправителя")}
              {parcelData.status === "delivered" && "Доставлено"}
            </div>
            {parcelData.toReceiveСonfirmed === false && (
              <div className="parcel__task_unconfirmed">
                Не принято в работу
              </div>
            )}

            <ParcelActions parcelData={parcelData} params={params} />
          </div>

          <Card
            title={
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <>Данные отправителя:</>
                {senderToTemplate}
              </div>
            }
            style={{ margin: "8px 0" }}
            headStyle={{ backgroundColor: "#F8F8F8" }}
          >
            <p>Город: {parcelData.sendCity}</p>
            <p>Адрес: {parcelData.sendAddress}</p>
            <p>Компания: {parcelData.sendCompany}</p>
            <p>ФИО: {parcelData.sendPerson}</p>
            <p>Телефон: {parcelData.sendPhone}</p>
            <p>Дополнительная информация: {parcelData.sendAddInfo}</p>
            {!!parcelData.sendTime && (
              <p>Время забора: {parcelData.sendTime}</p>
            )}
          </Card>

          <Card
            title={
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <>Данные получателя:</>
                {recipientToTemplate}
              </div>
            }
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
            {parcelData.containerRent && <p>Аренда термоконтейнера</p>}

            <p>Итого мест: {parcelData.qt}</p>
            <p>Вес: {parcelData.weight}</p>
            <p>Объемный вес: {parcelData.volume}</p>
            {!!parcelData.insureValue && (
              <p>Страховая стоимость: {parcelData.insureValue}</p>
            )}
            {!!parcelData.description && (
              <p>Описание вложения: {parcelData.description}</p>
            )}
            {parcelData.status !== "delivered" && parcelData.planDate && (
              <div>
                Расчётная дата доставки:{" "}
                {dateToLocalString(parcelData.planDate)}
              </div>
            )}
            {parcelData.orderNumber && (
              <div>Номер заказа: {parcelData.orderNumber}</div>
            )}
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

          {!!parcelData.history?.length && (
            <History historyData={parcelData.history} bordered />
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
