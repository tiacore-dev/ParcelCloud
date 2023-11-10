import { Breadcrumb, Space, Table } from "antd";
import { Content } from "antd/es/layout/layout";
import * as React from "react";
import { minPageHeight } from "../../utils/pageSettings";
import "./api.less";
import { ColumnsType } from "antd/es/table";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";

interface apiParam {
  name: string;
  type: string | apiParam[];
  require: boolean;
  example?: string;
}

interface apiMethod {
  name: string;
  url: string;
  descriotion: string;
  params: apiParam[];
  result: React.JSX.Element;
}

export const Api = () => {
  const data: apiMethod[] = [
    {
      name: "getParcels",
      url: "/parcels/get",
      descriotion: "Возвращает все накладные с учетом указанных параметров",
      params: [
        {
          name: "authToken",
          type: [
            {
              name: "userKey",
              type: "string",
              require: true,
              example: "b31e59c0-0771-94bf8a9f8c77",
            },
            {
              name: "token",
              type: "string",
              require: true,
              example: "e9d23cff9b995b22c12321186964618",
            },
          ],
          require: true,
        },
        {
          name: "filters",
          type: [
            {
              name: "dateFrom",
              type: "timestamp",
              require: true,
              example: "1697041643798",
            },
            {
              name: "dateTo",
              type: "timestamp",
              require: true,
              example: "1699633643798",
            },
            {
              name: "number",
              type: "string",
              require: true,
              example: "1122-444444",
            },
          ],
          require: true,
        },
      ],
      result: (
        <div>
          {" "}
          Массив накладных типа
          <br />
          id: string;
          <br />
          date: string;
          <br />
          customer: string;
          <br />
          number: string;
          <br />
          recCity: string;
          <br />
          recAddress: string;
          <br />
          recCompany: string;
          <br />
          sendCity: string;
          <br />
          sendAddress: string;
          <br />
          sendCompany: string;
          <br />
          qt: number;
          <br />
          weight: number;
          <br />
          volume: number;
          <br />
          price?: number;
          <br />
          status?: ParcelStatus;
          <br />
          statusType?: string;
          <br />
          statusValue?: string;
          <br />
          statusDate?: string;
          <br />
        </div>
      ),
    },

    {
      name: "getParcel",
      url: "/parcel/get",
      descriotion: "Возвращает одну накладную по id",
      params: [
        {
          name: "authToken",
          type: [
            {
              name: "userKey",
              type: "string",
              require: true,
              example: "b31e59c0-0771-94bf8a9f8c77",
            },
            {
              name: "token",
              type: "string",
              require: true,
              example: "e9d23cff9b995b22c12321186964618",
            },
          ],
          require: true,
        },
        {
          name: "parcelId",
          type: "string",
          require: true,
        },
      ],
      result: (
        <div>
          id: string;
          <br />
          date: number;
          <br />
          number: string;
          <br />
          customer: string;
          <br />
          payer?: string;
          <br />
          sendCity: string;
          <br />
          sendPerson: string;
          <br />
          sendAddress: string;
          <br />
          sendCompany: string;
          <br />
          sendAddInfo: string;
          <br />
          sendPhone: string;
          <br />
          sendTime: string;
          <br />
          recCity: string;
          <br />
          recPerson: string;
          <br />
          recAddress: string;
          <br />
          recCompany: string;
          <br />
          recAddInfo: string;
          <br />
          recPhone: string;
          <br />
          recTime: string;
          <br />
          description: string;
          <br />
          qt: number;
          <br />
          weight: number;
          <br />
          volume: number;
          <br />
          priceId?: string;
          <br />
          cost: number;
          <br />
          insureValue: number;
          <br />
          COD: number;
          <br />
          payType: string
          <br />
          delType: string;
          <br />
          tMax: number;
          <br />
          tMin: number;
          <br />
          fragile: boolean;
          <br />
          containerRent: boolean;
          <br />
          items: IParcelItem[];
          <br />
          history: IParcelHistory[];
          <br />
          status: ParcelStatus;
          <br />
        </div>
      ),
    },

    {
      name: "createParcel",
      url: "/parcelcreate/create",
      descriotion: "Создает одну накладную",
      params: [
        {
          name: "authToken",
          type: [
            {
              name: "userKey",
              type: "string",
              require: true,
              example: "b31e59c0-0771-94bf8a9f8c77",
            },
            {
              name: "token",
              type: "string",
              require: true,
              example: "e9d23cff9b995b22c12321186964618",
            },
          ],
          require: true,
        },
        {
          name: "date",
          type: "timestamp",
          require: true,
          example: "1697041643798",
        },
        {
          name: "sendCity",
          type: "cityId",
          require: true,
          example: "4545756575b22c12321186964618",
        },
        {
          name: "sendPerson",
          type: "string",
          require: true,
        },
        {
          name: "sendAddress",
          type: "string",
          require: true,
        },
        {
          name: "sendCompany",
          type: "string",
          require: true,
        },
        {
          name: "sendAddInfo",
          type: "string",
          require: true,
        },
        {
          name: "sendPhone",
          type: "string",
          require: true,
        },
        {
          name: "sendTime",
          type: "string",
          require: true,
        },
        {
          name: "recCity",
          type: "cityId",
          require: true,
          example: "4545756575b22c12321186964618",
        },
        {
          name: "recPerson",
          type: "string",
          require: true,
        },
        {
          name: "recAddress",
          type: "string",
          require: true,
        },
        {
          name: "recCompany",
          type: "string",
          require: true,
        },
        {
          name: "recAddInfo",
          type: "string",
          require: true,
        },
        {
          name: "recPhone",
          type: "string",
          require: true,
        },
        {
          name: "recTime",
          type: "string",
          require: true,
        },
        {
          name: "description",
          type: "string",
          require: true,
        },
        {
          name: "qt",
          type: "number",
          require: true,
        },
        {
          name: "weight",
          type: "number",
          require: true,
        },
        {
          name: "volume",
          type: "number",
          require: true,
        },
        {
          name: "insureValue",
          type: "number",
          require: true,
        },
        {
          name: "COD",
          type: "number",
          require: true,
        },
        {
          name: "tMax",
          type: "string",
          require: false,
        },
        {
          name: "tMin",
          type: "string",
          require: false,
        },
        {
          name: "fragile",
          type: "boolean",
          require: false,
        },
      ],
      result: (
        <div>
          id: string;
          <br />
          number: string;
          <br />
        </div>
      ),
    },
  ];

  const paramColumns: ColumnsType<apiParam> = [
    {
      title: "Наименование",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Тип",
      key: "type",
      render: (text: string, record: apiParam) =>
        Array.isArray(record.type) ? (
          <Table
            bordered
            size="small"
            pagination={false}
            dataSource={record.type}
            columns={paramColumns}
          />
        ) : (
          record.type
        ),
    },
    {
      title: "Обязательный",
      render: (text: string, record: apiParam) =>
        record.require ? (
          <CheckCircleTwoTone
            style={{ margin: "auto" }}
            twoToneColor="#66cc00"
          />
        ) : (
          <CloseCircleTwoTone
            style={{ margin: "auto" }}
            twoToneColor="#cc0000"
          />
        ),
      key: "require",
    },
    {
      title: "Пример",
      key: "example",
      dataIndex: "example",
    },
  ];

  return (
    <>
      <Breadcrumb
        className="breadcrumb"
        items={[
          { title: "Главная" },
          {
            title: "API",
            // <Link to="/parcels">Накладные</Link>
          },
        ]}
      />

      <Content
        style={{
          padding: "0 24px",
          margin: 0,
          minHeight: minPageHeight(),
          background: "#FFF",
        }}
      >
        <Space direction="vertical" style={{ margin: "16px 0", width: "100%" }}>
          <div className="api__title">Документация API</div>
          url: https://srv.svs-logistik.ru/parcelcloud/hs/parcelcloud
          <br />
          Используются только методы <b>POST</b>
          <br />
          Возвращаемое значение содержит:
          <ul>
            <li>error: boolean</li>
            <li>errorMessage?: string</li>
            <li>responceData?: Возвращаемые данные</li>
          </ul>
          <b>Методы:</b>
          {data.map((record) => (
            <Space
              direction="vertical"
              style={{
                borderBottom: "solid gray 1px",
                padding: "16px 0",
                width: "100%",
              }}
            >
              <h3>{record.name}</h3>
              <div>
                <b>Ссылка:</b> {record.url}
              </div>
              <div>
                <b>Описание:</b> {record.descriotion}
              </div>
              <b>Параметры:</b>
              <Table
                bordered
                size="small"
                pagination={false}
                dataSource={record.params}
                columns={paramColumns}
              />
              <div>
                <b>Результат:</b> {record.result}
              </div>
            </Space>
          ))}
        </Space>
      </Content>
    </>
  );
};
