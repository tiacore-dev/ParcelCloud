import * as React from "react";
import { ColumnsType } from "antd/es/table";
import { IDocumentParcel } from "../../../interfaces/documents/IDocument";
import { dateToLocalString } from "../../../utils/dateConverter";

export const parcelsDesktopColumns: ColumnsType<IDocumentParcel> = [
  {
    title: "Накладные",
    children: [
      {
        title: "Номер",
        key: "number",
        width: "15%",
        render: (text: string, record: IDocumentParcel) => (
          <>
            <div>{record.number}</div>
            <div>от {dateToLocalString(record.date)}</div>
          </>
        ),
      },
      {
        title: "Отправитель",
        key: "send",
        width: "27%",
        render: (text: string, record: IDocumentParcel) => (
          <>
            <div>{record.recCity}</div>
            <div>{record.recAddress}</div>
            <div>{record.recCompany}</div>
          </>
        ),
      },
      {
        title: "Получатель",
        key: "rec",
        width: "27%",
        render: (text: string, record: IDocumentParcel) => (
          <>
            <div>{record.sendCity}</div>
            <div>{record.sendAddress}</div>
            <div>{record.sendCompany}</div>
          </>
        ),
      },
      {
        title: "Отправление",
        key: "items",
        width: "16%",
        render: (text: string, record: IDocumentParcel) => (
          <>
            <div>Мест: {record.qt}</div>
            <div>Вес: {record.weight}</div>
            <div>Об. вес: {record.volume}</div>
          </>
        ),
      },
      {
        title: "Сумма",
        key: "summ",
        width: "15%",
        render: (text: string, record: IDocumentParcel) => (
          <>
            <div>{record.summ.toFixed(2)}</div>
          </>
        ),
      },
    ],
  },
];
