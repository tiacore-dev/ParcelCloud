import * as React from "react";
import { ColumnsType } from "antd/es/table";
import { dateToLocalString } from "../../../utils/dateConverter";
import { IParcelsListColumn } from "../../../interfaces/parcels/IParcelsList";

export const parcelsDesktopColumns = (
  customerView: boolean,
): ColumnsType<IParcelsListColumn> => {
  return [
    {
      title: "Номер",
      key: "number",
      width: customerView ? "20%" : "15%",
      render: (text: string, record: IParcelsListColumn) => (
        <>
          {customerView && <div>{record.customer}</div>}
          <div>{record.number}</div>
          <div>от {dateToLocalString(record.date)}</div>
        </>
      ),
    },
    {
      title: "Отправитель",
      key: "send",
      width: "27%",
      render: (text: string, record: IParcelsListColumn) => (
        <>
          <div>{record.sendCity}</div>
          <div>{record.sendAddress}</div>
          <div>{record.sendCompany}</div>
        </>
      ),
    },
    {
      title: "Получатель",
      key: "rec",
      width: "27%",
      render: (text: string, record: IParcelsListColumn) => (
        <>
          <div>{record.recCity}</div>
          <div>{record.recAddress}</div>
          <div>{record.recCompany}</div>
        </>
      ),
    },
    {
      title: "Грузы",
      key: "items",
      width: "16%",
      render: (text: string, record: IParcelsListColumn) => (
        <>
          <div>Мест: {record.qt}</div>
          <div>Вес: {record.weight}</div>
          <div>Об. вес: {record.volume}</div>
        </>
      ),
    },
  ];
};
