import * as React from "react";
import { ColumnsType } from "antd/es/table";
import { dateToLocalString } from "../../../utils/dateConverter";
import { IParcelsAsignedListColumn } from "../../../interfaces/parcels/IParcelsList";
import { checkPermission } from "../../../hooks/useAuth";

export const parcelsAsignedMobileColumns =
  (): ColumnsType<IParcelsAsignedListColumn> => {
    const customerView: boolean =
      checkPermission("parcel-view-all") ||
      checkPermission("parcel-view-assigned");

    return [
      {
        title: "Накладные:",
        key: "mobileData",
        render: (text: string, record: IParcelsAsignedListColumn) => (
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
              Мест: {record.qt} Вес: {record.weight} кг, Об. вес:{" "}
              {record.volume} кг
            </div>
          </>
        ),
      },
    ];
  };
