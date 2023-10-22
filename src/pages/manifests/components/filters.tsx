import { Button, DatePicker, Radio, Space } from "antd";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../store/modules";
import {
  setManifestsFiltersDateFrom,
  setManifestsFiltersDateTo,
  setManifestsFiltersNumber,
  setManifestsFiltersType,
} from "../../../store/modules/settings/manifests";
import dayjs from "dayjs";
import { dateFormat } from "../../../utils/dateConverter";
import Search from "antd/es/input/Search";
import { isMobile } from "../../../utils/isMobile";
import { PlusCircleTwoTone, ReloadOutlined } from "@ant-design/icons";
import { authToken } from "../../../hooks/useAuth";
import { GetManifestsDto } from "../../../hooks/ApiActions/manifest";
import { clearCreateManifestState } from "../../../store/modules/editableEntities/editableManifest";
import { useNavigate } from "react-router-dom";

interface IFiltersProps {
  onChange: (param: GetManifestsDto) => void;
}

export const Filters = (props: IFiltersProps) => {
  const { onChange } = props;
  const navigate = useNavigate();

  const filters = useSelector(
    (state: IState) => state.settings.manifestsSettings.filters,
  );

  const token = authToken();
  const param: GetManifestsDto = {
    authToken: token,
    filters,
  };

  const dispatch = useDispatch();

  const dateFromChangeHandler = async (date: dayjs.Dayjs) => {
    const value = date.valueOf();
    await dispatch(setManifestsFiltersDateFrom(value));
  };
  const dateToChangeHandler = async (date: dayjs.Dayjs) => {
    const value = date.valueOf();
    await dispatch(setManifestsFiltersDateTo(value));
  };

  const numberChangeHandler = async (number: string) => {
    await dispatch(setManifestsFiltersNumber(number));
  };

  return (
    <Space
      direction={isMobile() ? "vertical" : "horizontal"}
      className="manifests_filters"
    >
      <Space direction="horizontal">
        <Button
          icon={<PlusCircleTwoTone twoToneColor="#ff1616" />}
          onClick={() => {
            dispatch(clearCreateManifestState());
            navigate("/manifests/create");
          }}
          type="primary"
        >
          Создать
        </Button>
        <Button icon={<ReloadOutlined />} onClick={() => onChange(param)} />
        <Radio.Group
          value={filters.manifestType}
          buttonStyle="solid"
          onChange={(e) => {
            dispatch(setManifestsFiltersType(e.target.value));
          }}
        >
          <Radio.Button value="incoming">Входящие</Radio.Button>
          <Radio.Button value="outgoing">Исходящие</Radio.Button>
          <Radio.Button value="all">Все</Radio.Button>
        </Radio.Group>
        <DatePicker
          value={dayjs(filters.dateFrom)}
          placeholder="Дата начала"
          onChange={dateFromChangeHandler}
          format={dateFormat}
        />
        <DatePicker
          value={dayjs(filters.dateTo)}
          placeholder="Дата окончания"
          onChange={dateToChangeHandler}
          format={dateFormat}
        />
      </Space>

      <Search placeholder="Поиск по номеру" onSearch={numberChangeHandler} />
    </Space>
  );
};
