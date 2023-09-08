import { createSlice } from "@reduxjs/toolkit";

interface IManifestsFilter {
  dateFrom: number;
  dateTo: number;
  number: string;
  incoming: boolean;
  outgoing: boolean;
}

export interface IManifestsSettingsState {
  filters: IManifestsFilter;
  sort?: Record<string, 1 | -1>;
  limit?: number;
  offset?: number;
}

const initialState: IManifestsSettingsState = {
  filters: {
    dateFrom: new Date().valueOf() - 86400 * 1000 * 7,
    dateTo: new Date().valueOf(),
    number: "",
    incoming: true,
    outgoing: true,
  },
  sort: { createdAt: 1 },
  limit: 1000,
  offset: 0,
};

const manifestsSettingsSlice = createSlice({
  name: "manifestsSettings",
  initialState,
  reducers: {
    setManifestsFiltersDateFrom: (
      state: IManifestsSettingsState,
      action: { payload: number },
    ) => {
      state.filters.dateFrom = action.payload;
    },
    setManifestsFiltersDateTo: (
      state: IManifestsSettingsState,
      action: { payload: number },
    ) => {
      state.filters.dateTo = action.payload;
    },
    toggleManifestsFiltersIncoming: (state: IManifestsSettingsState) => {
      state.filters.incoming = !state.filters.incoming;
    },
    toggleManifestsFiltersOutgoing: (state: IManifestsSettingsState) => {
      state.filters.outgoing = !state.filters.outgoing;
    },
    setManifestsFiltersNumber: (
      state: IManifestsSettingsState,
      action: { payload: string },
    ) => {
      state.filters.number = action.payload;
    },
    clearManifestsSettingsState: (state: IManifestsSettingsState) => {
      state.filters = initialState.filters;
    },
  },
});

export const {
  setManifestsFiltersDateFrom,
  setManifestsFiltersDateTo,
  setManifestsFiltersNumber,
  toggleManifestsFiltersIncoming,
  toggleManifestsFiltersOutgoing,
  clearManifestsSettingsState,
} = manifestsSettingsSlice.actions;

export const manifestsSettings = manifestsSettingsSlice.reducer;
