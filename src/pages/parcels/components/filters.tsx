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
  setParcelsFiltersStatuses,
} from "../../../store/modules/settings/parcels";
import dayjs from "dayjs";
import { dateFormat, dateTimeFormat } from "../../../utils/dateConverter";
import Search from "antd/es/input/Search";
import { isMobile } from "../../../utils/isMobile";
import { getCities } from "../../../store/modules/dictionaries/selectors/cities.selector";
import { PlusCircleTwoTone, ReloadOutlined } from "@ant-design/icons";
import { authToken } from "../../../hooks/useAuth";
import { GetParcelsDto } from "../../../hooks/ApiActions/parcel";
import { useNavigate } from "react-router-dom";
import { clearCreateParcelState } from "../../../store/modules/editableEntities/editableParcel";
import { IParcelsList } from "../../../interfaces/parcels/IParcelsList";
import { exportHeaderParcels } from "./header.export";
import { DownloadButton } from "../../../components/downloadButton";

interface IFiltersProps {
  parcelsData: IParcelsList[];
  statuses?: Array<{ text: string; value: string }>;
  onChange: (param: GetParcelsDto) => void;
}

export const Filters = (props: IFiltersProps) => {
  const { parcelsData, statuses, onChange } = props;
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
  const dateFromChangeHandler = React.useCallback(async (date: dayjs.Dayjs) => {
    const value = date.valueOf();
    await dispatch(setParcelsFiltersDateFrom(value));
  }, []);
  const dateToChangeHandler = React.useCallback(async (date: dayjs.Dayjs) => {
    const value = date.valueOf();
    await dispatch(setParcelsFiltersDateTo(value));
  }, []);

  const numberChangeHandler = React.useCallback(async (number: string) => {
    await dispatch(setParcelsFiltersNumber(number));
  }, []);

  const sendCityChangeHandler = React.useCallback(async (cities: string[]) => {
    await dispatch(setParcelsFiltersSendCities(cities));
  }, []);

  const recCityChangeHandler = React.useCallback(async (cities: string[]) => {
    await dispatch(setParcelsFiltersRecCities(cities));
  }, []);

  const statusesChangeHandler = React.useCallback(async (cities: string[]) => {
    await dispatch(setParcelsFiltersStatuses(cities));
  }, []);

  const citySelectOptions = React.useMemo(
    () =>
      cities.map((city) => ({
        label: city,
        value: city,
      })),
    [cities],
  );

  const downloadingData = React.useMemo(
    () =>
      parcelsData.map((el) => ({
        ...el,
        weight: el.weight.toLocaleString("ru"),
        volume: el.volume.toLocaleString("ru"),
        date: dayjs(el.date).format(dateFormat),
        statusDate:
          el.statusDate === "0001-01-01T00:00:00"
            ? ""
            : dayjs(el.statusDate).format(dateTimeFormat),
      })),
    [parcelsData],
  );

  const createButton = (
    <Button
      icon={<PlusCircleTwoTone twoToneColor="#ff1616" />}
      onClick={() => {
        dispatch(clearCreateParcelState());
        navigate("/parcels/create");
      }}
      type="primary"
    >
      Создать
    </Button>
  );

  const reloadButton = (
    <Button icon={<ReloadOutlined />} onClick={() => onChange(param)} />
  );

  const datePickerFrom = (
    <DatePicker
      className="parcels_filters_date-picker"
      value={dayjs(filters.dateFrom)}
      placeholder="Дата начала"
      onChange={dateFromChangeHandler}
      format={dateFormat}
      onFocus={(e) => e.target.blur()}
    />
  );

  const datePickerTo = (
    <DatePicker
      className="parcels_filters_date-picker"
      value={dayjs(filters.dateTo)}
      placeholder="Дата окончания"
      onChange={dateToChangeHandler}
      format={dateFormat}
      onFocus={(e) => e.target.blur()}
    />
  );

  const numberFilter = (
    <Search
      className="parcels_filters_search"
      placeholder="Поиск по номеру"
      defaultValue={filters.number}
      onSearch={numberChangeHandler}
      style={{ maxWidth: "200px" }}
    />
  );

  const sendCityFilter = (
    <Select
      mode="multiple"
      value={filters.sendCities}
      allowClear
      className="parcels_filters_select"
      placeholder="Город отправителя"
      onChange={sendCityChangeHandler}
      options={citySelectOptions}
    />
  );

  const recCityFilter = (
    <Select
      mode="multiple"
      value={filters.recCities}
      allowClear
      className="parcels_filters_select"
      placeholder="Город получателя"
      onChange={recCityChangeHandler}
      options={citySelectOptions}
    />
  );

  const statusFilter = (
    <Select
      mode="multiple"
      value={filters.statuses}
      className="parcels_filters_select"
      placeholder="Статус накладной"
      onChange={statusesChangeHandler}
      options={statuses}
    />
  );

  const downloadButton = (
    <DownloadButton
      data={downloadingData}
      headers={exportHeaderParcels}
      filename="Накладные СВС-Логистик.csv"
    />
  );

  return isMobile() ? (
    <Space direction="vertical" style={{ padding: "12px 16px" }}>
      <Space direction="horizontal">
        {createButton}
        {reloadButton}
      </Space>
      <Space direction="horizontal">
        {datePickerFrom}
        {datePickerTo}
      </Space>
      <Space direction="horizontal">
        {sendCityFilter}
        {recCityFilter}
      </Space>
      <Space direction="horizontal">
        {numberFilter}
        {statusFilter}
      </Space>
    </Space>
  ) : (
    <div className="parcels_filters">
      <Space direction="horizontal">
        {createButton}
        {reloadButton}
        {datePickerFrom}
        {datePickerTo}
      </Space>
      <Space direction={"horizontal"}>
        {numberFilter}
        {sendCityFilter}
        {recCityFilter}
        {statusFilter}
      </Space>
      {downloadButton}
    </div>
  );
};
