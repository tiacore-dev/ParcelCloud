import { createSlice } from "@reduxjs/toolkit";
import { IManifest } from "../../../interfaces/manifests/IManifest";

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
  clearManifestState,
} = manifestSlice.actions;

export const manifest = manifestSlice.reducer;
