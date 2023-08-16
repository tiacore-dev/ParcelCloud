import * as React from 'react';
import {
  Breadcrumb,
  Button,
  Card,
  Layout,
  Table
} from 'antd';
import Title from 'antd/es/typography/Title';
import { Link, useParams } from 'react-router-dom';
import { IDocumentsRouteParams } from '../../core/router';
import { useDispatch, useSelector } from 'react-redux';
import { getDocumentFailure, getDocumentRequest, getDocumentSuccess } from '../../store/modules/pages/document';
import { useApi, useGettingFile } from '../../hooks/useApi';
import { IDocument } from '../../interfaces/documents/IDocument';
import { IauthToken, authToken } from '../../hooks/useAuth';
import { IState } from '../../store/modules';
import { parcelsColumns } from './components/parcelsColumns';
import { convertDocumentParcelsData } from './convertParcelsData';
import { pushPath } from '../../core/history';
import { minPageHeight } from '../../utils/pageSettings';

interface GetDocumentDto {
  documentId: string;
  authToken: IauthToken
}

export const Document = () => {

  const { Content } = Layout;

  const routeParams: IDocumentsRouteParams = useParams();

  const dispatch = useDispatch();

  const token = authToken();
  const params: GetDocumentDto = {
    authToken: token,
    documentId: routeParams.documentId
  }



  React.useEffect(() => {
    dispatch(getDocumentRequest())
    useApi<IDocument, GetDocumentDto>('document', 'get', params).then((documentData) => {
      dispatch(getDocumentSuccess(documentData))
    }).catch(err => {
      dispatch(getDocumentFailure(err))
    })
  }, [])

  const documentData = useSelector((state: IState) => state.pages.document.data)
  const isLoaded = useSelector((state: IState) => state.pages.document.loaded)

  const getOrder = React.useCallback(() => {
    if (!documentData.number) {
      return
    }
    useGettingFile(token, 'order', documentData.id, `Счёт ${documentData.number} (${documentData.performer})`)
  }, [token, documentData])

  const getAct = React.useCallback(() => {
    if (!documentData.number) {
      return
    }
    useGettingFile(token, 'act', documentData.id, `Акт ${documentData.number} (${documentData.performer})`)
  }, [token, documentData])

  const getCf = React.useCallback(() => {
    if (!documentData.number) {
      return
    }
    useGettingFile(token, 'cf', documentData.id, `Счёт-фактура ${documentData.number} (${documentData.performer})`)
  }, [token, documentData])


  const convertedParcelData = convertDocumentParcelsData(documentData?.parcels)
  const vat = !!documentData ? !!documentData.parcels?.length ?
    documentData.parcels.reduce((total, parcel) => {
      return total + Number((parcel.summ - parcel.summ / (1 + documentData.vat / 100)).toFixed(2))
    }, 0)
    :
    Number((documentData.summ / (1 + documentData.vat / 100)).toFixed(2))
    : 0

  return <>

    <Breadcrumb
      style={{
        margin: '16px 0',
      }}
    >
      <Breadcrumb.Item>Главная</Breadcrumb.Item>
      <Breadcrumb.Item>
        <Link to="/documents">Документы</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>{documentData?.number}</Breadcrumb.Item>

    </Breadcrumb>
    {isLoaded && documentData && routeParams.documentId === documentData.id ?
      <Content
        style={{
          padding: "0 24px",
          margin: 0,
          minHeight: minPageHeight(),
          background: '#FFF',
        }}
      >
        <Title level={3}>{`Реализация ${documentData.number}`}</Title>
       
        <Button
            onClick={getOrder}
            size='small'
          >
            Скачать Счёт
          </Button>

          <Button
            onClick={getAct}
            style={{ marginLeft: 12 }}
            size='small'
          >
            Скачать Акт
          </Button>

          {!!documentData.vat &&
            <Button
              onClick={getCf}
              style={{ marginLeft: 12 }}
              size='small'
            >
              Скачать Счёт-фактуру
            </Button>
          }

        <Card
          title="Заказчик:"
          style={{ margin: "8px 0" }}
        >
          <p>Наименование:  {documentData.customer}</p>
          <p>ИНН: {documentData.customerInn}</p>
          <p>КПП: {documentData.customerKpp}</p>
          <p>Адрес: {documentData.customerAddress}</p>
        </Card>

        <Card
          title="Исполнитель:"
          style={{ margin: "8px 0" }}
        >
          <p>Наименование:  {documentData.performer}</p>
          <p>ИНН: {documentData.performerInn}</p>
          <p>КПП: {documentData.performerKpp}</p>
          <p>Адрес: {documentData.performerAddress}</p>
        </Card>

        {!!documentData.parcels && !!documentData.parcels.length &&
          <Table
            pagination={false}
            dataSource={convertedParcelData}
            columns={parcelsColumns}
            bordered
            onRow={(record) => {
              return {
                onClick: () => {
                  pushPath(`/parcels/${record.key}`)
                },
              };
            }}
          />}

        <Card
          title="Итого:"
          style={{ margin: "8px 0" }}
        >
          {!!documentData.info && <p>Наименование услуги: {documentData.info}</p>}
          <p>Сумма: {documentData.summ.toFixed(2)}</p>
          {!!documentData.vat ?
            <p>в том числе НДС {vat.toFixed(2)} руб.</p>
            : <p>НДС не облагается.</p>
          }
        </Card>
      </Content> : <></>}
  </>
}



