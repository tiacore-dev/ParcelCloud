import { Breadcrumb, Button, Layout, Table } from "antd";
import * as React from "react";
import { useApi } from "../../hooks/useApi";
import { parcelsAsignedDesktopColumns } from "./components/desktop.columns";
import { IauthToken, authToken } from "../../hooks/useAuth";
import {
  getParcelsAsignedFailure,
  getParcelsAsignedRequest,
  getParcelsAsignedSuccess,
} from "../../store/modules/pages/parcelsAsigned";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../store/modules";
import "./parcelsAsigned.less";
import { IParcelsAsignedList } from "../../interfaces/parcels/IParcelsList";
import { pushPath } from "../../core/history";
import { parcelsAsignedMobileColumns } from "./components/mobile.columns";
import { isMobile } from "../../utils/isMobile";
import { minPageHeight } from "../../utils/pageSettings";
import { ReloadOutlined } from "@ant-design/icons";

export interface GetParcelsAsignedDto {
  authToken: IauthToken;
}

export const ParcelsAsigned = () => {
  const { Content } = Layout;
  const token = authToken();
  const param: GetParcelsAsignedDto = {
    authToken: token,
  };

  const dispatch = useDispatch();

  const getParcelsAsigned = React.useCallback(
    (getParcelsParam: GetParcelsAsignedDto) => {
      dispatch(getParcelsAsignedRequest());
      useApi<IParcelsAsignedList[], GetParcelsAsignedDto>(
        "parcelsasigned",
        "get",
        getParcelsParam,
      )
        .then((parcelsData) => {
          dispatch(getParcelsAsignedSuccess(parcelsData));
        })
        .catch((err) => {
          dispatch(getParcelsAsignedFailure(err));
        });
    },
    [],
  );

  const parcelsData = useSelector(
    (state: IState) => state.pages.parcelsAsigned.data,
  );
  const isLoading = useSelector(
    (state: IState) => state.pages.parcelsAsigned.loading,
  );

  React.useEffect(() => {
    if (!parcelsData.length) {
      getParcelsAsigned(param);
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
        <Breadcrumb.Item>Назначенные накладные</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: minPageHeight(),
          background: "#FFF",
        }}
      >
        <Button
          icon={<ReloadOutlined />}
          onClick={() => getParcelsAsigned(param)}
        />
        <Table
          dataSource={parcelsData.map((el) => ({ ...el, key: el.id }))}
          columns={
            isMobile()
              ? parcelsAsignedMobileColumns()
              : parcelsAsignedDesktopColumns()
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
