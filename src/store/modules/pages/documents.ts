import { createSlice } from "@reduxjs/toolkit";
import { IDocumentsList } from "../../../interfaces/documents/IDocumentsList";

interface IDocumentsState {
  data: IDocumentsList[];
  loading: boolean;
  loaded: boolean;
  errMsg: string;
}

const initialState: IDocumentsState = {
  data: [],
  loading: false,
  loaded: false,
  errMsg: "",
};

const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    getDocumentsRequest: (state: IDocumentsState) => {
      state.loading = true;
      state.loaded = false;
    },
    getDocumentsFailure: (
      state: IDocumentsState,
      action: { payload: string },
    ) => {
      state.loading = false;
      state.loaded = false;
      state.errMsg = action.payload;
    },
    getDocumentsSuccess: (
      state: IDocumentsState,
      action: { payload: IDocumentsList[] },
    ) => {
      state.loading = false;
      state.loaded = true;
      state.data = action.payload;
    },
    clearDocumentsState: (state: IDocumentsState) => {
      state.data = [];
      state.loaded = false;
      state.loading = false;
      state.errMsg = "";
    },
  },
});

export const {
  getDocumentsRequest,
  getDocumentsFailure,
  getDocumentsSuccess,
  clearDocumentsState,
} = documentsSlice.actions;

export const documents = documentsSlice.reducer;
