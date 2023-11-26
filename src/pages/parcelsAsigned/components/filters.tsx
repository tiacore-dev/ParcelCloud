import * as React from "react";
import { Button, Input, Radio, Space } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { getParcelsAsigned } from "../../../hooks/ApiActions/parcel";
import { useDispatch, useSelector } from "react-redux";
import { authToken } from "../../../hooks/useAuth";
import { GetParcelsAsignedDto } from "../parcelsAsigned";
import {
  setIParcelsAsignedFilterNumber,
  setIParcelsAsignedFilterTaskType,
} from "../../../store/modules/settings/parcelsAsigned";
import { IState } from "../../../store/modules";
import { isMobile } from "../../../utils/isMobile";

export const Filters = () => {
  const dispatch = useDispatch();
  const token = authToken();
  const param: GetParcelsAsignedDto = {
    authToken: token,
  };

  const filters = useSelector(
    (state: IState) => state.settings.parcelsAsignedSettings.filters,
  );

  const numberChangeHandler = React.useCallback(async (number: string) => {
    await dispatch(setIParcelsAsignedFilterNumber(number));
  }, []);

  return (
    <Space
      className="parcels-asigned_filters"
      style={isMobile() && { padding: "12px 16px" }}
      direction={isMobile() ? "vertical" : "horizontal"}
    >
      <Space>
        <Button
          className="parcels-asigned_filters_button"
          icon={<ReloadOutlined />}
          onClick={() => getParcelsAsigned(dispatch, param)}
        />

        <Input
          className="parcels_filters_search"
          placeholder="Фильтр по номеру"
          value={filters.number}
          onChange={(e) => {
            numberChangeHandler(e.target.value);
          }}
          style={{ maxWidth: "200px" }}
        />
      </Space>

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
