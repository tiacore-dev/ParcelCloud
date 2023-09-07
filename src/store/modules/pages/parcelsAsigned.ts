import { createSlice } from "@reduxjs/toolkit";
import { IParcelsAsignedList } from "../../../interfaces/parcels/IParcelsList";

interface IParcelsAsignedState {
  data: IParcelsAsignedList[];
  loading: boolean;
  loaded: boolean;
  errMsg: string;
}

const initialState: IParcelsAsignedState = {
  data: [],
  loading: false,
  loaded: false,
  errMsg: "",
};

const parcelsAsignedSlice = createSlice({
  name: "parcelsAsigned",
  initialState,
  reducers: {
    getParcelsAsignedRequest: (state: IParcelsAsignedState) => {
      state.loading = true;
      state.loaded = false;
    },
    getParcelsAsignedFailure: (
      state: IParcelsAsignedState,
      action: { payload: string },
    ) => {
      state.loading = false;
      state.loaded = false;
      state.errMsg = action.payload;
    },
    getParcelsAsignedSuccess: (
      state: IParcelsAsignedState,
      action: { payload: IParcelsAsignedList[] },
    ) => {
      state.loading = false;
      state.loaded = true;
      state.data = action.payload;
    },
    clearParcelsAsignedState: (state: IParcelsAsignedState) => {
      state.data = initialState.data;
      state.loaded = initialState.loaded;
      state.loading = initialState.loading;
      state.errMsg = initialState.errMsg;
    },
  },
});

export const {
  getParcelsAsignedRequest,
  getParcelsAsignedFailure,
  getParcelsAsignedSuccess,
  clearParcelsAsignedState,
} = parcelsAsignedSlice.actions;

export const parcelsAsigned = parcelsAsignedSlice.reducer;
