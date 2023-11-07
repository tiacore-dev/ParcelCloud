import { createSlice } from "@reduxjs/toolkit";

type parcelInStorageType = "toDelivery" | "toReceive" | "myOwn" | "all";

interface IParcelsInStorageFilter {
  parcelInStorageType: parcelInStorageType;
  number: string;
}

export interface IParcelsInStorageSettingsState {
  filters: IParcelsInStorageFilter;
}

const initialState: IParcelsInStorageSettingsState = {
  filters: {
    parcelInStorageType: "all",
    number: "",
  },
};

const parcelsInStorageSettingsSlice = createSlice({
  name: "parcelsInStorageSettings",
  initialState,
  reducers: {
    setIParcelsInStorageFilterTaskType: (
      state: IParcelsInStorageSettingsState,
      action: { payload: parcelInStorageType },
    ) => {
      state.filters.parcelInStorageType = action.payload;
    },

    setIParcelsInStorageFilterNumber: (
      state: IParcelsInStorageSettingsState,
      action: { payload: string },
    ) => {
      state.filters.number = action.payload;
    },

    clearParcelsInStorageSettingsState: (
      state: IParcelsInStorageSettingsState,
    ) => {
      state.filters = initialState.filters;
    },
  },
});

export const {
  setIParcelsInStorageFilterTaskType,
  setIParcelsInStorageFilterNumber,
  clearParcelsInStorageSettingsState,
} = parcelsInStorageSettingsSlice.actions;

export const parcelsInStorageSettings = parcelsInStorageSettingsSlice.reducer;
