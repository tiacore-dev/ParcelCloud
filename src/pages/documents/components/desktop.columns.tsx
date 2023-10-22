import * as React from "react";
import { IDocumentsListColumn } from "../../../interfaces/documents/IDocumentsList";
import { dateToLocalString } from "../../../utils/dateConverter";
import { ColumnsType } from "antd/es/table";
import { NavigateFunction } from "react-router-dom";

export const documentsDesktopColumns = (
  onView: (id: string) => void,
  navigate: NavigateFunction,
): ColumnsType<IDocumentsListColumn> => [
  {
    dataIndex: "viewed",
    key: "viewed",

    render: (text: string, record: IDocumentsListColumn) => (
      <div
        className={`documents__table__unviewed ${
          !record.viewed && "documents__table__unviewed__row"
        }`}
        onClick={() => onView(record.id)}
      >
        {!record.viewed && "•"}
      </div>
    ),
  },
  {
    title: "Номер",
    dataIndex: "number",
    key: "number",
    width: "20%",

    render: (text: string, record: IDocumentsListColumn) => (
      <div className={!record.viewed && "documents__table__unviewed__row"}>
        <a
          className="documents__table__number"
          onClick={() => navigate && navigate(`/documents/${record.key}`)}
        >
          {record.number}
        </a>
        <div>от {dateToLocalString(record.date)}</div>
      </div>
    ),
  },
  {
    title: "Заказчик",
    dataIndex: "customer",
    key: "customer",
    width: "30%",
    render: (text: string, record: IDocumentsListColumn) => (
      <div className={!record.viewed && "documents__table__unviewed__row"}>
        <div>{record.customer}</div>
        <div>
          ИНН {record.customerInn}{" "}
          {!!record.customerKpp && ` КПП ${record.customerKpp}`}
        </div>
      </div>
    ),
  },
  {
    title: "Исполнитель",
    dataIndex: "performer",
    key: "performer",
    width: "30%",
    render: (text: string, record: IDocumentsListColumn) => (
      <div className={!record.viewed && "documents__table__unviewed__row"}>
        <div>{record.performer}</div>
        <div>
          ИНН {record.performerInn}{" "}
          {!!record.performerKpp && ` КПП ${record.performerKpp}`}
        </div>
      </div>
    ),
  },
  {
    title: "Сумма",
    dataIndex: "summ",
    key: "summ",
    width: "20%",
    render: (text: string, record: IDocumentsListColumn) => (
      <div className={!record.viewed && "documents__table__unviewed__row"}>
        <div>{record.summ.toFixed(2)} руб.</div>
        {!!record.vat && <div>в том числе НДС</div>}
      </div>
    ),
  },
];
