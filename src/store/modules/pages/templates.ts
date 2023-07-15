import { createSlice } from "@reduxjs/toolkit";
import { ITemplate } from "../../../interfaces/templates/ITemplate";


interface ITemplatesState {
    data: ITemplate[]
    loading: boolean
    loaded: boolean
    errMsg: string
}


const initialState: ITemplatesState = {
    data: [],
    loading: false,
    loaded: false,
    errMsg: ''
}

const templatesSlice = createSlice({
    name: 'templates',
    initialState,
    reducers: {
        getTemplatesRequest: (state: ITemplatesState) => {
            state.loading = true;
            state.loaded =  false
        },
        getTemplatesFailure: (state: ITemplatesState, action: {payload: string}) => {
            state.loading = false;
            state.loaded =  false
            state.errMsg = action.payload;
        },
        getTemplatesSuccess: (state: ITemplatesState, action: {payload: ITemplate[]}) => {
            state.loading = false;
            state.loaded =  true
            state.data = action.payload;
        },
        clearTemplatesState: (state: ITemplatesState) => {
            state.data = [],
            state.loading = true;
            state.loaded =  false
            state.errMsg = "";
        },
    },
});

export const { getTemplatesRequest, getTemplatesFailure, getTemplatesSuccess, clearTemplatesState } = templatesSlice.actions;

export const templates = templatesSlice.reducer