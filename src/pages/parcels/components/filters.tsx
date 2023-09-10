import { Button, DatePicker, Select, Space } from "antd";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../store/modules";
import {
  setParcelsFiltersDateFrom,
  setParcelsFiltersDateTo,
  setParcelsFiltersNumber,
  setParcelsFiltersRecCities,
  setParcelsFiltersSendCities,
} from "../../../store/modules/settings/parcels";
import dayjs from "dayjs";
import { dateFormat } from "../../../utils/dateConverter";
import Search from "antd/es/input/Search";
import { isMobile } from "../../../utils/isMobile";
import { getCities } from "../../../store/modules/dictionaries/selectors/cities.selector";
import {
  AppstoreTwoTone,
  PlusCircleTwoTone,
  ReloadOutlined,
} from "@ant-design/icons";
import { authToken } from "../../../hooks/useAuth";
import { GetParcelsDto } from "../../../hooks/ApiActions/parcel";
import { useNavigate } from "react-router-dom";

interface IFiltersProps {
  onChange: (param: GetParcelsDto) => void;
}

export const Filters = (props: IFiltersProps) => {
  const { onChange } = props;
  const navigate = useNavigate();
  const filters = useSelector(
    (state: IState) => state.settings.parcelsSettings.filters,
  );

  const token = authToken();
  const param: GetParcelsDto = {
    authToken: token,
    filters,
  };

  const dispatch = useDispatch();

  const cities = useSelector(getCities);
  const dateFromChangeHandler = async (date: dayjs.Dayjs) => {
    const value = date.valueOf();
    await dispatch(setParcelsFiltersDateFrom(value));
    // onChange({ ...param, filters: { ...param.filters, dateFrom: value } });
  };
  const dateToChangeHandler = async (date: dayjs.Dayjs) => {
    const value = date.valueOf();
    await dispatch(setParcelsFiltersDateTo(value));
    // onChange({ ...param, filters: { ...param.filters, dateTo: value } });
  };

  const numberChangeHandler = async (number: string) => {
    await dispatch(setParcelsFiltersNumber(number));
    // onChange({ ...param, filters: { ...param.filters, number: number } });
  };

  const sendCityChangeHandler = async (cities: string[]) => {
    await dispatch(setParcelsFiltersSendCities(cities));
    // onChange({ ...param, filters: { ...param.filters, sendCities: cities } });
  };

  const recCityChangeHandler = async (cities: string[]) => {
    await dispatch(setParcelsFiltersRecCities(cities));
    // onChange({ ...param, filters: { ...param.filters, recCities: cities } });
  };

  const citySelectOptions = cities.map((city) => ({
    label: city,
    value: city,
  }));

  return (
    <div
      // direction={isMobile() ? "vertical" : "horizontal"}
      className="parcels_filters"
    >
      <Space direction="horizontal">
        <Button
          icon={<PlusCircleTwoTone />}
          onClick={() => navigate("/parcels/create")}
          type="primary"
        >
          Создать
        </Button>
        <Button icon={<ReloadOutlined />} onClick={() => onChange(param)} />
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
      <Space direction={isMobile() ? "vertical" : "horizontal"}>
        <Search
          placeholder="Поиск по номеру"
          onSearch={numberChangeHandler}
          style={{ maxWidth: "200px" }}
        />
        <Select
          mode="multiple"
          value={filters.sendCities}
          allowClear
          className="parcels_filters_select"
          placeholder="Город отправителя"
          onChange={sendCityChangeHandler}
          options={citySelectOptions}
        />
        <Select
          mode="multiple"
          value={filters.recCities}
          allowClear
          className="parcels_filters_select"
          placeholder="Город получателя"
          onChange={recCityChangeHandler}
          options={citySelectOptions}
        />
      </Space>
      <Button
        className="parcels_filters_right-button"
        icon={<AppstoreTwoTone />}
        onClick={() => navigate("/templates")}
      >
        Шаблоны
      </Button>
    </div>
  );
};
