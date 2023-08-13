import { createSlice } from "@reduxjs/toolkit";
import { ITemplate } from "../../../interfaces/templates/ITemplate";


interface ITemplateState extends ITemplate{
 
}


const initialState: ITemplateState = {
    id: undefined,
    key: 0,
    name: "",
    city: "",
    address: "",
    phone: "",
    person: "",
    company: "",
    addInfo: "",
}

const templateSlice = createSlice({
    name: 'template',
    initialState,
    reducers: {
       
        setTemplatStateData: (state: ITemplateState, action: {payload: ITemplate}) => {
            state.id =  action.payload.id
            state.name = action.payload.name
            state.city = action.payload.city
            state.address = action.payload.address
            state.person = action.payload.person
            state.phone = action.payload.phone
            state.company = action.payload.company
            state.addInfo = action.payload.addInfo
        },

        setTemplatStateName: (state: ITemplateState, action: {payload: string}) => {
            state.name = action.payload
        },

        setTemplatStateCity: (state: ITemplateState, action: {payload: string}) => {
            state.city = action.payload
        },

        setTemplatStateAddress: (state: ITemplateState, action: {payload: string}) => {
            state.address = action.payload
        },

        setTemplatStatePhone: (state: ITemplateState, action: {payload: string}) => {
            state.phone = action.payload
        },

        setTemplatStatePerson: (state: ITemplateState, action: {payload: string}) => {
            state.person = action.payload
        },

        setTemplatStateCompany: (state: ITemplateState, action: {payload: string}) => {
            state.company = action.payload
        },

        setTemplatStateAddInfo: (state: ITemplateState, action: {payload: string}) => {
            state.addInfo = action.payload
        },
        
        clearTemplateState: (state: ITemplateState) => {
            state.id =  undefined
            state.name = ""
            state.city = ""
            state.address = ""
            state.phone = ""
            state.person = ""
            state.company = ""
            state.addInfo = ""
        },
    },
});

export const {clearTemplateState, setTemplatStateData, ...editTemplate} = templateSlice.actions;

export const template = templateSlice.reducer