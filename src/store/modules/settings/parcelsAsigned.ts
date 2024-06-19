import { createSlice } from "@reduxjs/toolkit";

type taskType = "toDelivery" | "toReceive" | "received" | "all";

interface IParcelsAsignedFilter {
  taskType: taskType;
  number: string;
  date: number | null;
}

export interface IParcelsAsignedSettingsState {
  filters: IParcelsAsignedFilter;
}

const today = new Date().setUTCHours(-7, 0, 0, 0).valueOf();

const initialState: IParcelsAsignedSettingsState = {
  filters: {
    taskType: "toReceive",
    number: "",
    date: today,
  },
};

const parcelsAsignedSettingsSlice = createSlice({
  name: "parcelsAsignedSettings",
  initialState,
  reducers: {
    setIParcelsAsignedFilterTaskType: (
      state: IParcelsAsignedSettingsState,
      action: { payload: taskType },
    ) => {
      state.filters.taskType = action.payload;
    },

    setIParcelsAsignedFilterNumber: (
      state: IParcelsAsignedSettingsState,
      action: { payload: string },
    ) => {
      state.filters.number = action.payload;
    },

    setIParcelsAsignedFilterDate: (
      state: IParcelsAsignedSettingsState,
      action: { payload: number | null },
    ) => {
      state.filters.date = action.payload;
    },

    clearParcelsAsignedSettingsState: (state: IParcelsAsignedSettingsState) => {
      state.filters = initialState.filters;
    },
  },
});

export const {
  setIParcelsAsignedFilterTaskType,
  setIParcelsAsignedFilterNumber,
  setIParcelsAsignedFilterDate,
  clearParcelsAsignedSettingsState,
} = parcelsAsignedSettingsSlice.actions;

export const parcelsAsignedSettings = parcelsAsignedSettingsSlice.reducer;
