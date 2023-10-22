import { createSlice } from "@reduxjs/toolkit";

type ManifestFilterType = "incoming" | "outgoing" | "all";

interface IManifestsFilter {
  dateFrom: number;
  dateTo: number;
  number: string;
  manifestType: ManifestFilterType;
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
    manifestType: "incoming",
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
    setManifestsFiltersType: (
      state: IManifestsSettingsState,
      action: { payload: ManifestFilterType },
    ) => {
      state.filters.manifestType = action.payload;
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
  setManifestsFiltersType,
  clearManifestsSettingsState,
} = manifestsSettingsSlice.actions;

export const manifestsSettings = manifestsSettingsSlice.reducer;
