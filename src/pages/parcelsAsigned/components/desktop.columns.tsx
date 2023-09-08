import * as React from "react";
import { ColumnsType } from "antd/es/table";
import { dateToLocalString } from "../../../utils/dateConverter";
import { IParcelsAsignedListColumn } from "../../../interfaces/parcels/IParcelsList";

export const parcelsAsignedDesktopColumns =
  (): ColumnsType<IParcelsAsignedListColumn> => {
    return [
      {
        title: "Задача",
        key: "task",
        width: "30%",
        render: (text: string, record: IParcelsAsignedListColumn) => (
          <>
            <div>
              {record.taskType === "deliver"
                ? "Доставить получателю"
                : "Забрать у отправителя"}{" "}
            </div>
            <div>
              Дата:{" "}
              {record.taskType === "deliver"
                ? dateToLocalString(record.delDate)
                : dateToLocalString(record.date)}
            </div>
            <div>
              Время:{" "}
              {record.taskType === "deliver" ? record.recTime : record.sendTime}
            </div>
          </>
        ),
      },
      {
        title: "Адрес:",
        key: "send",
        width: "40%",
        render: (text: string, record: IParcelsAsignedListColumn) => (
          <>
            <div>
              {record.taskType === "deliver" ? record.recCity : record.sendCity}
            </div>
            <div>
              {record.taskType === "deliver"
                ? record.recAddress
                : record.sendAddress}
            </div>
            <div>
              {record.taskType === "deliver"
                ? record.recCompany
                : record.sendCompany}
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
