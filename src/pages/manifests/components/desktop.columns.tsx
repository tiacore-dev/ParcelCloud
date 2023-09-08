import * as React from "react";
import { ColumnsType } from "antd/es/table";
import { dateToLocalString } from "../../../utils/dateConverter";
import { IManifestsListColumn } from "../../../interfaces/manifests/IManifestList";
import { CheckCircleTwoTone, ClockCircleTwoTone } from "@ant-design/icons";

export const manifestsDesktopColumns =
  (): ColumnsType<IManifestsListColumn> => {
    return [
      {
        title: "Перевозка",
        key: "transfer",
        width: "30%",
        render: (text: string, record: IManifestsListColumn) => (
          <>
            <div>Перевозчик: {record.transferCompany}</div>
            <div>Накладная: {record.transferNumber}</div>
            <div>
              Манифест: {record.number} от {dateToLocalString(record.date)}
            </div>

            <div>
              {record.delivered ? (
                <CheckCircleTwoTone
                  twoToneColor="#52c41a"
                  className="status-icon"
                />
              ) : (
                <ClockCircleTwoTone
                  twoToneColor="#1677ff"
                  className="status-icon"
                />
              )}
              Статус: {record.delivered ? "Завершено" : "В работе"}
            </div>
          </>
        ),
      },
      {
        title: "Отправитель",
        key: "send",
        width: "25%",
        render: (text: string, record: IManifestsListColumn) => (
          <>
            <div>{record.sendCity}</div>
            <div>{record.sendCompany}</div>
          </>
        ),
      },
      {
        title: "Получатель",
        key: "rec",
        width: "25%",
        render: (text: string, record: IManifestsListColumn) => (
          <>
            <div>{record.recCity}</div>
            <div>{record.recCompany}</div>
          </>
        ),
      },
      {
        title: "Грузы",
        key: "items",
        width: "20%",
        render: (text: string, record: IManifestsListColumn) => (
          <>
            <div>Накладных: {record.qtParcels}</div>
            <div>Мест: {record.qtItems}</div>
            <div>Вес: {record.weight}</div>
            <div>Об. вес: {record.volume}</div>
          </>
        ),
      },
    ];
  };
