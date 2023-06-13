import { createSlice } from "@reduxjs/toolkit";

interface IParcelsFilter {

    dateFrom: number,
    dateTo:  number,
    number: string,
    sendCities: string[],
    recCities: string[]

}

export interface IParcelsSettingsState {
    filters: IParcelsFilter,
    sort?: Record<string, 1 | -1>,
    limit?: number,
    offset?: number
}


const initialState: IParcelsSettingsState = {
    filters: {
        dateFrom: 1550412452000,
        dateTo: 1589312452000,
        number: "",
        sendCities: [],
        recCities: [],
    },
    sort: { "createdAt": 1 },
    limit: 1000,
    offset: 0
}

const parcelsSettingsSlice = createSlice({
    name: 'parcelsSettings',
    initialState,
    reducers: {
        setParcelsFiltersDateFrom: (state: IParcelsSettingsState, action: { payload: number }) => {
            console.log(action.payload)
            state.filters.dateFrom = action.payload;
        },
        setParcelsFiltersDateTo: (state: IParcelsSettingsState, action: { payload: number }) => {
            state.filters.dateTo = action.payload;
        },
        setParcelsFiltersNumber: (state: IParcelsSettingsState, action: { payload: string }) => {
            state.filters.number = action.payload;
        },
        setParcelsFiltersSendCities: (state: IParcelsSettingsState, action: { payload: string[] }) => {
            state.filters.sendCities = action.payload;
        },
        setParcelsFiltersRecCities: (state: IParcelsSettingsState, action: { payload: string[] }) => {
            state.filters.recCities = action.payload;
        },
    },
});

export const {
    setParcelsFiltersDateFrom,
    setParcelsFiltersDateTo,
    setParcelsFiltersNumber,
    setParcelsFiltersSendCities,
    setParcelsFiltersRecCities
} = parcelsSettingsSlice.actions;

export const parcelsSettings = parcelsSettingsSlice.reducer