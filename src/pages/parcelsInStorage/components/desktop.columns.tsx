import * as React from "react";
import { ColumnsType } from "antd/es/table";
import { dateToLocalString } from "../../../utils/dateConverter";
import { IParcelsInStorageListColumn } from "../../../interfaces/parcels/IParcelsList";
import { NavigateFunction } from "react-router-dom";

export const parcelsInStorageDesktopColumns = (
  navigate: NavigateFunction,
): ColumnsType<IParcelsInStorageListColumn> => {
  return [
    {
      title: "Номер",
      key: "number",

      width: "20%",
      render: (text: string, record: IParcelsInStorageListColumn) => (
        <>
          <div>{record.customer}</div>
          <div>
            <a
              className="parcels__table__number"
              onClick={() => navigate(`/parcels/${record.key}`)}
            >
              {record.number}
            </a>{" "}
            от {dateToLocalString(record.date)}
          </div>
        </>
      ),
    },
    {
      title: "Отправитель",
      key: "send",
      width: "27%",
      render: (text: string, record: IParcelsInStorageListColumn) => (
        <>
          <div>{record.sendCity}</div>
          <div>{record.sendAddress}</div>
          <div className="parcels__table__company-name">
            {record.sendCompany}
          </div>
        </>
      ),
    },
    {
      title: "Получатель",
      key: "rec",
      width: "27%",
      render: (text: string, record: IParcelsInStorageListColumn) => (
        <>
          <div>{record.recCity}</div>
          <div>{record.recAddress}</div>
          <div className="parcels__table__company-name">
            {record.recCompany}
          </div>
        </>
      ),
    },
    {
      title: "Грузы",
      key: "items",
      width: "16%",
      render: (text: string, record: IParcelsInStorageListColumn) => (
        <>
          <div>Мест: {record.qt}</div>
          <div>Вес: {record.weight}</div>
          <div>Об. вес: {record.volume}</div>
        </>
      ),
    },
  ];
};
