import { createSlice } from "@reduxjs/toolkit";
import { IManifest } from "../../../interfaces/manifests/IManifest";
import { IParcelsList } from "../../../interfaces/parcels/IParcelsList";

export interface IEditableManifestState {
  id?: string;
  number?: string;
  recCity: string;
  transferNumber: string;
  manifestCompany: string;
  qtParcels: number;
  qtItems: number;
  weight: number;
  volume: number;
  parcels: IParcelsList[];

  sent: boolean;
}

const initialState: IEditableManifestState = {
  sent: false,
  recCity: "",
  transferNumber: "",
  manifestCompany: "",
  id: undefined,
  qtParcels: 0,
  qtItems: 1,
  weight: 1,
  volume: 1,
  parcels: [],
};

const setManifestData = (
  state: IEditableManifestState,
  manifestData: Partial<IManifest>,
) => {
  state.id = manifestData.id;
  state.number = manifestData.number;
  state.recCity = manifestData.recCity;
  state.transferNumber = manifestData.transferNumber;
  state.manifestCompany = manifestData.manifestCompany;
  state.qtParcels = manifestData.qtParcels;
  state.qtItems = manifestData.qtItems;
  state.weight = manifestData.weight;
  state.volume = manifestData.volume;
  state.parcels = manifestData.parcels;
};

const editableManifestSlice = createSlice({
  name: "manifest",
  initialState,
  reducers: {
    setManifestData: (
      state: IEditableManifestState,
      action: { payload: Partial<IManifest> },
    ) => {
      setManifestData(state, action.payload);
    },

    setQtItems: (
      state: IEditableManifestState,
      action: { payload: number },
    ) => {
      state.qtItems = action.payload;
    },

    setWeight: (state: IEditableManifestState, action: { payload: number }) => {
      state.weight = action.payload;
    },

    setVolume: (state: IEditableManifestState, action: { payload: number }) => {
      state.volume = action.payload;
    },

    setTransferNumber: (
      state: IEditableManifestState,
      action: { payload: string },
    ) => {
      state.transferNumber = action.payload;
    },

    setRecCity: (
      state: IEditableManifestState,
      action: { payload: string },
    ) => {
      state.recCity = action.payload;
    },

    setManifestCompany: (
      state: IEditableManifestState,
      action: { payload: string },
    ) => {
      state.manifestCompany = action.payload;
    },

    addParcel: (
      state: IEditableManifestState,
      action: { payload: IParcelsList },
    ) => {
      state.parcels = [...state.parcels, action.payload];
      state.qtParcels = state.parcels.length;
    },

    deleteParcel: (
      state: IEditableManifestState,
      action: { payload: string },
    ) => {
      state.parcels = state.parcels.filter(
        (parcel) => parcel.id !== action.payload,
      );
      state.qtParcels = state.parcels.length;
    },

    savedManifest: (
      state: IEditableManifestState,
      action: { payload: { id: string } },
    ) => {
      state.id = action.payload.id;
      state.sent = false;
    },

    saveError: (state: IEditableManifestState) => {
      state.sent = false;
    },

    clearCreateManifestState: (state: IEditableManifestState) => {
      setManifestData(state, initialState);
    },
  },
});

export const { clearCreateManifestState, ...editManifestAction } =
  editableManifestSlice.actions;

export const editableManifest = editableManifestSlice.reducer;
