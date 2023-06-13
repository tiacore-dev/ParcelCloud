import { createSlice } from "@reduxjs/toolkit";
import { IParcel } from "../../../interfaces/parcels/IParcel";

interface IParceltate {
    data: IParcel | undefined
    loading: boolean
    loaded: boolean
    errMsg: string
}


const initialState: IParceltate = {
    data: undefined,
    loading: false,
    loaded: false,
    errMsg: ''
}

const parcelSlice = createSlice({
    name: 'parcel',
    initialState,
    reducers: {
        getParcelRequest: (state: IParceltate) => {
            state.loading = true;
            state.loaded =  false
        },
        getParcelFailure: (state: IParceltate, action: {payload: string}) => {
            state.loading = false;
            state.loaded =  false
            state.errMsg = action.payload;
        },
        getParcelSuccess: (state: IParceltate, action: {payload: IParcel}) => {
            state.loading = false;
            state.loaded =  true
            state.data = action.payload;
        },
        clearParceltate: (state: IParceltate) => {
            state.data = undefined;
            state.loaded = false;
            state.loading = false;
            state.errMsg = ""
        },
    },
});

export const { getParcelRequest, getParcelFailure, getParcelSuccess, clearParceltate } = parcelSlice.actions;

export const parcel = parcelSlice.reducer