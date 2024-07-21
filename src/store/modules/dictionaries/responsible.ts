import { createSlice } from "@reduxjs/toolkit";
import { IResponsible } from "../../../interfaces/responsible/IResponsible";

interface IResponsibleState {
  data: IResponsible[];
  loading: boolean;
  loaded: boolean;
  errMsg: string;
}

const initialState: IResponsibleState = {
  data: [],
  loading: false,
  loaded: false,
  errMsg: "",
};

const responsibleSlice = createSlice({
  name: "responsible",
  initialState,
  reducers: {
    getResponsibleRequest: (state: IResponsibleState) => {
      state.loading = true;
      state.loaded = false;
    },
    getResponsibleFailure: (
      state: IResponsibleState,
      action: { payload: string },
    ) => {
      state.loading = false;
      state.loaded = false;
      state.errMsg = action.payload;
    },
    getResponsibleSuccess: (
      state: IResponsibleState,
      action: { payload: IResponsible[] },
    ) => {
      state.loading = false;
      state.loaded = true;
      state.data = action.payload;
    },
    clearResponsibleState: (state: IResponsibleState) => {
      (state.data = []), (state.loading = true);
      state.loaded = false;
      state.errMsg = "";
    },
  },
});

export const {
  getResponsibleRequest,
  getResponsibleFailure,
  getResponsibleSuccess,
  clearResponsibleState,
} = responsibleSlice.actions;

export const responsible = responsibleSlice.reducer;
