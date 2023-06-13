import { createSlice } from "@reduxjs/toolkit";
import { IParcelsCovertedData } from "../../../pages/parcels/Parcels/parcels";

interface IParcelsState {
    data: IParcelsCovertedData[]
    loading: boolean
    loaded: boolean
    errMsg: string
}


const initialState: IParcelsState = {
    data: [],
    loading: false,
    loaded: false,
    errMsg: ''
}

const parcelsSlice = createSlice({
    name: 'parcels',
    initialState,
    reducers: {
        getParcelsRequest: (state: IParcelsState) => {
            state.loading = true;
            state.loaded =  false
        },
        getParcelsFailure: (state: IParcelsState, action: {payload: string}) => {
            state.loading = false;
            state.loaded =  false
            state.errMsg = action.payload;
        },
        getParcelsSuccess: (state: IParcelsState, action: {payload: IParcelsCovertedData[]}) => {
            state.loading = false;
            state.loaded =  true
            state.data = action.payload;
        }
    },
});

export const { getParcelsRequest, getParcelsFailure, getParcelsSuccess } = parcelsSlice.actions;

export const parcels = parcelsSlice.reducer