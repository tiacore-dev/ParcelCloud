import { createSlice } from "@reduxjs/toolkit";

interface IDocumentsFilter {

    dateFrom: number,
    dateTo:  number,
    number: string

}

export interface IDocumentsSettingsState {
    filters: IDocumentsFilter,
    sort?: Record<string, 1 | -1>,
}


const initialState: IDocumentsSettingsState = {
    filters: {
        dateFrom: new Date().valueOf() - 86400 * 1000 * 30,
        dateTo: new Date().valueOf(),
        number: "",
    },
    sort: { "date": 1 }
}

const documentsSettingsSlice = createSlice({
    name: 'documentsSettings',
    initialState,
    reducers: {
        setDocumentsFiltersDateFrom: (state: IDocumentsSettingsState, action: { payload: number }) => {
            state.filters.dateFrom = action.payload;
        },
        setDocumentsFiltersDateTo: (state: IDocumentsSettingsState, action: { payload: number }) => {
            state.filters.dateTo = action.payload;
        },
        setDocumentsFiltersNumber: (state: IDocumentsSettingsState, action: { payload: string }) => {
            state.filters.number = action.payload;
        },
        clearDocumentsSettingsState: (state: IDocumentsSettingsState) => {
            state.filters = initialState.filters
        }
    },
});

export const {
    setDocumentsFiltersDateFrom,
    setDocumentsFiltersDateTo,
    setDocumentsFiltersNumber,
    clearDocumentsSettingsState
} = documentsSettingsSlice.actions;

export const documentsSettings = documentsSettingsSlice.reducer