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
import { IManifestList } from "../../interfaces/manifests/IManifestList";

export const Manifests = () => {
  const { Content } = Layout;

  const filters = useSelector(
    (state: IState) => state.settings.manifestsSettings.filters,
  );

  const token = authToken();
  const param: GetManifestsDto = React.useMemo(
    () => ({
      authToken: token,
      filters,
    }),
    [filters.dateFrom, filters.dateTo],
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const manifestsData = useSelector(
    (state: IState) => state.pages.manifests.data,
  );
  const isLoading = useSelector(
    (state: IState) => state.pages.manifests.loading,
  );

  const filtredManifestData: IManifestList[] = manifestsData.filter(
    (manifest) =>
      (filters.number === "" || manifest.number.indexOf(filters.number) > -1) &&
      (filters.manifestType === "all" ||
        filters.manifestType === manifest.type),
  );

  React.useEffect(() => {
    getManifests(dispatch, param);
  }, [filters.dateFrom, filters.dateTo]);

  return (
    <>
      <Breadcrumb
        style={isMobile() && { backgroundColor: "#F8F8F8" }}
        className="breadcrumb"
        items={[{ title: "Главная" }, { title: "Манифесты" }]}
      />
      <Content
        style={{
          padding: isMobile() ? 0 : 16,
          margin: 0,
          minHeight: minPageHeight(),
          background: "#FFF",
        }}
      >
        <Filters onChange={(data) => getManifests(dispatch, data)} />

        <Table
          dataSource={filtredManifestData.map((el) => ({ ...el, key: el.id }))}
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
