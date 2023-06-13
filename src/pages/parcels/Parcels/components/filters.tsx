import { DatePicker, Input, Space } from 'antd';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../../../store/modules';
import { setParcelsFiltersDateFrom, setParcelsFiltersDateTo, setParcelsFiltersNumber } from '../../../../store/modules/settings/parcels';
import dayjs from 'dayjs';
import { dateFormat } from '../../../../utils/dateConverter';
import Search from 'antd/es/input/Search';


export const Filters = () => {

    const filters = useSelector((state: IState) => state.settings.parcelsSettings.filters)
    const dispatch = useDispatch();

    const dateFromChangeHandler = (date: dayjs.Dayjs) => {
        dispatch(setParcelsFiltersDateFrom(date.valueOf()))
    }
    const dateToChangeHandler = (date: dayjs.Dayjs) => {
        dispatch(setParcelsFiltersDateTo(date.valueOf()))
    }

    const numberChangeHandler = (number: string) => {
        console.log(number)
        dispatch(setParcelsFiltersNumber(number))
    }

    return (
        <Space direction="horizontal">
            <DatePicker
                value={dayjs(filters.dateFrom)}
                placeholder='Дата начала'
                onChange={dateFromChangeHandler}
                format={dateFormat}
            />
            <DatePicker
                value={dayjs(filters.dateTo)}
                placeholder='Дата окончания'
                onChange={dateToChangeHandler}
                format={dateFormat}
            />
            <Search
                placeholder='Поиск по номеру'
                onSearch={numberChangeHandler}
            />
        </Space>

    )
}


