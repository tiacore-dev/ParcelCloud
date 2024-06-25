import { createSlice } from "@reduxjs/toolkit";
import { IParcelsAsignedList } from "../../../interfaces/parcels/IParcelsList";
import { ParcelStatusData } from "../../../hooks/ApiActions/parcel";

interface IParcelsAsignedState {
  data: IParcelsAsignedList[];
  loading: boolean;
  loaded: boolean;
  errMsg: string;
}

const initialState: IParcelsAsignedState = {
  data: [],
  loading: false,
  loaded: false,
  errMsg: "",
};

const parcelsAsignedSlice = createSlice({
  name: "parcelsAsigned",
  initialState,
  reducers: {
    changeParcelAsignedStatus: (
      state: IParcelsAsignedState,
      action: {
        payload: { id: string; statusData: ParcelStatusData };
      },
    ) => {
      state.data = state.data.map((el) =>
        el.id === action.payload.id
          ? {
              ...el,
              status: action.payload.statusData.status,
              toDelivery: action.payload.statusData.toDelivery
                ? action.payload.statusData.toDelivery
                : el.toDelivery,
              toReceive: action.payload.statusData.toReceive
                ? action.payload.statusData.toReceive
                : el.toReceive,
              received: action.payload.statusData.received
                ? action.payload.statusData.received
                : el.received,
            }
          : el,
      );
    },

    getParcelsAsignedRequest: (state: IParcelsAsignedState) => {
      state.loading = true;
      state.loaded = false;
    },
    getParcelsAsignedFailure: (
      state: IParcelsAsignedState,
      action: { payload: string },
    ) => {
      state.loading = false;
      state.loaded = false;
      state.errMsg = action.payload;
    },
    getParcelsAsignedSuccess: (
      state: IParcelsAsignedState,
      action: { payload: IParcelsAsignedList[] },
    ) => {
      state.loading = false;
      state.loaded = true;
      state.data = action.payload;
    },
    clearParcelsAsignedState: (state: IParcelsAsignedState) => {
      state.data = initialState.data;
      state.loaded = initialState.loaded;
      state.loading = initialState.loading;
      state.errMsg = initialState.errMsg;
    },
  },
});

export const {
  changeParcelAsignedStatus,
  getParcelsAsignedRequest,
  getParcelsAsignedFailure,
  getParcelsAsignedSuccess,
  clearParcelsAsignedState,
} = parcelsAsignedSlice.actions;

export const parcelsAsigned = parcelsAsignedSlice.reducer;
