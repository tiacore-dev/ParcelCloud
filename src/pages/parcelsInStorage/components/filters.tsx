import * as React from "react";
import { Button, Radio, Space } from "antd";
import { PlusCircleTwoTone, ReloadOutlined } from "@ant-design/icons";
import { getParcelsInStorage } from "../../../hooks/ApiActions/parcel";
import { useDispatch, useSelector } from "react-redux";
import { authToken } from "../../../hooks/useAuth";
import { GetParcelsInStorageDto } from "../parcelsInStorage";
import { IState } from "../../../store/modules";
import { setIParcelsInStorageFilterTaskType } from "../../../store/modules/settings/parcelsInStorage";
import { useNavigate } from "react-router-dom";
import { editManifestAction } from "../../../store/modules/editableEntities/editableManifest";
import { IParcelsList } from "../../../interfaces/parcels/IParcelsList";

export const Filters = ({ selectedRows }: { selectedRows: IParcelsList[] }) => {
  const dispatch = useDispatch();
  const token = authToken();
  const param: GetParcelsInStorageDto = {
    authToken: token,
  };

  const navigate = useNavigate();

  const filters = useSelector(
    (state: IState) => state.settings.parcelsInStorageSettings?.filters,
  );

  return (
    <Space className="parcels-asigned_filters">
      <Button
        className="parcels-asigned_filters_button"
        icon={<ReloadOutlined />}
        onClick={() => getParcelsInStorage(dispatch, param)}
      />

      <Radio.Group
        value={filters.parcelInStorageType}
        buttonStyle="solid"
        onChange={(e) => {
          dispatch(setIParcelsInStorageFilterTaskType(e.target.value));
        }}
      >
        <Radio.Button value="toDelivery">Доставки</Radio.Button>
        <Radio.Button value="toReceive">Заборы</Radio.Button>
        <Radio.Button value="myOwn">Мои</Radio.Button>
        <Radio.Button value="all">Всё</Radio.Button>
      </Radio.Group>

      {!!selectedRows.length && (
        <Button
          icon={<PlusCircleTwoTone twoToneColor="#ff1616" />}
          onClick={() => {
            dispatch(
              editManifestAction.setManifestData({
                parcels: selectedRows,
                qtParcels: selectedRows.length,
                qtItems: 1,
                weight: selectedRows.reduce((acc, p) => acc + p.weight, 0),
                volume: selectedRows.reduce((acc, p) => acc + p.volume, 0),
              }),
            );
            navigate("/manifests/create");
          }}
        >
          {`Создать манифест и добавить выделенные накладные (${selectedRows.length})`}
        </Button>
      )}
    </Space>
  );
};
