import { DatePicker, Space } from "antd";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../store/modules";
import {
  setDocumentsFiltersDateFrom,
  setDocumentsFiltersDateTo,
  setDocumentsFiltersNumber,
} from "../../../store/modules/settings/documents";
import dayjs from "dayjs";
import { dateFormat } from "../../../utils/dateConverter";
import Search from "antd/es/input/Search";
import { isMobile } from "../../../utils/isMobile";

export const Filters = () => {
  const filters = useSelector(
    (state: IState) => state.settings.documentsSettings.filters,
  );
  const dispatch = useDispatch();

  const dateFromChangeHandler = (date: dayjs.Dayjs) => {
    dispatch(setDocumentsFiltersDateFrom(date.valueOf()));
  };
  const dateToChangeHandler = (date: dayjs.Dayjs) => {
    dispatch(setDocumentsFiltersDateTo(date.valueOf()));
  };

  const numberChangeHandler = (number: string) => {
    dispatch(setDocumentsFiltersNumber(number));
  };

  return (
    <Space
      direction={isMobile() ? "vertical" : "horizontal"}
      className="documents_filters"
    >
      <DatePicker
        value={dayjs(filters.dateFrom)}
        placeholder="Дата начала"
        onChange={dateFromChangeHandler}
        format={dateFormat}
        onFocus={(e) => e.target.blur()}
      />
      <DatePicker
        value={dayjs(filters.dateTo)}
        placeholder="Дата окончания"
        onChange={dateToChangeHandler}
        format={dateFormat}
        onFocus={(e) => e.target.blur()}
      />
      <Search placeholder="Поиск по номеру" onSearch={numberChangeHandler} />
    </Space>
  );
};
