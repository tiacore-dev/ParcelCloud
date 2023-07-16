import { createSlice } from "@reduxjs/toolkit";
import { IParcelItem } from "../../../interfaces/parcels/IParcel";
import { payTypeEnum } from "../../../enumerations/payTypeEnum";
import { delTypeEnum } from "../../../enumerations/delTypeEnum";

export interface IEditableParcelState {
    sent: boolean,
    id?: string;
    number: string;
    sendCity: string;
    sendPerson: string;
    sendAddress: string;
    sendCompany: string;
    sendAddInfo: string;
    sendPhone: string;
    recCity: string;
    recPerson: string;
    recAddress: string;
    recCompany: string;
    recAddInfo: string;
    recPhone: string;
    qt: number;
    weight: number;
    volume: number;
    priceId?: string;
    cost: number;
    insureValue: number;
    COD: number;
    payType: keyof typeof payTypeEnum;
    delType: keyof typeof delTypeEnum;
    tMax: number;
    tMin: number;
    fragile: boolean;
    notification: boolean;
    items: IParcelItem[],
}

const initialItem: IParcelItem = {
    weight: 1,
    h: 10,
    l: 10,
    w: 10,
    volume: 0.2,
    qt: 1,
    tVolume: 0.2,
    tWeight: 1,
    comment: ''
}

const initialState: IEditableParcelState = {
    sent: false,
    id: undefined,
    number: '',
    sendCity: "",
    sendPerson: "",
    sendAddress: "",
    sendCompany: "",
    sendAddInfo: "",
    sendPhone: "",
    recCity: "",
    recPerson: "",
    recAddress: "",
    recCompany: "",
    recAddInfo: "",
    recPhone: "",
    qt: 1,
    weight: 1,
    volume: 0.2,
    priceId: "",
    cost: 0,
    insureValue: 0,
    COD: 0,
    payType: "БезналичнаяОплата",
    delType: "Стандарт",
    tMax: 0,
    tMin: 0,
    fragile: false,
    notification: false,
    items: [initialItem],
}

const editableParcelSlice = createSlice({
    name: 'parcel',
    initialState,
    reducers: {
        setSendCity: (state: IEditableParcelState, action: { payload: string }) => { state.sendCity = action.payload },
        setSendPerson: (state: IEditableParcelState, action: { payload: string }) => { state.sendPerson = action.payload },
        setSendAddress: (state: IEditableParcelState, action: { payload: string }) => { state.sendAddress = action.payload },
        setSendCompany: (state: IEditableParcelState, action: { payload: string }) => { state.sendCompany = action.payload },
        setSendAddInfo: (state: IEditableParcelState, action: { payload: string }) => { state.sendAddInfo = action.payload },
        setSendPhone: (state: IEditableParcelState, action: { payload: string }) => { state.sendPhone = action.payload },
        setRecCity: (state: IEditableParcelState, action: { payload: string }) => { state.recCity = action.payload },
        setRecPerson: (state: IEditableParcelState, action: { payload: string }) => { state.recPerson = action.payload },
        setRecAddress: (state: IEditableParcelState, action: { payload: string }) => { state.recAddress = action.payload },
        setRecCompany: (state: IEditableParcelState, action: { payload: string }) => { state.recCompany = action.payload },
        setRecAddInfo: (state: IEditableParcelState, action: { payload: string }) => { state.recAddInfo = action.payload },
        setCost: (state: IEditableParcelState, action: { payload: number }) => { state.cost = action.payload },
        setRecPhone: (state: IEditableParcelState, action: { payload: string }) => { state.recPhone = action.payload },
        setQt: (state: IEditableParcelState, action: { payload: number }) => { state.qt = action.payload },
        setPriceId: (state: IEditableParcelState, action: { payload: string }) => { state.priceId = action.payload },
        setPayType: (state: IEditableParcelState, action: { payload: keyof typeof payTypeEnum }) => { state.payType = action.payload },
        setDelType: (state: IEditableParcelState, action: { payload: keyof typeof delTypeEnum }) => { state.delType = action.payload },
        settMax: (state: IEditableParcelState, action: { payload: number }) => { state.tMax = action.payload },
        settMin: (state: IEditableParcelState, action: { payload: number }) => { state.tMin = action.payload },
        setInsureValue: (state: IEditableParcelState, action: { payload: number }) => { state.insureValue = action.payload },
        toggleFragile: (state: IEditableParcelState) => { state.fragile = !state.fragile },
        toggleNotification: (state: IEditableParcelState) => { state.notification = !state.notification },
        addItem: (state: IEditableParcelState) => {
            state.items = [...state.items, { ...initialItem } as IParcelItem]
            state.qt = state.items.length
            state.weight = state.items.reduce((weight: number, item: IParcelItem) => (weight + item.tWeight || 0), 0)
            state.volume = state.items.reduce((volume: number, item: IParcelItem) => (volume + item.tVolume || 0), 0)
        },
        deleteItem: (state: IEditableParcelState, action: { payload: number }) => {
            state.items = state.items.filter((item, index) => index !== action.payload)
            state.qt = state.items.length
            state.weight = state.items.reduce((weight: number, item: IParcelItem) => (weight + item.tWeight || 0), 0)
            state.volume = state.items.reduce((volume: number, item: IParcelItem) => (volume + item.tVolume || 0), 0)
        },
        editItemWeight: (state: IEditableParcelState, action: { payload: { index: number, value: number } }) => {
            state.items = state.items.map((item, index) => index === action.payload.index ? { ...item, weight: action.payload.value, tWeight: Number((action.payload.value * item.qt).toFixed(3)) } : item)
            state.weight = state.items.reduce((weight: number, item: IParcelItem) => (weight + item.tWeight || 0), 0)
        },
        editItemL: (state: IEditableParcelState, action: { payload: { index: number, value: number } }) => {
            state.items = state.items.map((item, index) => {
                if (index === action.payload.index) {
                    const l = action.payload.value
                    const volume = item.h * item.w * l / 5000 || 0 
                    const tVolume = Number((volume * item.qt).toFixed(3))
                    return { ...item, l, volume, tVolume}
                }
                return item

            })
            state.volume = state.items.reduce((volume: number, item: IParcelItem) => (volume + item.tVolume || 0), 0)
        },
        editItemW: (state: IEditableParcelState, action: { payload: { index: number, value: number } }) => {
            state.items = state.items.map((item, index) => {
                if (index === action.payload.index) {
                    const w = action.payload.value
                    const volume = item.h * w * item.l / 5000 || 0 
                    const tVolume = Number((volume * item.qt).toFixed(3))
                    return { ...item, w, volume, tVolume}
                }
                return item

            })
            state.volume = state.items.reduce((volume: number, item: IParcelItem) => (volume + item.tVolume || 0), 0)
        },
        editItemH: (state: IEditableParcelState, action: { payload: { index: number, value: number } }) => {
            state.items = state.items.map((item, index) => {
                if (index === action.payload.index) {
                    const h = action.payload.value
                    const volume = h * item.w * item.l / 5000 || 0 
                    const tVolume = Number((volume * item.qt).toFixed(3))
                    return { ...item, h, volume, tVolume}
                }
                return item

            })
            state.volume = state.items.reduce((volume: number, item: IParcelItem) => (volume + item.tVolume || 0), 0)
        },
        editItemQt: (state: IEditableParcelState, action: { payload: { index: number, value: number } }) => {
            state.items = state.items.map((item, index) => index === action.payload.index ?
                { 
                    ...item, 
                    qt: action.payload.value, 
                    tVolume:  Number((item.volume * action.payload.value).toFixed(3)), 
                    tWeight: Number((item.weight * action.payload.value).toFixed(3)) 
                }
                : item)
            state.volume = state.items.reduce((volume: number, item: IParcelItem) => (volume + item.tVolume || 0), 0)
            state.weight = state.items.reduce((weight: number, item: IParcelItem) => (weight + item.tWeight || 0), 0)

        },
        sendParcel: (state: IEditableParcelState) => { state.sent = true },
        savedParcel: (state: IEditableParcelState, action: { payload: { number: string, id: string } }) => { state.id = action.payload.id, state.number = action.payload.number },


        clearCreateParcelState: (state: IEditableParcelState) => {
            state.sent = initialState.sent
            state.id = initialState.id
            state.number = initialState.number
            state.sendCity = initialState.sendCity
            state.sendPerson = initialState.sendPerson
            state.sendAddress = initialState.sendAddress
            state.sendCompany = initialState.sendCompany
            state.sendAddInfo = initialState.sendAddInfo
            state.sendPhone = initialState.sendPhone
            state.recCity = initialState.recCity
            state.recPerson = initialState.recPerson
            state.recAddress = initialState.recAddress
            state.recCompany = initialState.recCompany
            state.recAddInfo = initialState.recAddInfo
            state.recPhone = initialState.recPhone
            state.qt = initialState.qt
            state.weight = initialState.weight
            state.volume = initialState.volume
            state.priceId = initialState.priceId
            state.cost = initialState.cost
            state.insureValue = initialState.insureValue
            state.COD = initialState.COD
            state.payType = initialState.payType
            state.delType = initialState.delType
            state.tMax = initialState.tMax
            state.tMin = initialState.tMin
            state.fragile = initialState.fragile
            state.notification = initialState.notification
            state.items = initialState.items

        }
    }
}
)

export const {clearCreateParcelState, ...editParcel} = editableParcelSlice.actions;

export const editableParcel = editableParcelSlice.reducer