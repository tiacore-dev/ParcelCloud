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

const CitiesSlice = createSlice({
    name: 'Cities',
    initialState,
    reducers: {
        getCitiesRequest: (state: ICitiesState) => {
            state.loading = true;
            state.loaded =  false
        },
        getCitiesFailure: (state: ICitiesState, action: {payload: string}) => {
            state.loading = false;
            state.loaded =  false
            state.errMsg = action.payload;
        },
        getCitiesSuccess: (state: ICitiesState, action: {payload: string[]}) => {
            state.loading = false;
            state.loaded =  true
            state.data = action.payload;
        }
    },
});

export const { getCitiesRequest, getCitiesFailure, getCitiesSuccess } = CitiesSlice.actions;

export const Cities = CitiesSlice.reducer