import * as React from "react";
import { Alert, Breadcrumb, Button, Card, Layout, Spin, Table } from "antd";
import Title from "antd/es/typography/Title";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { authToken } from "../../hooks/useAuth";
import { IState } from "../../store/modules";

import { minPageHeight } from "../../utils/pageSettings";
import { isMobile } from "../../utils/isMobile";
import { IManifestsRouteParams } from "../../core/router";
import { dateToLocalString } from "../../utils/dateConverter";
import { parcelsDesktopColumns } from "../parcels/components/desktop.columns";
import { parcelsMobileColumns } from "../parcels/components/mobile.columns";
import { IParcelsListColumn } from "../../interfaces/parcels/IParcelsList";
import { GetManifestDto, getManifest } from "../../hooks/ApiActions/manifest";
import { pushPath } from "../../core/history";

export interface IConvertedManifestItem {
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

export const Manifest = () => {
  const { Content } = Layout;

  const routeParams: IManifestsRouteParams = useParams();

  const dispatch = useDispatch();
  const token = authToken();

  const params: GetManifestDto = {
    authToken: token,
    manifestId: routeParams.manifestId,
  };

  const manifestData = useSelector(
    (state: IState) => state.pages.manifest.data,
  );

  React.useEffect(() => {
    getManifest(dispatch, params);
  }, []);

  const isLoaded = useSelector((state: IState) => state.pages.manifest.loaded);
  const isLoading = useSelector(
    (state: IState) => state.pages.manifest.loading,
  );

  const parcels: IParcelsListColumn[] = React.useMemo(
    () =>
      manifestData?.parcels.map((el) => ({
        ...el,
        key: el.id,
      })),
    [manifestData],
  );

  const errMsg = useSelector((state: IState) => state.pages.manifest.errMsg);

  const columns = React.useMemo(
    () =>
      isMobile() ? parcelsMobileColumns(true) : parcelsDesktopColumns(true),
    [],
  );

  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>Главная</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/manifests">Манифесты</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{manifestData?.number}</Breadcrumb.Item>
      </Breadcrumb>
      {isLoaded &&
      manifestData &&
      routeParams.manifestId === manifestData.id ? (
        <Content
          style={{
            padding: "0 24px 12px 24px",
            margin: 0,
            minHeight: minPageHeight(),
            background: "#FFF",
          }}
        >
          <Title level={3}>
            {`Манифест ${manifestData.number} 
            от ${dateToLocalString(manifestData.date)} `}
          </Title>

          <Card
            title="Перевозка:"
            style={{ margin: "8px 0" }}
            headStyle={{ backgroundColor: "#F8F8F8" }}
          >
            <p>Перевозчик: {manifestData.manifestCompany}</p>
            <p>Номер накладной: {manifestData.manifestNumber}</p>
          </Card>

          <Card
            title="Отправитель:"
            style={{ margin: "8px 0" }}
            headStyle={{ backgroundColor: "#F8F8F8" }}
          >
            <p>Город: {manifestData.sendCity}</p>
            <p>Компания: {manifestData.sendCompany}</p>
          </Card>

          <Card
            title="Получатель:"
            headStyle={{ backgroundColor: "#F8F8F8" }}
            style={{ margin: "8px 0" }}
          >
            <p>Город: {manifestData.recCity}</p>
            <p>Компания: {manifestData.recCompany}</p>
          </Card>

          <Card
            title="Грузы:"
            headStyle={{ backgroundColor: "#F8F8F8" }}
            style={{ margin: "8px 0" }}
          >
            <p>Итого мест: {manifestData.qtItems}</p>
            <p>Вес: {manifestData.weight}</p>
            <p>Объемный вес: {manifestData.volume}</p>
          </Card>

          {!!manifestData.parcels?.length && (
            <>
              {
                <Table
                  pagination={false}
                  bordered
                  dataSource={parcels}
                  columns={columns}
                  onRow={(record) => {
                    return {
                      onClick: () => {
                        pushPath(`/parcels/${record.key}`);
                      },
                    };
                  }}
                />
              }
            </>
          )}
        </Content>
      ) : (
        <Content
          style={{
            padding: "0 24px",
            margin: "auto",
            minHeight: minPageHeight(),
          }}
        >
          {isLoading ? (
            <Spin size="large" />
          ) : (
            <>
              <Alert
                message="Ошибка получения данных по манифесту"
                description={errMsg}
                type="error"
                closable
              />
              <Button onClick={() => getManifest(dispatch, params)} />
            </>
          )}
        </Content>
      )}
    </>
  );
};
