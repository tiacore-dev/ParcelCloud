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

export const parcelsMobileColumns = (
  customerView: boolean,
  navigate?: NavigateFunction,
): ColumnsType<IParcelsListColumn> => {
  return [
    {
      title: "Накладные:",
      key: "mobileData",
      render: (text: string, record: IParcelsListColumn) => {
        const statusLabel = (status?: ParcelStatus) => {
          if (status === "availableToReceive" || status === "expected")
            return (
              <div>
                <RightCircleTwoTone twoToneColor={"#c4be1a"} /> Доступно для
                получения
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
                <CheckCircleTwoTone twoToneColor={"#52c41a"} /> Доставлено
                получателю
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
                <RightCircleTwoTone twoToneColor={"#c4be1a"} /> Доступно к
                отправке
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

        return (
          <>
            <div>{statusLabel(record.status)}</div>
            {customerView && (
              <div>
                Заказчик: <b>{record.customer}</b>
              </div>
            )}
            <div>
              Накладная №{" "}
              <a
                className="parcels__table__number"
                onClick={() => navigate && navigate(`/parcels/${record.key}`)}
              >
                {record.number}
              </a>
              {" от "}
              {dateToLocalString(record.date)}
              {record.orderNumber && (
                <div>{`Номер заказа: ${record.orderNumber}`}</div>
              )}
            </div>
            <div>
              Отправитель: {record.sendCity}, {record.sendAddress},{" "}
              {record.sendCompany}
            </div>
            <div>
              Получатель: {record.recCity}, {record.recAddress},{" "}
              {record.recCompany}
            </div>
            <div>
              Мест: {record.qt} Вес: {record.weight} кг, Об. вес:{" "}
              {record.volume} кг
            </div>
          </>
        );
      },
    },
  ];
};
