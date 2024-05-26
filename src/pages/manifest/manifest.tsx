import * as React from "react";
import { Alert, Breadcrumb, Button, Card, Layout, Spin, Table } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authToken } from "../../hooks/useAuth";
import { IState } from "../../store/modules";
import { minPageHeight } from "../../utils/pageSettings";
import { isMobile } from "../../utils/isMobile";
import { dateToLocalString } from "../../utils/dateConverter";
import { parcelsMobileColumns } from "../parcels/components/mobile.columns";
import { GetManifestDto, getManifest } from "../../hooks/ApiActions/manifest";
import { TableRowSelection } from "antd/es/table/interface";
import { IParcelsListColumn } from "../../interfaces/parcels/IParcelsList";
import {
  GeneralStatusParcelsSetDto,
  setGeneralParcelsStatus,
} from "../../hooks/ApiActions/parcel";
import { ManifestActions } from "./components/actions";
import "./manifest.less";
import { manifestParcelsDesktopColumns } from "./components/desktop.columns";
import {
  setAppHeaderTitle,
  setShowBackButton,
} from "../../store/modules/settings/general";

export const Manifest = () => {
  const { Content } = Layout;

  const routeParams = useParams();
  const dispatch = useDispatch();
  const token = authToken();
  const navigate = useNavigate();
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

  const title = React.useMemo(
    () => (manifestData ? "Манифест " + manifestData.number : "Манифест"),
    [manifestData],
  );

  React.useEffect(() => {
    if (isMobile()) {
      dispatch(setShowBackButton(true));
      dispatch(setAppHeaderTitle(title));
    }
  }, [title]);

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

  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);

  const receiveParcels = React.useCallback(() => {
    const receiveParcelsParams: GeneralStatusParcelsSetDto = {
      authToken: token,
      parcelIds: selectedRows,
    };

    setGeneralParcelsStatus(dispatch, receiveParcelsParams);
  }, [selectedRows, token]);
  const hasUnreceiver: boolean =
    manifestData?.parcels?.filter(
      (parcel) => parcel.status === "availableToReceive",
    ).length > 0;

  const columns = React.useMemo(
    () =>
      isMobile()
        ? parcelsMobileColumns(true)
        : manifestParcelsDesktopColumns(true, navigate),
    [],
  );

  const rowSelection: TableRowSelection<IParcelsListColumn> = hasUnreceiver
    ? {
        type: "checkbox",
        onChange: (
          selectedRowKeys: React.Key[],
          selectedRows: IParcelsListColumn[],
        ) => {
          setSelectedRows(selectedRows.map((el) => el.id));
        },
        getCheckboxProps: (record: IParcelsListColumn) => ({
          disabled: record.status !== "availableToReceive",
        }),
      }
    : undefined;

  return (
    <>
      <Breadcrumb
        className="breadcrumb"
        style={isMobile() && { backgroundColor: "#F8F8F8" }}
        items={[
          { title: "Главная" },
          {
            title: "Манифесты",
          },
          { title: manifestData?.number },
        ]}
      />
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
          {!isMobile() && (
            <div className="manifest__title">
              (
              <div className="manifest__number">{`Манифест ${
                manifestData.number
              } 
            от ${dateToLocalString(manifestData.date)} `}</div>
              )
              <ManifestActions manifestData={manifestData} />
            </div>
          )}

          <Card
            title="Перевозка:"
            style={{ margin: "8px 0" }}
            headStyle={{ backgroundColor: "#F8F8F8" }}
          >
            <p>Расчетная дата: {dateToLocalString(manifestData.delDate)}</p>
            <p>Перевозчик: {manifestData.manifestCompany}</p>
            <p>Номер накладной: {manifestData.transferNumber}</p>
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
            <p>Итого накладных: {manifestData.qtParcels}</p>
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
                  rowSelection={rowSelection}
                />
              }
            </>
          )}

          {!!selectedRows.length && !!manifestData.parcels && (
            <Button onClick={receiveParcels} style={{ margin: "8px 0" }}>
              Принять накладные на склад
              {` (${selectedRows.length} из ${manifestData.parcels.length})`}
            </Button>
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
                description={`${errMsg}`}
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
