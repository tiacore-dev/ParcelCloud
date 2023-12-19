import * as React from "react";
import { ColumnsType } from "antd/es/table";
import { dateToLocalString } from "../../../utils/dateConverter";
import { IParcelsAsignedListColumn } from "../../../interfaces/parcels/IParcelsList";
import { checkPermission } from "../../../hooks/useAuth";
import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";

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
            <div>
              {record.toDelivery ? (
                <LogoutOutlined className="parcels-asigned__table__delivery_icon" />
              ) : (
                <LoginOutlined className="parcels-asigned__table__receive_icon" />
              )}
              {record.toDelivery
                ? "Доставить получателю"
                : "Получить у отправителя"}
            </div>
            {customerView && (
              <div>
                Заказчик: <b>{record.customer}</b>
              </div>
            )}
            <div>
              Накладная № <b>{record.number}</b> от{" "}
              {dateToLocalString(record.date)}
            </div>
            {record.toDelivery && (
              <div>
                <div>Получатель:</div>
                <div>{record.recCity}</div>
                <div style={{ fontWeight: 600 }}>{record.recAddress}</div>
                <div style={{ fontWeight: 600 }}>{record.recCompany}</div>
              </div>
            )}

            {record.toReceive && (
              <div>
                <div>Отправитель: </div>
                <div>{record.sendCity}</div>
                <div style={{ fontWeight: 600 }}>{record.sendAddress}</div>
                <div style={{ fontWeight: 600 }}>{record.sendCompany}</div>
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
