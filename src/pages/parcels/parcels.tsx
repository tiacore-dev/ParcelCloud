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
import {
  setAppHeaderTitle,
  setShowBackButton,
} from "../../store/modules/settings/general";

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

  React.useEffect(() => {
    if (isMobile()) {
      dispatch(setShowBackButton(false));
      dispatch(setAppHeaderTitle("Накладные"));
    }
  }, []);

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
        style={isMobile() && { backgroundColor: "#F8F8F8" }}
        items={[{ title: "Главная" }, { title: "Накладные" }]}
      />
      <Content
        style={{
          padding: isMobile() ? 0 : 8,
          margin: 0,
          minHeight: minPageHeight(),
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
              ? parcelsMobileColumns(customerView, navigate)
              : parcelsDesktopColumns(customerView, navigate)
          }
          loading={isLoading}
        />
      </Content>
    </>
  );
};
