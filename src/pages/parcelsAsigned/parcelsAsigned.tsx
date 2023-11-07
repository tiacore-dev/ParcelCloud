import { Breadcrumb, Layout, Table } from "antd";
import * as React from "react";
import { parcelsAsignedDesktopColumns } from "./components/desktop.columns";
import { IauthToken, authToken } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../store/modules";
import "./parcelsAsigned.less";
import { useNavigate } from "react-router-dom";
import { parcelsAsignedMobileColumns } from "./components/mobile.columns";
import { isMobile } from "../../utils/isMobile";
import { minPageHeight } from "../../utils/pageSettings";
import { getParcelsAsigned } from "../../hooks/ApiActions/parcel";
import { Filters } from "./components/filters";

export interface GetParcelsAsignedDto {
  authToken: IauthToken;
}

export const ParcelsAsigned = () => {
  const breadcrumbItems = React.useMemo(
    () => [{ title: "Главная" }, { title: "Назначенные накладные" }],
    [],
  );

  const { Content } = Layout;
  const token = authToken();
  const param: GetParcelsAsignedDto = {
    authToken: token,
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filters = useSelector(
    (state: IState) => state.settings.parcelsAsignedSettings.filters,
  );

  const parcelsData = useSelector(
    (state: IState) => state.pages.parcelsAsigned.data,
  );
  const isLoading = useSelector(
    (state: IState) => state.pages.parcelsAsigned.loading,
  );

  const dataSource = React.useMemo(
    () =>
      parcelsData
        .map((el) => ({ ...el, key: el.id }))
        .filter(
          (el) =>
            (filters.number === "" ||
              el.number.toUpperCase().indexOf(filters.number.toUpperCase()) >
                -1) &&
            (filters.taskType === "all" ||
              (filters.taskType === "toDelivery" && el.toDelivery) ||
              (filters.taskType === "toReceive" && el.toReceive)),
        ),
    [parcelsData, filters],
  );

  React.useEffect(() => {
    if (!parcelsData.length) {
      getParcelsAsigned(dispatch, param);
    }
  }, []);

  return (
    <>
      <Breadcrumb className="breadcrumb" items={breadcrumbItems} />
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: minPageHeight(),
          background: "#FFF",
        }}
      >
        <Filters />
        <Table
          dataSource={dataSource}
          columns={
            isMobile()
              ? parcelsAsignedMobileColumns()
              : parcelsAsignedDesktopColumns()
          }
          loading={isLoading}
          onRow={(record) => {
            return {
              onClick: () => {
                navigate(`/parcels/${record.key}`);
              },
            };
          }}
        />
      </Content>
    </>
  );
};
