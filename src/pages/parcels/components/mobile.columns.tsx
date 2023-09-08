import * as React from "react";
import { ColumnsType } from "antd/es/table";
import { dateToLocalString } from "../../../utils/dateConverter";
import { IParcelsListColumn } from "../../../interfaces/parcels/IParcelsList";

export const parcelsMobileColumns = (
  customerView: boolean,
): ColumnsType<IParcelsListColumn> => {
  return [
    {
      title: "Накладные:",
      key: "mobileData",
      render: (text: string, record: IParcelsListColumn) => (
        <>
          {customerView && (
            <div>
              Заказчик: <b>{record.customer}</b>
            </div>
          )}
          <div>
            Накладная № <b>{record.number}</b> от{" "}
            {dateToLocalString(record.date)}
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
            Мест: {record.qt} Вес: {record.weight} кг, Об. вес: {record.volume}{" "}
            кг
          </div>
        </>
      ),
    },
  ];
};
