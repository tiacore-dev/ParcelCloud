import * as React from "react";
import { ColumnsType } from "antd/es/table";
import { dateToLocalString } from "../../../utils/dateConverter";
import { IParcelsAsignedListColumn } from "../../../interfaces/parcels/IParcelsList";
import { NavigateFunction } from "react-router-dom";

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

        return (
          <div className="parcels-asigned__table__row-mobile">
            <div className="parcels-asigned__table__row-data">
              №{" "}
              <a
                className="parcels-asigned__table__number"
                onClick={() => navigate && navigate(`/parcels/${record.key}`)}
              >
                {record.number}
              </a>{" "}
              от {dateToLocalString(record.date)}
            </div>
            {receiveParcelDialog}
          </div>
        );
      },
    },
  ];
};
