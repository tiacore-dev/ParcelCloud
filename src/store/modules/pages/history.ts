import { createSlice } from "@reduxjs/toolkit";
import { IParcelHistory } from "../../../interfaces/parcels/IParcel";

export interface IHistoryState {
  loading: boolean;
  loaded: boolean;
  parcelNumber: string;
  history: IParcelHistory[];
}

const initialState: IHistoryState = {
  loading: false,
  loaded: false,
  parcelNumber: "",
  history: [],
};

const historySlice = createSlice({
  name: "prices",
  initialState,
  reducers: {
    getHistoryRequest: (state: IHistoryState) => {
      state.loading = true;
      state.loaded = false;
    },
    getHistorySuccess: (
      state: IHistoryState,
      action: { payload: IParcelHistory[] },
    ) => {
      state.loading = false;
      state.loaded = true;
      state.history = action.payload;
    },
    getHistoryFailure: (state: IHistoryState) => {
      state.loading = false;
      state.loaded = false;
    },

    setParcelNumber: (state: IHistoryState, action: { payload: string }) => {
      state.parcelNumber = action.payload;
    },
    clearHistoryState: (state: IHistoryState) => {
      state.loaded = false;
      state.loading = false;
      state.parcelNumber = "";
      state.history = [];
    },
  },
});

export const {
  getHistoryRequest,
  getHistorySuccess,
  getHistoryFailure,
  setParcelNumber,
  clearHistoryState,
} = historySlice.actions;

export const history = historySlice.reducer;
