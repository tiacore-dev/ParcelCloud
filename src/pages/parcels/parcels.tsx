import { Breadcrumb, Layout, Table } from "antd";
import * as React from "react";
import { useApi } from "../../hooks/useApi";
import { parcelsDesktopColumns } from "./components/desktop.columns";
import { IauthToken, authToken } from "../../hooks/useAuth";
import {
  getParcelsFailure,
  getParcelsRequest,
  getParcelsSuccess,
} from "../../store/modules/pages/parcels";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../store/modules";
import { IParcelsSettingsState } from "../../store/modules/settings/parcels";
import { Filters } from "./components/filters";
import "./parcels.less";
import { IParcelsList } from "../../interfaces/parcels/IParcelsList";
import { pushPath } from "../../core/history";
import { parcelsMobileColumns } from "./components/mobile.columns";
import { isMobile } from "../../utils/isMobile";
import { minPageHeight } from "../../utils/pageSettings";

export interface GetParcelsDto extends IParcelsSettingsState {
  authToken: IauthToken;
}

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

  const getParcels = React.useCallback((getParcelsParam: GetParcelsDto) => {
    dispatch(getParcelsRequest());
    useApi<IParcelsList[], GetParcelsDto>("parcels", "get", getParcelsParam)
      .then((parcelsData) => {
        dispatch(getParcelsSuccess(parcelsData));
      })
      .catch((err) => {
        dispatch(getParcelsFailure(err));
      });
  }, []);

  const parcelsData = useSelector((state: IState) => state.pages.parcels.data);
  const isLoading = useSelector((state: IState) => state.pages.parcels.loading);

  React.useEffect(() => {
    if (!parcelsData.length) {
      getParcels(param);
    }
  }, []);

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
        <Filters onChange={getParcels} />

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
