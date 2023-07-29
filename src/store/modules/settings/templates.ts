import { createSlice } from "@reduxjs/toolkit";

interface ITemplatesFilter {
    name: string,
}

export interface ITemplatesSettingsState {
    filters: ITemplatesFilter,
    sort?: Record<string, 1 | -1>,
}


const initialState: ITemplatesSettingsState = {
    filters: {
        name: ""
    },
    sort: { "name": 1 },
}

const templatesSettingsSlice = createSlice({
    name: 'templatesSettings',
    initialState,
    reducers: {
        setTemplatesFilterName: (state: ITemplatesSettingsState, action: { payload: string }) => {
            state.filters.name = action.payload;
        },
        clearTemplatesSettingsState: (state: ITemplatesSettingsState) => {
            state.filters = initialState.filters
        }
    },
});

export const {
    setTemplatesFilterName,
    clearTemplatesSettingsState
} = templatesSettingsSlice.actions;

export const templatesSettings = templatesSettingsSlice.reducer