import { Breadcrumb, Layout, Table } from "antd";
import * as React from "react";
import { parcelsDesktopColumns } from "./components/desktop.columns";
import { authToken, checkPermission } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../store/modules";
import { Filters } from "./components/filters";
import "./parcels.less";
import { useNavigate } from "react-router-dom";
import { parcelsMobileColumns } from "./components/mobile.columns";
import { isMobile } from "../../utils/isMobile";
import { minPageHeight } from "../../utils/pageSettings";
import { GetParcelsDto, getParcels } from "../../hooks/ApiActions/parcel";

export const Parcels = () => {
  const { Content } = Layout;

  const filters = useSelector(
    (state: IState) => state.settings.parcelsSettings.filters,
  );

  const token = authToken();
  const param: GetParcelsDto = {
    authToken: token,
    filters,
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const parcelsData = useSelector((state: IState) => state.pages.parcels.data);
  const isLoading = useSelector((state: IState) => state.pages.parcels.loading);
  const customerView =
    checkPermission("parcel-view-all") ||
    checkPermission("parcel-view-assigned");

  React.useEffect(() => {
    getParcels(dispatch, param);
  }, [
    filters.dateFrom,
    filters.dateTo,
    filters.number,
    filters.recCities,
    filters.sendCities,
  ]);

  const data = React.useMemo(
    () =>
      parcelsData
        .filter(
          (el) =>
            !filters.statuses ||
            !filters.statuses.length ||
            filters.statuses.includes(el.statusType),
        )
        .map((el) => ({ ...el, key: el.id })),
    [parcelsData, filters.statuses],
  );

  const statuses = React.useMemo(
    () => Array.from(new Set(parcelsData.map((el) => el.statusType))),
    [parcelsData],
  );

  const statusFiters = React.useMemo(
    () =>
      statuses.map((status) => ({
        text: status,
        value: status,
      })),
    [statuses],
  );
  return (
    <>
      <Breadcrumb
        className="breadcrumb"
        items={[{ title: "Главная" }, { title: "Накладные" }]}
      />
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: minPageHeight(),
          background: "#FFF",
        }}
      >
        <Filters
          onChange={(data) => getParcels(dispatch, data)}
          parcelsData={data}
          statuses={statusFiters}
        />

        <Table
          dataSource={data}
          columns={
            isMobile()
              ? parcelsMobileColumns(customerView)
              : parcelsDesktopColumns(customerView, navigate)
          }
          loading={isLoading}
        />
      </Content>
    </>
  );
};
