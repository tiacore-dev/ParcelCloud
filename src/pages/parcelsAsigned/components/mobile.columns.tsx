import * as React from "react";
import { ColumnsType } from "antd/es/table";
import { dateToLocalString } from "../../../utils/dateConverter";
import { IParcelsAsignedListColumn } from "../../../interfaces/parcels/IParcelsList";

export const parcelsAsignedMobileColumns =
  (): ColumnsType<IParcelsAsignedListColumn> => {
    return [
      {
        key: "mobileData",
        render: (text: string, record: IParcelsAsignedListColumn) => (
          <>
            <div>
              Накладная № <b>{record.number}</b> от{" "}
              {dateToLocalString(record.date)}
            </div>
            {record.toDelivery && (
              <div>
                <div>Отправитель: </div>
                <div>{record.sendCity}</div>
                <div style={{ fontWeight: 600 }}>{record.sendAddress}</div>
                <div style={{ fontWeight: 600 }}>{record.sendCompany}</div>
              </div>
            )}
            {(record.toReceive || record.received) && (
              <div>
                <div>Получатель:</div>
                <div>{record.recCity}</div>
                <div style={{ fontWeight: 600 }}>{record.recAddress}</div>
                <div style={{ fontWeight: 600 }}>{record.recCompany}</div>
              </div>
            )}

            <div>
              Мест: {record.qt} Вес: {record.weight} кг, Об. вес:{" "}
              {record.volume} кг
            </div>
          </>
        ),
      },
    ];
  };
