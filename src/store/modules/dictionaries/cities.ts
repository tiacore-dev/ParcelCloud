import { createSlice } from "@reduxjs/toolkit";

interface ICitiesState {
    data: string[]
    loading: boolean
    loaded: boolean
    errMsg: string
}

const initialState: ICitiesState = {
    data: [],
    loading: false,
    loaded: false,
    errMsg: ''
}

const citiesSlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {
        getCitiesRequest: (state: ICitiesState) => {
            state.loading = true;
            state.loaded = false
        },
        getCitiesFailure: (state: ICitiesState, action: { payload: string }) => {
            state.loading = false;
            state.loaded = false
            state.errMsg = action.payload;
        },
        getCitiesSuccess: (state: ICitiesState, action: { payload: string[] }) => {
            state.loading = false;
            state.loaded = true
            state.data = action.payload;
        },
        clearCitiesState: (state: ICitiesState) => {
            state.data = [],
                state.loading = true;
            state.loaded = false
            state.errMsg = "";
        },
    },
});

export const { getCitiesRequest, getCitiesFailure, getCitiesSuccess, clearCitiesState } = citiesSlice.actions;

export const cities = citiesSlice.reducer