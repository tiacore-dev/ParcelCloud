import { Breadcrumb, Layout, Table } from "antd";
import * as React from "react";
import { manifestsDesktopColumns } from "./components/desktop.columns";
import { authToken } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../store/modules";
import { Filters } from "./components/filters";
import "./manifests.less";
import { manifestsMobileColumns } from "./components/mobile.columns";
import { isMobile } from "../../utils/isMobile";
import { minPageHeight } from "../../utils/pageSettings";
import { GetManifestsDto, getManifests } from "../../hooks/ApiActions/manifest";
import { useNavigate } from "react-router-dom";

export const Manifests = () => {
  const { Content } = Layout;

  const filters = useSelector(
    (state: IState) => state.settings.manifestsSettings.filters,
  );

  const token = authToken();
  const param: GetManifestsDto = {
    authToken: token,
    filters,
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const manifestsData = useSelector(
    (state: IState) => state.pages.manifests.data,
  );
  const isLoading = useSelector(
    (state: IState) => state.pages.manifests.loading,
  );

  React.useEffect(() => {
    getManifests(dispatch, param);
  }, [filters]);

  return (
    <>
      <Breadcrumb
        className="breadcrumb"
        items={[{ title: "Главная" }, { title: "Манифесты" }]}
      />
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: minPageHeight(),
          background: "#FFF",
        }}
      >
        <Filters onChange={(data) => getManifests(dispatch, data)} />

        <Table
          dataSource={manifestsData.map((el) => ({ ...el, key: el.id }))}
          columns={
            isMobile() ? manifestsMobileColumns() : manifestsDesktopColumns()
          }
          loading={isLoading}
          onRow={(record) => {
            return {
              onClick: () => {
                navigate(`/manifests/${record.key}`);
              },
            };
          }}
        />
      </Content>
    </>
  );
};
