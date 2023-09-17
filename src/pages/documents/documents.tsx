import { Breadcrumb, Layout, Table } from "antd";
import * as React from "react";
import { useApi } from "../../hooks/useApi";
import { documentsDesktopColumns } from "./components/desktop.columns";
import { IauthToken, authToken } from "../../hooks/useAuth";
import { convertDocumentsData } from "./convertDocumentsData";
import {
  getDocumentsFailure,
  getDocumentsRequest,
  getDocumentsSuccess,
} from "../../store/modules/pages/documents";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../store/modules";
import { IDocumentsSettingsState } from "../../store/modules/settings/documents";
import { Filters } from "./components/filters";
import "./documents.less";
import { IDocumentsList } from "../../interfaces/documents/IDocumentsList";
import { useNavigate } from "react-router-dom";
import { isMobile } from "../../utils/isMobile";
import { documentsMobileColumns } from "./components/mobile.columns";
import { convertDocumentsDataMobile } from "./convertDocumentsDataMobile";
import { minPageHeight } from "../../utils/pageSettings";

interface GetDocumentsDto extends IDocumentsSettingsState {
  authToken: IauthToken;
}

export interface IDocumentsCovertedData {
  key: string;
  number?: JSX.Element;
  customer?: JSX.Element;
  performer?: JSX.Element;
  summ?: JSX.Element;
  mobileData?: JSX.Element;
}

export const Documents = () => {
  const { Content } = Layout;
  const navigate = useNavigate();
  const filters = useSelector(
    (state: IState) => state.settings.documentsSettings.filters,
  );
  const param: GetDocumentsDto = {
    authToken: authToken(),
    filters,
  };

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getDocumentsRequest());
    useApi<IDocumentsList[], GetDocumentsDto>("documents", "get", param)
      .then((documentsData) => {
        dispatch(getDocumentsSuccess(documentsData));
      })
      .catch((err) => {
        dispatch(getDocumentsFailure(err));
      });
  }, [filters]);

  const documentsData = useSelector(
    (state: IState) => state.pages.documents.data,
  );
  const convertedDocumentsData = isMobile()
    ? convertDocumentsDataMobile(documentsData)
    : convertDocumentsData(documentsData);
  const isLoading = useSelector(
    (state: IState) => state.pages.documents.loading,
  );

  const onRowClick = (record: IDocumentsCovertedData) => {
    return {
      onClick: () => {
        navigate(`/documents/${record.key}`);
      },
    };
  };

  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
        items={[{ title: "Главная" }, { title: "Документы" }]}
      />
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
          dataSource={convertedDocumentsData}
          columns={
            isMobile() ? documentsMobileColumns : documentsDesktopColumns
          }
          loading={isLoading}
          onRow={onRowClick}
        />
      </Content>
    </>
  );
};
