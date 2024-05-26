import * as React from "react";
import { ColumnsType } from "antd/es/table";
import { dateToLocalString } from "../../../utils/dateConverter";
import { IManifestsListColumn } from "../../../interfaces/manifests/IManifestList";

export const manifestsMobileColumns = (): ColumnsType<IManifestsListColumn> => {
  return [
    {
      title: "Накладные:",
      key: "mobileData",
      render: (text: string, record: IManifestsListColumn) => (
        <>
          <div>
            Перевозчик: <b>{record.manifestCompany}</b>
          </div>
          <div>Накладная: {record.transferNumber}</div>

          <div>
            Манифест: {record.number} от {dateToLocalString(record.date)}
          </div>
          <div>Расчетная дата: {dateToLocalString(record.planDate)}</div>
          <div>
            Отправитель: {record.sendCity}, {record.sendCompany}
          </div>
          <div>
            Получатель: {record.recCity}, {record.recCompany}
          </div>
          <div>
            Накладных: {record.qtParcels} Мест: {record.qtItems}
          </div>
          <div>
            Вес: {record.weight} Об. вес: {record.volume}
          </div>
        </>
      ),
    },
  ];
};
