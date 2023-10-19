import { createSlice } from "@reduxjs/toolkit";
import { IParcelsInStorageList } from "../../../interfaces/parcels/IParcelsList";

interface IParcelsInStorageState {
  data: IParcelsInStorageList[];
  loading: boolean;
  loaded: boolean;
  errMsg: string;
}

const initialState: IParcelsInStorageState = {
  data: [],
  loading: false,
  loaded: false,
  errMsg: "",
};

const parcelsInStorageSlice = createSlice({
  name: "parcelsInStorage",
  initialState,
  reducers: {
    getParcelsInStorageRequest: (state: IParcelsInStorageState) => {
      state.loading = true;
      state.loaded = false;
    },
    getParcelsInStorageFailure: (
      state: IParcelsInStorageState,
      action: { payload: string },
    ) => {
      state.loading = false;
      state.loaded = false;
      state.errMsg = action.payload;
    },
    getParcelsInStorageSuccess: (
      state: IParcelsInStorageState,
      action: { payload: IParcelsInStorageList[] },
    ) => {
      state.loading = false;
      state.loaded = true;
      state.data = action.payload;
    },
    clearParcelsInStorageState: (state: IParcelsInStorageState) => {
      state.data = initialState.data;
      state.loaded = initialState.loaded;
      state.loading = initialState.loading;
      state.errMsg = initialState.errMsg;
    },
  },
});

export const {
  getParcelsInStorageRequest,
  getParcelsInStorageFailure,
  getParcelsInStorageSuccess,
  clearParcelsInStorageState,
} = parcelsInStorageSlice.actions;

export const parcelsInStorage = parcelsInStorageSlice.reducer;
