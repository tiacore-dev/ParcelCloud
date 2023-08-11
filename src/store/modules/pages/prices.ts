import { createSlice } from "@reduxjs/toolkit";
import { IParcelItem } from "../../../interfaces/parcels/IParcel";
import { IPrice } from "../../../interfaces/prices/IPrice";
import { GetParcelResponce } from "../../../pages/prices/prices";

const initialItem: IParcelItem = {
    weight: 1,
    h: 10,
    l: 10,
    w: 10,
    volume: 0.2,
    qt: 1,
    tVolume: 0.2,
    tWeight: 1
}

export interface IPricesState {
    loading: boolean;
    loaded: boolean;
    sendCity: string;
    recCity: string;
    weight: number;
    volume: number;
    qt: number;
    tMin: number;
    tMax: number;
    items: IParcelItem[];
    prices: IPrice[]
    temperatureModify: number;
    vatExtra: boolean;
    bonusModify: number;
}


const initialState: IPricesState = {
    loading: false,
    loaded: false,
    sendCity: "",
    recCity: "",
    weight: 1,
    volume: 0.2,
    qt: 1,
    tMin: 0,
    tMax: 0,
    items: [initialItem],
    prices: [],
    temperatureModify: 0,
    vatExtra: false,
    bonusModify: 0,
}

const pricesSlice = createSlice({
    name: 'prices',
    initialState,
    reducers: {

        setSendCity: (state: IPricesState, action: { payload: string }) => { state.sendCity = action.payload },
        setRecCity: (state: IPricesState, action: { payload: string }) => { state.recCity = action.payload },
        settMax: (state: IPricesState, action: { payload: number }) => { state.tMax = action.payload },
        settMin: (state: IPricesState, action: { payload: number }) => { state.tMin = action.payload },
        addItem: (state: IPricesState) => {
            state.items = [...state.items, { ...initialItem } as IParcelItem]
            state.qt = state.items.length
            state.weight = state.items.reduce((weight: number, item: IParcelItem) => (weight + item.tWeight || 0), 0)
            state.volume = state.items.reduce((volume: number, item: IParcelItem) => (volume + item.tVolume || 0), 0)
        },
        deleteItem: (state: IPricesState, action: { payload: number }) => {
            state.items = state.items.filter((item, index) => index !== action.payload)
            state.qt = state.items?.length
            state.weight = state.items.reduce((weight: number, item: IParcelItem) => (weight + item.tWeight || 0), 0)
            state.volume = state.items.reduce((volume: number, item: IParcelItem) => (volume + item.tVolume || 0), 0)
        },
        editItemWeight: (state: IPricesState, action: { payload: { index: number, value: number } }) => {
            state.items = state.items.map((item, index) => index === action.payload.index ? { ...item, weight: action.payload.value, tWeight: Number((action.payload.value * item.qt).toFixed(3)) } : item)
            state.weight = state.items.reduce((weight: number, item: IParcelItem) => (weight + item.tWeight || 0), 0)
        },
        editItemL: (state: IPricesState, action: { payload: { index: number, value: number } }) => {
            state.items = state.items.map((item, index) => {
                if (index === action.payload.index) {
                    const l = action.payload.value
                    const volume = item.h * item.w * l / 5000 || 0
                    const tVolume = Number((volume * item.qt).toFixed(3))
                    return { ...item, l, volume, tVolume }
                }
                return item

            })
            state.volume = state.items.reduce((volume: number, item: IParcelItem) => (volume + item.tVolume || 0), 0)
        },
        editItemW: (state: IPricesState, action: { payload: { index: number, value: number } }) => {
            state.items = state.items.map((item, index) => {
                if (index === action.payload.index) {
                    const w = action.payload.value
                    const volume = item.h * w * item.l / 5000 || 0
                    const tVolume = Number((volume * item.qt).toFixed(3))
                    return { ...item, w, volume, tVolume }
                }
                return item

            })
            state.volume = state.items.reduce((volume: number, item: IParcelItem) => (volume + item.tVolume || 0), 0)
        },
        editItemH: (state: IPricesState, action: { payload: { index: number, value: number } }) => {
            state.items = state.items.map((item, index) => {
                if (index === action.payload.index) {
                    const h = action.payload.value
                    const volume = h * item.w * item.l / 5000 || 0
                    const tVolume = Number((volume * item.qt).toFixed(3))
                    return { ...item, h, volume, tVolume }
                }
                return item

            })
            state.volume = state.items.reduce((volume: number, item: IParcelItem) => (volume + item.tVolume || 0), 0)
        },
        editItemQt: (state: IPricesState, action: { payload: { index: number, value: number } }) => {
            state.items = state.items.map((item, index) => index === action.payload.index ?
                {
                    ...item,
                    qt: action.payload.value,
                    tVolume: Number((item.volume * action.payload.value).toFixed(3)),
                    tWeight: Number((item.weight * action.payload.value).toFixed(3))
                }
                : item)
            state.volume = state.items.reduce((volume: number, item: IParcelItem) => (volume + item.tVolume || 0), 0)
            state.weight = state.items.reduce((weight: number, item: IParcelItem) => (weight + item.tWeight || 0), 0)

        },

        getPricesRequest: (state: IPricesState) => {
            state.loading = true;
            state.loaded = false
        },
        getPricesFailure: (state: IPricesState, action: { payload: string }) => {
            state.loading = false;
            state.loaded = false
        },
        getPricesSuccess: (state: IPricesState, action: { payload: GetParcelResponce }) => {
            state.loading = false;
            state.loaded = true
            state.prices = action.payload.prices;
            state.temperatureModify = action.payload.temperatureModify;
            state.vatExtra = action.payload.vatExtra;
            state.bonusModify = action.payload.bonusModify;

        },
        clearPricesState: (state: IPricesState) => {
            state.loaded = false;
            state.loading = false;
            state.sendCity = "";
            state.recCity = "";
            state.weight = 1;
            state.volume = 0.2;
            state.qt = 1;
            state.tMax = 0;
            state.tMin = 0;
            state.items = [initialItem],
            state.prices = [];
        },
    },
});

export const { getPricesRequest, getPricesFailure, getPricesSuccess, clearPricesState, ...editPrices } = pricesSlice.actions;

export const prices = pricesSlice.reducer