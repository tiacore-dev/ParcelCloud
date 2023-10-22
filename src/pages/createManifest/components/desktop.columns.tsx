import * as React from "react";
import { ColumnsType } from "antd/es/table";
import { dateToLocalString } from "../../../utils/dateConverter";
import { IParcelsInStorageListColumn } from "../../../interfaces/parcels/IParcelsList";
import { NavigateFunction } from "react-router-dom";
import { Button, Space } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import { editManifestAction } from "../../../store/modules/editableEntities/editableManifest";
import { Dispatch } from "redux";

export const parcelsInEditableManifestDesktopColumns = (
  navigate: NavigateFunction,
  dispatch: Dispatch,
): ColumnsType<IParcelsInStorageListColumn> => {
  const handleDelete = React.useCallback((id: string) => {
    dispatch(editManifestAction.deleteParcel(id));
  }, []);

  return [
    {
      title: "Номер",
      key: "number",

      width: "20%",
      render: (text: string, record: IParcelsInStorageListColumn) => (
        <>
          <div>{record.customer}</div>
          <div>
            <a
              className="parcels__table__number"
              onClick={() => navigate(`/parcels/${record.key}`)}
            >
              {record.number}
            </a>{" "}
            от {dateToLocalString(record.date)}
          </div>
        </>
      ),
    },
    {
      title: "Отправитель",
      key: "send",
      width: "30%",
      render: (text: string, record: IParcelsInStorageListColumn) => (
        <>
          <div>{record.sendCity}</div>
          <div>{record.sendAddress}</div>
          <div className="parcels__table__company-name">
            {record.sendCompany}
          </div>
        </>
      ),
    },
    {
      title: "Получатель",
      key: "rec",
      width: "30%",
      render: (text: string, record: IParcelsInStorageListColumn) => (
        <>
          <div>{record.recCity}</div>
          <div>{record.recAddress}</div>
          <div className="parcels__table__company-name">
            {record.recCompany}
          </div>
        </>
      ),
    },
    {
      title: "Грузы",
      key: "items",
      width: "20%",
      render: (text: string, record: IParcelsInStorageListColumn) => (
        <>
          <div>Мест: {record.qt}</div>
          <div>Вес: {record.weight}</div>
          <div>Об. вес: {record.volume}</div>
        </>
      ),
    },
    {
      dataIndex: "operation",
      render: (text: string, record: IParcelsInStorageListColumn) => (
        <Space>
          <Button
            icon={<DeleteTwoTone twoToneColor="#ff1616" />}
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];
};
