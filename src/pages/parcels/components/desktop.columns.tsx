import * as React from "react";
import { ColumnsType } from "antd/es/table";
import { dateToLocalString } from "../../../utils/dateConverter";
import { IParcelsListColumn } from "../../../interfaces/parcels/IParcelsList";
import { ParcelStatus } from "../../../interfaces/parcels/IParcel";
import {
  CheckCircleTwoTone,
  ClockCircleTwoTone,
  DownCircleTwoTone,
  RightCircleTwoTone,
} from "@ant-design/icons";
import { NavigateFunction } from "react-router-dom";

export const parcelsDesktopColumns = (
  customerView: boolean,
  navigate?: NavigateFunction,
): ColumnsType<IParcelsListColumn> => {
  const statusLabel = (status?: ParcelStatus) => {
    if (status === "availableToReceive" || status === "expected")
      return (
        <div>
          <RightCircleTwoTone twoToneColor={"#c4be1a"} /> Доступно для получения
        </div>
      );
    if (status === "general")
      return (
        <div>
          <DownCircleTwoTone twoToneColor={"#1677ff"} /> Получено
        </div>
      );
    if (status === "delivered")
      return (
        <div>
          <CheckCircleTwoTone twoToneColor={"#52c41a"} /> Доставлено получателю
        </div>
      );
    if (status === "in-progress") {
      return (
        <div>
          <ClockCircleTwoTone twoToneColor={"#1677ff"} /> В работе
        </div>
      );
    }
    return null;
  };
  return [
    {
      title: "Номер",
      key: "number",

      // width: customerView ? "20%" : "15%",
      render: (text: string, record: IParcelsListColumn) => (
        <>
          <div>{statusLabel(record.status)}</div>
          {customerView && <div>{record.customer}</div>}
          <div>
            <a onClick={() => navigate && navigate(`/parcels/${record.key}`)}>
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
      // width: "27%",
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
      // width: "27%",
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
      // width: "16%",
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
