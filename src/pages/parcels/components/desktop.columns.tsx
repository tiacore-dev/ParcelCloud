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

    if (status === "availableToSend") {
      return (
        <div>
          <RightCircleTwoTone twoToneColor={"#c4be1a"} /> Доступно к отправке
        </div>
      );
    }

    if (status === "sent") {
      return (
        <div>
          <DownCircleTwoTone twoToneColor={"#1677ff"} /> Отправлено
        </div>
      );
    }

    return null;
  };
  return [
    {
      title: "Номер",
      key: "number",

      width: customerView ? "20%" : "15%",
      render: (text: string, record: IParcelsListColumn) => (
        <>
          <div>{statusLabel(record.status)}</div>
          {customerView && <div>{record.customer}</div>}
          <div>
            <a
              className="parcels__table__number"
              onClick={() => navigate && navigate(`/parcels/${record.key}`)}
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
      render: (text: string, record: IParcelsListColumn) => (
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
      render: (text: string, record: IParcelsListColumn) => (
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
      width: "12%",
      render: (text: string, record: IParcelsListColumn) => (
        <>
          <div>Мест: {record.qt}</div>
          <div>Вес: {record.weight}</div>
          <div>Об. вес: {record.volume}</div>
        </>
      ),
    },
    {
      title: "Статус",
      key: "status",
      width: "17%",
      render: (text: string, record: IParcelsListColumn) => (
        <>
          <div>{record.statusType}</div>
          <div>{record.statusValue}</div>
          <div>{dateToLocalString(record.statusDate)}</div>
        </>
      ),
    },
    {
      title: "Расчётная дата доставки",
      key: "status",
      width: "17%",
      render: (text: string, record: IParcelsListColumn) => (
        <>
          {record.status !== "delivered" && record.planDate && (
            <div>{dateToLocalString(record.planDate)}</div>
          )}
        </>
      ),
    },
  ];
};
