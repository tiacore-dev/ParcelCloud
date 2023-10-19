import { Breadcrumb, Layout, Table } from "antd";
import * as React from "react";
import { parcelsInStorageDesktopColumns } from "./components/desktop.columns";
import { IauthToken, authToken } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../store/modules";
import "./parcelsInStorage.less";
import { useNavigate } from "react-router-dom";
import { parcelsInStorageMobileColumns } from "./components/mobile.columns";
import { isMobile } from "../../utils/isMobile";
import { minPageHeight } from "../../utils/pageSettings";
import { getParcelsInStorage } from "../../hooks/ApiActions/parcel";
import { Filters } from "./components/filters";

export interface GetParcelsInStorageDto {
  authToken: IauthToken;
}

export const ParcelsInStorage = () => {
  const breadcrumbItems = React.useMemo(
    () => [{ title: "Главная" }, { title: "Накладные на складе" }],
    [],
  );

  const { Content } = Layout;
  const token = authToken();
  const param: GetParcelsInStorageDto = {
    authToken: token,
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filters = useSelector(
    (state: IState) => state.settings.parcelsInStorageSettings?.filters,
  );

  const parcelsData = useSelector(
    (state: IState) => state.pages.parcelsInStorage.data,
  );
  const isLoading = useSelector(
    (state: IState) => state.pages.parcelsInStorage.loading,
  );

  const dataSource = React.useMemo(
    () =>
      parcelsData
        .map((el) => ({ ...el, key: el.id }))
        .filter(
          (el) =>
            filters?.parcelInStorageType === "all" ||
            (filters?.parcelInStorageType === "toDelivery" && el.toDelivery) ||
            (filters?.parcelInStorageType === "myOwn" && el.myOwn) ||
            (filters?.parcelInStorageType === "toReceive" && el.toReceive),
        ),
    [parcelsData, filters],
  );

  React.useEffect(() => {
    if (!parcelsData.length) {
      getParcelsInStorage(dispatch, param);
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
              ? parcelsInStorageMobileColumns()
              : parcelsInStorageDesktopColumns(navigate)
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
