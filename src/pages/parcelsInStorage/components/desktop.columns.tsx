import * as React from "react";
import { ColumnsType } from "antd/es/table";
import { dateToLocalString } from "../../../utils/dateConverter";
import { IParcelsInStorageListColumn } from "../../../interfaces/parcels/IParcelsList";
import { NavigateFunction } from "react-router-dom";
import { checkPermission } from "../../../hooks/useAuth";

export const parcelsInStorageDesktopColumns = (
  navigate: NavigateFunction,
): ColumnsType<IParcelsInStorageListColumn> => {
  const columns: ColumnsType<IParcelsInStorageListColumn> = [];

  const aptdPartner = checkPermission("parcel-view-aptd-partner");
  const aptdTransfer = checkPermission("parcel-view-aptd-transfer");
  const internalInformation = checkPermission(
    "parcel-view-internalInformation",
  );

  columns.push({
    title: "Номер",
    key: "number",

    width: "16%",
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
  });

  columns.push({
    title: "Отправитель",
    key: "send",
    width: aptdPartner || aptdTransfer ? "23%" : "34%",
    render: (text: string, record: IParcelsInStorageListColumn) => (
      <>
        <div>{record.sendCity}</div>
        <div>{record.sendAddress}</div>
        <div className="parcels__table__company-name">{record.sendCompany}</div>
      </>
    ),
  });

  columns.push({
    title: "Получатель",
    key: "rec",
    width: aptdPartner || aptdTransfer ? "23%" : "34%",
    render: (text: string, record: IParcelsInStorageListColumn) => (
      <>
        <div>{record.recCity}</div>
        <div>{record.recAddress}</div>
        <div className="parcels__table__company-name">{record.recCompany}</div>
      </>
    ),
  });

  if (aptdPartner || aptdTransfer || internalInformation) {
    columns.push({
      title: "Перевозка",
      key: "rec",
      width: "22%",
      render: (text: string, record: IParcelsInStorageListColumn) => (
        <>
          <div>Партнер: {record.aptdPartner}</div>
          <div>Перевозчик: {record.aptdTransfer}</div>
          <div>Примечание: {record.internalInformation}</div>
        </>
      ),
    });
  }

  columns.push({
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
  });

  return columns;
};
