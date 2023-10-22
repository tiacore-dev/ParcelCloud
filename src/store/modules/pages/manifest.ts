import { createSlice } from "@reduxjs/toolkit";
import { IManifest } from "../../../interfaces/manifests/IManifest";
import { ParcelsStatusData } from "../../../hooks/ApiActions/parcel";

interface IManifestState {
  data: IManifest | undefined;
  loading: boolean;
  loaded: boolean;
  errMsg: string;
}

const initialState: IManifestState = {
  data: undefined,
  loading: false,
  loaded: false,
  errMsg: "",
};

const manifestSlice = createSlice({
  name: "manifest",
  initialState,
  reducers: {
    getManifestRequest: (state: IManifestState) => {
      state.loading = true;
      state.loaded = false;
    },
    getManifestFailure: (
      state: IManifestState,
      action: { payload: string },
    ) => {
      state.loading = false;
      state.loaded = false;
      state.errMsg = action.payload;
    },
    getManifestSuccess: (
      state: IManifestState,
      action: { payload: IManifest },
    ) => {
      state.loading = false;
      state.loaded = true;
      state.data = action.payload;
    },
    setManifestParcelsStatus: (
      state: IManifestState,
      action: { payload: ParcelsStatusData[] },
    ) => {
      state.loading = false;
      state.loaded = true;
      action.payload.forEach((payloadParcel) => {
        state.data.parcels = state.data.parcels.map((parcel) =>
          parcel.id === payloadParcel.id
            ? { ...parcel, status: payloadParcel.status }
            : parcel,
        );
      });
    },
    sendManifestSuccess: (state: IManifestState) => {
      state.loading = false;
      state.loaded = true;
      state.data = { ...state.data, sent: true };
    },

    clearManifestState: (state: IManifestState) => {
      state.data = undefined;
      state.loaded = false;
      state.loading = false;
      state.errMsg = "";
    },
  },
});

export const {
  getManifestRequest,
  getManifestFailure,
  getManifestSuccess,
  setManifestParcelsStatus,
  sendManifestSuccess,
  clearManifestState,
} = manifestSlice.actions;

export const manifest = manifestSlice.reducer;
