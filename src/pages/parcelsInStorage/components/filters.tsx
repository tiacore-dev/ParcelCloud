import * as React from "react";
import { Button, Input, Radio, Space } from "antd";
import { PlusCircleTwoTone, ReloadOutlined } from "@ant-design/icons";
import { getParcelsInStorage } from "../../../hooks/ApiActions/parcel";
import { useDispatch, useSelector } from "react-redux";
import { authToken } from "../../../hooks/useAuth";
import { GetParcelsInStorageDto } from "../parcelsInStorage";
import { IState } from "../../../store/modules";
import {
  setIParcelsInStorageFilterNumber,
  setIParcelsInStorageFilterTaskType,
} from "../../../store/modules/settings/parcelsInStorage";
import { useNavigate } from "react-router-dom";
import { editManifestAction } from "../../../store/modules/editableEntities/editableManifest";
import { IParcelsList } from "../../../interfaces/parcels/IParcelsList";
import { isMobile } from "../../../utils/isMobile";

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

  const numberChangeHandler = React.useCallback(async (number: string) => {
    await dispatch(setIParcelsInStorageFilterNumber(number));
  }, []);

  const reloadButton = (
    <Button
      className="parcels-asigned_filters_button"
      icon={<ReloadOutlined />}
      onClick={() => getParcelsInStorage(dispatch, param)}
    />
  );

  const search = (
    <Input
      className="parcels_filters_search"
      placeholder="Фильтр по номеру"
      value={filters.number}
      onChange={(e) => {
        numberChangeHandler(e.target.value);
      }}
      style={{ maxWidth: "200px" }}
    />
  );

  const filterRadioSelect = (
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
  );

  const createButton = (
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
      {`Создать манифест и добавить накладные (${selectedRows.length})`}
    </Button>
  );

  return isMobile() ? (
    <Space direction="vertical" style={{ padding: "12px 16px" }}>
      {!!selectedRows.length && createButton}
      <Space direction="horizontal">
        {reloadButton}
        {search}
      </Space>
      {filterRadioSelect}
    </Space>
  ) : (
    <Space className="parcels-asigned_filters">
      {reloadButton}
      {search}
      {filterRadioSelect}
      {!!selectedRows.length && createButton}
    </Space>
  );
};
