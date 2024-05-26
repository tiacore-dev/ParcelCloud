import * as React from "react";
import { ColumnsType } from "antd/es/table";
import { dateToLocalString } from "../../../utils/dateConverter";

import {
  CheckCircleTwoTone,
  ClockCircleTwoTone,
  RightCircleTwoTone,
} from "@ant-design/icons";
import { IManifestsListColumn } from "../../../interfaces/manifests/IManifestList";

export const manifestsDesktopColumns =
  (): ColumnsType<IManifestsListColumn> => {
    return [
      {
        title: "Перевозка",
        key: "manifest",
        width: "30%",
        render: (text: string, record: IManifestsListColumn) => (
          <>
            <div>Перевозчик: {record.manifestCompany}</div>
            <div>Накладная: {record.transferNumber}</div>
            <div>
              Манифест: {record.number} от {dateToLocalString(record.date)}
            </div>

            {record.type === "incoming" && (
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
            )}

            {record.type === "outgoing" && (
              <div>
                {record.sent ? (
                  record.delivered ? (
                    <CheckCircleTwoTone
                      twoToneColor="#52c41a"
                      className="status-icon"
                    />
                  ) : (
                    <RightCircleTwoTone
                      twoToneColor="#1677ff"
                      className="status-icon"
                    />
                  )
                ) : (
                  <ClockCircleTwoTone
                    twoToneColor="#c4be1a"
                    className="status-icon"
                  />
                )}
                {`Статус: ${
                  record.sent
                    ? record.delivered
                      ? "Завершено"
                      : "В пути"
                    : "Не отправлено"
                }`}
                {`Расчетная дата: ${dateToLocalString(record.planDate)}`}
              </div>
            )}
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
