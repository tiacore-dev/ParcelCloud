import { createSlice } from "@reduxjs/toolkit";

interface IParcelsFilter {
  dateFrom: number;
  dateTo: number;
  number: string;
  sendCities: string[];
  recCities: string[];
  parcelIDS?: string[];
  statuses: string[];
}

export interface IParcelsSettingsState {
  filters: IParcelsFilter;
  sort?: Record<string, 1 | -1>;
  limit?: number;
  offset?: number;
}

const initialState: IParcelsSettingsState = {
  filters: {
    dateFrom: new Date().valueOf() - 86400 * 1000 * 30,
    dateTo: new Date().valueOf(),
    number: "",
    sendCities: [],
    recCities: [],
    statuses: [],
  },
  sort: { createdAt: 1 },
  limit: 1000,
  offset: 0,
};

const parcelsSettingsSlice = createSlice({
  name: "parcelsSettings",
  initialState,
  reducers: {
    setParcelsFiltersDateFrom: (
      state: IParcelsSettingsState,
      action: { payload: number },
    ) => {
      state.filters.dateFrom = action.payload;
    },
    setParcelsFiltersDateTo: (
      state: IParcelsSettingsState,
      action: { payload: number },
    ) => {
      state.filters.dateTo = action.payload;
    },
    setParcelsFiltersNumber: (
      state: IParcelsSettingsState,
      action: { payload: string },
    ) => {
      state.filters.number = action.payload;
    },
    setParcelsFiltersSendCities: (
      state: IParcelsSettingsState,
      action: { payload: string[] },
    ) => {
      state.filters.sendCities = action.payload;
    },
    setParcelsFiltersRecCities: (
      state: IParcelsSettingsState,
      action: { payload: string[] },
    ) => {
      state.filters.recCities = action.payload;
    },
    setParcelsFiltersStatuses: (
      state: IParcelsSettingsState,
      action: { payload: string[] },
    ) => {
      state.filters.statuses = action.payload;
    },
    clearParcelsSettingsState: (state: IParcelsSettingsState) => {
      state.filters = initialState.filters;
    },
  },
});

export const {
  setParcelsFiltersDateFrom,
  setParcelsFiltersDateTo,
  setParcelsFiltersNumber,
  setParcelsFiltersSendCities,
  setParcelsFiltersRecCities,
  setParcelsFiltersStatuses,
  clearParcelsSettingsState,
} = parcelsSettingsSlice.actions;

export const parcelsSettings = parcelsSettingsSlice.reducer;
