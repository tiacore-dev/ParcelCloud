import { createSlice } from "@reduxjs/toolkit";
import { IParcel } from "../../../interfaces/parcels/IParcel";
import { ParcelStatusData } from "../../../hooks/ApiActions/parcel";

interface IParcelState {
  data: IParcel | undefined;
  loading: boolean;
  loaded: boolean;
  errMsg: string;
}

const initialState: IParcelState = {
  data: undefined,
  loading: false,
  loaded: false,
  errMsg: "",
};

const parcelSlice = createSlice({
  name: "parcel",
  initialState,
  reducers: {
    getParcelRequest: (state: IParcelState) => {
      state.loading = true;
      state.loaded = false;
    },
    getParcelFailure: (state: IParcelState, action: { payload: string }) => {
      state.loading = false;
      state.loaded = false;
      state.errMsg = action.payload;
    },
    getParcelSuccess: (state: IParcelState, action: { payload: IParcel }) => {
      state.loading = false;
      state.loaded = true;
      state.data = action.payload;
    },
    setToReceiveСonfirmed: (state: IParcelState) => {
      state.loading = false;
      state.loaded = true;
      state.data.toReceiveСonfirmed = true;
    },

    setParcelStatus: (
      state: IParcelState,
      action: { payload: ParcelStatusData },
    ) => {
      state.loading = false;
      state.loaded = true;
      state.data.status = action.payload.status;
      state.data.toReceive = action.payload.toReceive;
      state.data.toDelivery = action.payload.toDelivery;
    },

    clearParcelState: (state: IParcelState) => {
      state.data = undefined;
      state.loaded = false;
      state.loading = false;
      state.errMsg = "";
    },
  },
});

export const {
  getParcelRequest,
  getParcelFailure,
  getParcelSuccess,
  setToReceiveСonfirmed,
  setParcelStatus,
  clearParcelState,
} = parcelSlice.actions;

export const parcel = parcelSlice.reducer;
