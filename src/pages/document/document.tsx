import * as React from "react";
import { Breadcrumb, Button, Card, Layout, Space, Table } from "antd";
import Title from "antd/es/typography/Title";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getDocumentFailure,
  getDocumentRequest,
  getDocumentSuccess,
} from "../../store/modules/pages/document";
import { useApi, useGettingFile } from "../../hooks/useApi";
import { IDocument } from "../../interfaces/documents/IDocument";
import { IauthToken, authToken } from "../../hooks/useAuth";
import { IState } from "../../store/modules";
import { useNavigate } from "react-router-dom";
import { minPageHeight } from "../../utils/pageSettings";
import { isMobile } from "../../utils/isMobile";
import { parcelsDesktopColumns } from "./components/desktop.columns";
import { parcelsMobileColumns } from "./components/mobile.columns";

interface GetDocumentDto {
  documentId: string;
  authToken: IauthToken;
}

export const Document = () => {
  const { Content } = Layout;

  const routeParams = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = authToken();
  const params: GetDocumentDto = {
    authToken: token,
    documentId: routeParams.documentId,
  };

  React.useEffect(() => {
    dispatch(getDocumentRequest());
    useApi<IDocument, GetDocumentDto>("document", "get", params)
      .then((documentData) => {
        dispatch(getDocumentSuccess(documentData));
      })
      .catch((err) => {
        dispatch(getDocumentFailure(err));
      });
  }, []);

  const documentData = useSelector(
    (state: IState) => state.pages.document.data,
  );
  const isLoaded = useSelector((state: IState) => state.pages.document.loaded);

  const getOrder = React.useCallback(() => {
    if (!documentData.number) {
      return;
    }
    useGettingFile(
      token,
      "order",
      documentData.id,
      `Счёт ${documentData.number} (${documentData.performer})`,
    );
  }, [token, documentData]);

  const getAct = React.useCallback(() => {
    if (!documentData.number) {
      return;
    }
    useGettingFile(
      token,
      "act",
      documentData.id,
      `Акт ${documentData.number} (${documentData.performer})`,
    );
  }, [token, documentData]);

  const getCf = React.useCallback(() => {
    if (!documentData.number) {
      return;
    }
    useGettingFile(
      token,
      "cf",
      documentData.id,
      `Счёт-фактура ${documentData.number} (${documentData.performer})`,
    );
  }, [token, documentData]);

  const vat = !!documentData
    ? !!documentData.parcels?.length
      ? documentData.parcels.reduce((total, parcel) => {
          return (
            total +
            Number(
              (
                parcel.summ -
                parcel.summ / (1 + documentData.vat / 100)
              ).toFixed(2),
            )
          );
        }, 0)
      : Number((documentData.summ / (1 + documentData.vat / 100)).toFixed(2))
    : 0;

  return (
    <>
      <Breadcrumb
        className="breadcrumb"
        items={[
          { title: "Главная" },
          {
            title: "Документы",
            // ,<Link to="/documents">Документы</Link>
          },
          { title: documentData?.number },
        ]}
      />
      {isLoaded &&
      documentData &&
      routeParams.documentId === documentData.id ? (
        <Content
          style={{
            padding: "0 24px",
            margin: 0,
            minHeight: minPageHeight(),
            background: "#FFF",
          }}
        >
          <Title level={3}>{`Реализация ${documentData.number}`}</Title>
          <Space
            direction={isMobile() ? "vertical" : "horizontal"}
            size="small"
          >
            <Button onClick={getOrder} size="small">
              Скачать Счёт
            </Button>

            <Button onClick={getAct} size="small">
              Скачать Акт
            </Button>

            {!!documentData.vat && (
              <Button onClick={getCf} size="small">
                Скачать Счёт-фактуру
              </Button>
            )}
          </Space>
          <Card
            headStyle={{ backgroundColor: "#F8F8F8" }}
            title="Заказчик:"
            style={{ margin: "8px 0" }}
          >
            <p>Наименование: {documentData.customer}</p>
            <p>ИНН: {documentData.customerInn}</p>
            <p>КПП: {documentData.customerKpp}</p>
            <p>Адрес: {documentData.customerAddress}</p>
          </Card>

          <Card
            title="Исполнитель:"
            style={{ margin: "8px 0" }}
            headStyle={{ backgroundColor: "#F8F8F8" }}
          >
            <p>Наименование: {documentData.performer}</p>
            <p>ИНН: {documentData.performerInn}</p>
            <p>КПП: {documentData.performerKpp}</p>
            <p>Адрес: {documentData.performerAddress}</p>
          </Card>

          {!!documentData.parcels && !!documentData.parcels.length && (
            <Table
              pagination={false}
              dataSource={documentData?.parcels}
              columns={
                isMobile() ? parcelsMobileColumns : parcelsDesktopColumns
              }
              bordered
              onRow={(record) => {
                return {
                  onClick: () => {
                    navigate(`/parcels/${record.id}`);
                  },
                };
              }}
            />
          )}

          <Card
            title="Итого:"
            style={{ margin: "8px 0" }}
            headStyle={{ backgroundColor: "#F8F8F8" }}
          >
            {!!documentData.info && (
              <p>Наименование услуги: {documentData.info}</p>
            )}
            <p>Сумма: {documentData.summ.toFixed(2)}</p>
            {!!documentData.vat ? (
              <p>в том числе НДС {vat.toFixed(2)} руб.</p>
            ) : (
              <p>НДС не облагается.</p>
            )}
          </Card>
        </Content>
      ) : (
        <></>
      )}
    </>
  );
};
