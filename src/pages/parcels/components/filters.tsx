import { DatePicker, Input, Select, Space } from 'antd';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../../store/modules';
import { setParcelsFiltersDateFrom, setParcelsFiltersDateTo, setParcelsFiltersNumber, setParcelsFiltersRecCities, setParcelsFiltersSendCities } from '../../../store/modules/settings/parcels';
import dayjs from 'dayjs';
import { dateFormat } from '../../../utils/dateConverter';
import Search from 'antd/es/input/Search';


export const Filters = () => {

    const filters = useSelector((state: IState) => state.settings.parcelsSettings.filters)
    const dispatch = useDispatch();

    const cities = useSelector((state: IState) => state.dictionaries.cities.data)
    const dateFromChangeHandler = (date: dayjs.Dayjs) => {
        dispatch(setParcelsFiltersDateFrom(date.valueOf()))
    }
    const dateToChangeHandler = (date: dayjs.Dayjs) => {
        dispatch(setParcelsFiltersDateTo(date.valueOf()))
    }

    const numberChangeHandler = (number: string) => {
        dispatch(setParcelsFiltersNumber(number))
    }

    const sendCityChangeHandler = (cities: string[]) => {
        dispatch(setParcelsFiltersSendCities(cities))
    }

    const recCityChangeHandler = (cities: string[]) => {
        dispatch(setParcelsFiltersRecCities(cities))
    }

    const citySelectOptions = cities.map(city => ({ label: city, value: city }))

    return (
        <Space
            direction="horizontal"
            className='parcels_filters'
        >
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
            <Select
                mode="multiple"
                value={filters.sendCities}
                allowClear
                className='parcels_filters_select'
                placeholder="Город отправителя"
                onChange={sendCityChangeHandler}
                options={citySelectOptions}
            />
            <Select
                mode="multiple"
                value={filters.recCities}
                allowClear
                className='parcels_filters_select'
                placeholder="Город получателя"
                onChange={recCityChangeHandler}
                options={citySelectOptions}
            />
            

        </Space>

    )
}


