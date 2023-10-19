import { createSlice } from "@reduxjs/toolkit";

type taskType = "toDelivery" | "toReceive" | "all";

interface IParcelsAsignedFilter {
  taskType: taskType;
}

export interface IParcelsAsignedSettingsState {
  filters: IParcelsAsignedFilter;
}

const initialState: IParcelsAsignedSettingsState = {
  filters: {
    taskType: "all",
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

    clearParcelsAsignedSettingsState: (state: IParcelsAsignedSettingsState) => {
      state.filters = initialState.filters;
    },
  },
});

export const {
  setIParcelsAsignedFilterTaskType,
  clearParcelsAsignedSettingsState,
} = parcelsAsignedSettingsSlice.actions;

export const parcelsAsignedSettings = parcelsAsignedSettingsSlice.reducer;
