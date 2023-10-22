import { Breadcrumb, Layout, Table } from "antd";
import * as React from "react";
import { documentsDesktopColumns } from "./components/desktop.columns";
import { authToken } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../store/modules";
import { Filters } from "./components/filters";
import "./documents.less";
import { useNavigate } from "react-router-dom";
import { isMobile } from "../../utils/isMobile";
import { documentsMobileColumns } from "./components/mobile.columns";
import { minPageHeight } from "../../utils/pageSettings";
import {
  GetDocumentsDto,
  getDocuments,
  viewDocument,
} from "../../hooks/ApiActions/document";
import { IDocumentsListColumn } from "../../interfaces/documents/IDocumentsList";

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

  const token = authToken();

  const param: GetDocumentsDto = {
    authToken: token,
    filters,
  };

  const dispatch = useDispatch();

  React.useEffect(() => {
    getDocuments(dispatch, param);
  }, [filters]);

  const documentsData: IDocumentsListColumn[] = useSelector(
    (state: IState) => state.pages.documents.data,
  ).map((doc) => ({ ...doc, key: doc.id }));

  const isLoading = useSelector(
    (state: IState) => state.pages.documents.loading,
  );

  const onView = React.useCallback((id: string) => {
    viewDocument(dispatch, {
      authToken: token,
      documentId: id,
    });
  }, []);

  return (
    <>
      <Breadcrumb
        className="breadcrumb"
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
          dataSource={documentsData}
          columns={
            isMobile()
              ? documentsMobileColumns
              : documentsDesktopColumns(onView, navigate)
          }
          loading={isLoading}
        />
      </Content>
    </>
  );
};
