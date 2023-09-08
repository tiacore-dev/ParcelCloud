import { createSlice } from "@reduxjs/toolkit";
import { IManifestList } from "../../../interfaces/manifests/IManifestList";

interface IManifestsState {
  data: IManifestList[];
  loading: boolean;
  loaded: boolean;
  errMsg: string;
}

const initialState: IManifestsState = {
  data: [],
  loading: false,
  loaded: false,
  errMsg: "",
};

const manifestsSlice = createSlice({
  name: "manifests",
  initialState,
  reducers: {
    getManifestsRequest: (state: IManifestsState) => {
      state.loading = true;
      state.loaded = false;
    },
    getManifestsFailure: (
      state: IManifestsState,
      action: { payload: string },
    ) => {
      state.loading = false;
      state.loaded = false;
      state.errMsg = action.payload;
    },
    getManifestsSuccess: (
      state: IManifestsState,
      action: { payload: IManifestList[] },
    ) => {
      state.loading = false;
      state.loaded = true;
      state.data = action.payload;
    },
    clearManifestsState: (state: IManifestsState) => {
      state.data = initialState.data;
      state.loaded = initialState.loaded;
      state.loading = initialState.loading;
      state.errMsg = initialState.errMsg;
    },
  },
});

export const {
  getManifestsRequest,
  getManifestsFailure,
  getManifestsSuccess,
  clearManifestsState,
} = manifestsSlice.actions;

export const manifests = manifestsSlice.reducer;
