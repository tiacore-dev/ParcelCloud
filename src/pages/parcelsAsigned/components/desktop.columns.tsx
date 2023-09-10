import * as React from "react";
import { ColumnsType } from "antd/es/table";
import { dateToLocalString } from "../../../utils/dateConverter";
import { IParcelsAsignedListColumn } from "../../../interfaces/parcels/IParcelsList";
import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";

export const parcelsAsignedDesktopColumns =
  (): ColumnsType<IParcelsAsignedListColumn> => {
    return [
      {
        title: "Задача",
        key: "task",
        width: "30%",
        render: (text: string, record: IParcelsAsignedListColumn) => (
          <div>
            <div>
              {record.toDelivery ? (
                <LogoutOutlined className="parcelsAsigned__table__delivery_icon" />
              ) : (
                <LoginOutlined className="parcelsAsigned__table__receive_icon" />
              )}
              {record.toDelivery
                ? "Доставить получателю"
                : "Забрать у отправителя"}{" "}
            </div>
            <div>
              Дата:{" "}
              {record.toDelivery
                ? dateToLocalString(record.delDate)
                : dateToLocalString(record.date)}
            </div>
            <div>
              Время: {record.toDelivery ? record.recTime : record.sendTime}
            </div>
          </div>
        ),
      },
      {
        title: "Адрес:",
        key: "send",
        width: "40%",
        render: (text: string, record: IParcelsAsignedListColumn) => (
          <>
            <div>{record.toDelivery ? record.recCity : record.sendCity}</div>
            <div>
              {record.toDelivery ? record.recAddress : record.sendAddress}
            </div>
            <div>
              {record.toDelivery ? record.recCompany : record.sendCompany}
            </div>
          </>
        ),
      },
      {
        title: "Накладная",
        key: "rec",
        width: "37%",
        render: (text: string, record: IParcelsAsignedListColumn) => (
          <>
            <div>{record.customer}</div>
            <div>
              {record.number} от {dateToLocalString(record.date)}
            </div>
            <div>
              Мест: {record.qt}, Вес: {record.weight}
            </div>
          </>
        ),
      },
    ];
  };
