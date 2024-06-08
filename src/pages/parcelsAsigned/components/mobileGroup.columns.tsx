import * as React from "react";
import { ColumnsType } from "antd/es/table";
import { IParcelsAsignedGroupColumn } from "../../../interfaces/parcels/IParcelsList";
import { checkPermission } from "../../../hooks/useAuth";
import {
  CheckCircleOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

export const parcelsAsignedMobileGroupColumns =
  (): ColumnsType<IParcelsAsignedGroupColumn> => {
    const customerView: boolean =
      checkPermission("parcel-view-all") ||
      checkPermission("parcel-view-assigned");

    return [
      {
        key: "mobileData",
        render: (text: string, record: IParcelsAsignedGroupColumn) => (
          <>
            {record.toDelivery && (
              <div>
                <LogoutOutlined className="parcels-asigned__table__delivery_icon" />
                Доставить получателю
              </div>
            )}

            {record.toReceive && (
              <div>
                <LoginOutlined className="parcels-asigned__table__receive_icon" />
                Получить у отправителя
              </div>
            )}

            {record.received && (
              <div>
                <CheckCircleOutlined className="parcels-asigned__table__received_icon" />
                Получено
              </div>
            )}

            {customerView && (
              <div>
                <b>{record.customer}</b>
              </div>
            )}
            {(record.toReceive || record.received) && (
              <div>
                <div style={{ fontWeight: 600 }}>{record.sendAddress}</div>
                <div style={{ fontWeight: 600 }}>{record.sendCompany}</div>
              </div>
            )}
            {record.toDelivery && (
              <div>
                <div>{record.recCity}</div>
                <div style={{ fontWeight: 600 }}>{record.recAddress}</div>
                <div style={{ fontWeight: 600 }}>{record.recCompany}</div>
              </div>
            )}
          </>
        ),
      },
    ];
  };
