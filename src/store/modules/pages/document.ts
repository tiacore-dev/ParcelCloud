import { createSlice } from "@reduxjs/toolkit";
import { IDocument } from "../../../interfaces/documents/IDocument";

interface IDocumentState {
  data: IDocument | undefined;
  loading: boolean;
  loaded: boolean;
  errMsg: string;
}

const initialState: IDocumentState = {
  data: undefined,
  loading: false,
  loaded: false,
  errMsg: "",
};

const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    getDocumentRequest: (state: IDocumentState) => {
      state.loading = true;
      state.loaded = false;
    },
    getDocumentFailure: (
      state: IDocumentState,
      action: { payload: string },
    ) => {
      state.loading = false;
      state.loaded = false;
      state.errMsg = action.payload;
    },
    getDocumentSuccess: (
      state: IDocumentState,
      action: { payload: IDocument },
    ) => {
      state.loading = false;
      state.loaded = true;
      state.data = action.payload;
    },
    clearDocumentState: (state: IDocumentState) => {
      state.data = undefined;
      state.loaded = false;
      state.loading = false;
      state.errMsg = "";
    },
  },
});

export const {
  getDocumentRequest,
  getDocumentFailure,
  getDocumentSuccess,
  clearDocumentState,
} = documentSlice.actions;

export const document = documentSlice.reducer;
