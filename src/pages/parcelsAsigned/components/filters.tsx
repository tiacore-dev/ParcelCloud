import * as React from "react";
import { Button, Radio, Space } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { getParcelsAsigned } from "../../../hooks/ApiActions/parcel";
import { useDispatch, useSelector } from "react-redux";
import { authToken } from "../../../hooks/useAuth";
import { GetParcelsAsignedDto } from "../parcelsAsigned";
import { setIParcelsAsignedFilterTaskType } from "../../../store/modules/settings/parcelsAsigned";
import { IState } from "../../../store/modules";

export const Filters = () => {
  const dispatch = useDispatch();
  const token = authToken();
  const param: GetParcelsAsignedDto = {
    authToken: token,
  };

  const filters = useSelector(
    (state: IState) => state.settings.parcelsAsignedSettings.filters,
  );

  return (
    <Space className="parcels-asigned_filters">
      <Button
        className="parcels-asigned_filters_button"
        icon={<ReloadOutlined />}
        onClick={() => getParcelsAsigned(dispatch, param)}
      />

      <Radio.Group
        value={filters.taskType}
        buttonStyle="solid"
        onChange={(e) => {
          dispatch(setIParcelsAsignedFilterTaskType(e.target.value));
        }}
      >
        <Radio.Button value="toDelivery">Доставки</Radio.Button>
        <Radio.Button value="toReceive">Заборы</Radio.Button>
        <Radio.Button value="all">Всё</Radio.Button>
      </Radio.Group>
    </Space>
  );
};
