import { createSlice } from "@reduxjs/toolkit";

type taskType = "toDelivery" | "toReceive" | "all";

interface IParcelsAsignedFilter {
  taskType: taskType;
  number: string;
}

export interface IParcelsAsignedSettingsState {
  filters: IParcelsAsignedFilter;
}

const initialState: IParcelsAsignedSettingsState = {
  filters: {
    taskType: "all",
    number: "",
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

    clearParcelsAsignedSettingsState: (state: IParcelsAsignedSettingsState) => {
      state.filters = initialState.filters;
    },
  },
});

export const {
  setIParcelsAsignedFilterTaskType,
  setIParcelsAsignedFilterNumber,
  clearParcelsAsignedSettingsState,
} = parcelsAsignedSettingsSlice.actions;

export const parcelsAsignedSettings = parcelsAsignedSettingsSlice.reducer;
