import * as React from "react";
import { ColumnsType } from "antd/es/table";
import { dateToLocalString } from "../../../utils/dateConverter";
import { IParcelHistory } from "../../../interfaces/parcels/IParcel";

export const historyMobileColumns: ColumnsType<IParcelHistory> = [
  {
    title: "История:",
    key: "mobileData",
    render: (text: string, record: IParcelHistory) => (
      <>
        <div>Дата {dateToLocalString(record.date)}</div>
        <div>Статус: {record.type}</div>
        <div>{record.comment}</div>
      </>
    ),
  },
];
