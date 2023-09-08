import { Breadcrumb, Layout, Table } from "antd";
import * as React from "react";
import { parcelsDesktopColumns } from "./components/desktop.columns";
import { authToken } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../store/modules";
import { Filters } from "./components/filters";
import "./parcels.less";
import { pushPath } from "../../core/history";
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

  const parcelsData = useSelector((state: IState) => state.pages.parcels.data);
  const isLoading = useSelector((state: IState) => state.pages.parcels.loading);

  React.useEffect(() => {
    getParcels(dispatch, param);
  }, [filters]);

  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
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
          background: "#FFF",
        }}
      >
        <Filters onChange={(data) => getParcels(dispatch, data)} />

        <Table
          dataSource={parcelsData.map((el) => ({ ...el, key: el.id }))}
          columns={
            isMobile() ? parcelsMobileColumns() : parcelsDesktopColumns()
          }
          loading={isLoading}
          onRow={(record) => {
            return {
              onClick: () => {
                pushPath(`/parcels/${record.key}`);
              },
            };
          }}
        />
      </Content>
    </>
  );
};
