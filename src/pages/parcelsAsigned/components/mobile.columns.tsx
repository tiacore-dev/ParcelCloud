import * as React from "react";
import { ColumnsType } from "antd/es/table";
import { dateToLocalString } from "../../../utils/dateConverter";
import { IParcelsAsignedListColumn } from "../../../interfaces/parcels/IParcelsList";
import { NavigateFunction } from "react-router-dom";
import { DollarOutlined } from "@ant-design/icons";

export const parcelsAsignedMobileColumns = (
  getReceiveParcelDialog: (
    id: string,
    number: string,
    customer: string,
    sendAddress: string,
    toReceive: boolean,
  ) => React.ReactNode,
  navigate?: NavigateFunction,
): ColumnsType<IParcelsAsignedListColumn> => {
  return [
    {
      key: "mobileData",
      render: (text: string, record: IParcelsAsignedListColumn) => {
        const receiveParcelDialog = getReceiveParcelDialog(
          record.id,
          record.number,
          record.customer,
          record.sendAddress,
          record.toReceive,
        );

        const hasPay =
          (record.price > 0 &&
            record.toReceive &&
            record.payType === "Оплата наличными при отправлении") ||
          (record.price > 0 &&
            record.toDelivery &&
            record.payType === "Оплата наличными при получении");

        return (
          <div className="parcels-asigned__table__row-mobile">
            <div className="parcels-asigned__table__row-data">
              <div>
                №{" "}
                <a
                  className="parcels-asigned__table__number"
                  onClick={() => navigate && navigate(`/parcels/${record.key}`)}
                >
                  {record.number}
                </a>{" "}
                от {dateToLocalString(record.date)}
              </div>
              {hasPay && (
                <div>
                  <DollarOutlined className="parcels-asigned__table__pay_icon" />
                  {`${record.price} руб.`}
                </div>
              )}
            </div>

            {receiveParcelDialog}
          </div>
        );
      },
    },
  ];
};
