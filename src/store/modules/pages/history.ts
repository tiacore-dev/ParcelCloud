import { createSlice } from "@reduxjs/toolkit";
import { IParcelHistory } from "../../../interfaces/parcels/IParcel";

export interface IHistoryState {
  loading: boolean;
  loaded: boolean;
  parcelNumber: string;
  qt?: number;
  weight?: number;
  volume?: number;
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
      action: {
        payload: {
          data: IParcelHistory[];
          qt?: number;
          weight?: number;
          volume?: number;
        };
      }
    ) => {
      state.loading = false;
      state.loaded = true;
      if (Array.isArray(action.payload)) {
        state.history = action.payload;
      } else {
        state.history = action.payload.data;
        state.qt = action.payload.qt;
        state.weight = action.payload.weight;
        state.volume = action.payload.volume;
      }
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
