import { createSlice } from "@reduxjs/toolkit";
import { IParcelsList } from "../../../interfaces/parcels/IParcelsList";

interface IParcelsState {
  data: IParcelsList[];
  loading: boolean;
  loaded: boolean;
  errMsg: string;
}

const initialState: IParcelsState = {
  data: [],
  loading: false,
  loaded: false,
  errMsg: "",
};

const parcelsSlice = createSlice({
  name: "parcels",
  initialState,
  reducers: {
    getParcelsRequest: (state: IParcelsState) => {
      state.loading = true;
      state.loaded = false;
    },
    getParcelsFailure: (state: IParcelsState, action: { payload: string }) => {
      state.loading = false;
      state.loaded = false;
      state.errMsg = action.payload;
    },
    getParcelsSuccess: (
      state: IParcelsState,
      action: { payload: IParcelsList[] },
    ) => {
      state.loading = false;
      state.loaded = true;
      state.data = action.payload;
    },
    clearParcelsState: (state: IParcelsState) => {
      state.data = initialState.data;
      state.loaded = initialState.loaded;
      state.loading = initialState.loading;
      state.errMsg = initialState.errMsg;
    },
  },
});

export const {
  getParcelsRequest,
  getParcelsFailure,
  getParcelsSuccess,
  clearParcelsState,
} = parcelsSlice.actions;

export const parcels = parcelsSlice.reducer;
