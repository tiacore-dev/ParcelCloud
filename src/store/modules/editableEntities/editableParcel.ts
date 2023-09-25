import { createSlice } from "@reduxjs/toolkit";
import { IParcel, IParcelItem } from "../../../interfaces/parcels/IParcel";
import { payTypeEnum } from "../../../enumerations/payTypeEnum";
import { delTypeEnum } from "../../../enumerations/delTypeEnum";

export interface IEditableParcelState
  extends Omit<IParcel, "history" | "status" | "toDelivery" | "toReceive"> {
  sent: boolean;
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
  comment: "",
};

const initialState: IEditableParcelState = {
  sent: false,
  id: undefined,
  number: "",
  customer: "",
  payer: undefined,
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
  containerRent: false,
  date: Date.now(),
  items: [initialItem],
};

const editableParcelSlice = createSlice({
  name: "parcel",
  initialState,
  reducers: {
    setParcelData: (
      state: IEditableParcelState,
      action: { payload: IParcel },
    ) => {
      state.id = action.payload.id;
      state.number = action.payload.number;
      state.customer = action.payload.customer;
      state.sendCity = action.payload.sendCity;
      state.sendPerson = action.payload.sendPerson;
      state.sendAddress = action.payload.sendAddress;
      state.sendCompany = action.payload.sendCompany;
      state.sendAddInfo = action.payload.sendAddInfo;
      state.sendPhone = action.payload.sendPhone;
      state.recCity = action.payload.recCity;
      state.recPerson = action.payload.recPerson;
      state.recAddress = action.payload.recAddress;
      state.recCompany = action.payload.recCompany;
      state.recAddInfo = action.payload.recAddInfo;
      state.recPhone = action.payload.recPhone;
      state.qt = action.payload.qt;
      state.weight = action.payload.weight;
      state.volume = action.payload.volume;
      state.priceId = action.payload.priceId;
      state.cost = action.payload.cost;
      state.insureValue = action.payload.insureValue;
      state.COD = action.payload.COD;
      state.payType = action.payload.payType;
      state.delType = action.payload.delType;
      state.tMax = action.payload.tMax;
      state.tMin = action.payload.tMin;
      state.fragile = action.payload.fragile;
      state.containerRent = action.payload.containerRent;
      state.date = action.payload.date;
      state.items = action.payload.items;
    },

    setSendCity: (state: IEditableParcelState, action: { payload: string }) => {
      state.sendCity = action.payload;
    },
    setSendPerson: (
      state: IEditableParcelState,
      action: { payload: string },
    ) => {
      state.sendPerson = action.payload;
    },
    setSendAddress: (
      state: IEditableParcelState,
      action: { payload: string },
    ) => {
      state.sendAddress = action.payload;
    },
    setSendCompany: (
      state: IEditableParcelState,
      action: { payload: string },
    ) => {
      state.sendCompany = action.payload;
    },
    setSendAddInfo: (
      state: IEditableParcelState,
      action: { payload: string },
    ) => {
      state.sendAddInfo = action.payload;
    },
    setSendPhone: (
      state: IEditableParcelState,
      action: { payload: string },
    ) => {
      state.sendPhone = action.payload;
    },
    setRecCity: (state: IEditableParcelState, action: { payload: string }) => {
      state.recCity = action.payload;
    },
    setRecPerson: (
      state: IEditableParcelState,
      action: { payload: string },
    ) => {
      state.recPerson = action.payload;
    },
    setRecAddress: (
      state: IEditableParcelState,
      action: { payload: string },
    ) => {
      state.recAddress = action.payload;
    },
    setRecCompany: (
      state: IEditableParcelState,
      action: { payload: string },
    ) => {
      state.recCompany = action.payload;
    },
    setRecAddInfo: (
      state: IEditableParcelState,
      action: { payload: string },
    ) => {
      state.recAddInfo = action.payload;
    },
    setCost: (state: IEditableParcelState, action: { payload: number }) => {
      state.cost = action.payload;
    },
    setCustomer: (state: IEditableParcelState, action: { payload: string }) => {
      state.customer = action.payload;
    },
    setPayer: (state: IEditableParcelState, action: { payload: string }) => {
      state.payer = action.payload;
    },
    setRecPhone: (state: IEditableParcelState, action: { payload: string }) => {
      state.recPhone = action.payload;
    },
    setQt: (state: IEditableParcelState, action: { payload: number }) => {
      state.qt = action.payload;
    },
    setPriceId: (state: IEditableParcelState, action: { payload: string }) => {
      state.priceId = action.payload;
    },
    setPayType: (
      state: IEditableParcelState,
      action: { payload: keyof typeof payTypeEnum },
    ) => {
      state.payType = action.payload;
    },
    setDelType: (
      state: IEditableParcelState,
      action: { payload: keyof typeof delTypeEnum },
    ) => {
      state.delType = action.payload;
    },
    settMax: (state: IEditableParcelState, action: { payload: number }) => {
      state.tMax = action.payload;
    },
    settMin: (state: IEditableParcelState, action: { payload: number }) => {
      state.tMin = action.payload;
    },
    setInsureValue: (
      state: IEditableParcelState,
      action: { payload: number },
    ) => {
      state.insureValue = action.payload;
    },
    setDate: (state: IEditableParcelState, action: { payload: number }) => {
      state.date = action.payload;
    },
    toggleFragile: (state: IEditableParcelState) => {
      state.fragile = !state.fragile;
    },
    toggleContainerRent: (state: IEditableParcelState) => {
      state.containerRent = !state.containerRent;
    },
    setItems: (
      state: IEditableParcelState,
      action: { payload: IParcelItem[] },
    ) => {
      state.items = action.payload;
      state.qt = state.items.reduce(
        (qt: number, item: IParcelItem) => qt + item.qt || 0,
        0,
      );
      state.weight = state.items.reduce(
        (weight: number, item: IParcelItem) => weight + item.tWeight || 0,
        0,
      );
      state.volume = state.items.reduce(
        (volume: number, item: IParcelItem) => volume + item.tVolume || 0,
        0,
      );
    },
    addItem: (state: IEditableParcelState) => {
      state.items = [...state.items, { ...initialItem } as IParcelItem];
      state.qt = state.items.reduce(
        (qt: number, item: IParcelItem) => qt + item.qt || 0,
        0,
      );
      state.weight = state.items.reduce(
        (weight: number, item: IParcelItem) => weight + item.tWeight || 0,
        0,
      );
      state.volume = state.items.reduce(
        (volume: number, item: IParcelItem) => volume + item.tVolume || 0,
        0,
      );
    },
    deleteItem: (state: IEditableParcelState, action: { payload: number }) => {
      state.items = state.items.filter(
        (item, index) => index !== action.payload,
      );
      state.qt = state.items.reduce(
        (qt: number, item: IParcelItem) => qt + item.qt || 0,
        0,
      );
      state.weight = state.items.reduce(
        (weight: number, item: IParcelItem) => weight + item.tWeight || 0,
        0,
      );
      state.volume = state.items.reduce(
        (volume: number, item: IParcelItem) => volume + item.tVolume || 0,
        0,
      );
    },
    editItemWeight: (
      state: IEditableParcelState,
      action: { payload: { index: number; value: number } },
    ) => {
      state.items = state.items.map((item, index) =>
        index === action.payload.index
          ? {
              ...item,
              weight: action.payload.value,
              tWeight: Number((action.payload.value * item.qt).toFixed(3)),
            }
          : item,
      );
      state.weight = state.items.reduce(
        (weight: number, item: IParcelItem) => weight + item.tWeight || 0,
        0,
      );
    },
    editItemL: (
      state: IEditableParcelState,
      action: { payload: { index: number; value: number } },
    ) => {
      state.items = state.items.map((item, index) => {
        if (index === action.payload.index) {
          const l = action.payload.value;
          const volume = (item.h * item.w * l) / 5000 || 0;
          const tVolume = Number((volume * item.qt).toFixed(3));
          return { ...item, l, volume, tVolume };
        }
        return item;
      });
      state.volume = state.items.reduce(
        (volume: number, item: IParcelItem) => volume + item.tVolume || 0,
        0,
      );
    },
    editItemW: (
      state: IEditableParcelState,
      action: { payload: { index: number; value: number } },
    ) => {
      state.items = state.items.map((item, index) => {
        if (index === action.payload.index) {
          const w = action.payload.value;
          const volume = (item.h * w * item.l) / 5000 || 0;
          const tVolume = Number((volume * item.qt).toFixed(3));
          return { ...item, w, volume, tVolume };
        }
        return item;
      });
      state.volume = state.items.reduce(
        (volume: number, item: IParcelItem) => volume + item.tVolume || 0,
        0,
      );
    },
    editItemH: (
      state: IEditableParcelState,
      action: { payload: { index: number; value: number } },
    ) => {
      state.items = state.items.map((item, index) => {
        if (index === action.payload.index) {
          const h = action.payload.value;
          const volume = (h * item.w * item.l) / 5000 || 0;
          const tVolume = Number((volume * item.qt).toFixed(3));
          return { ...item, h, volume, tVolume };
        }
        return item;
      });
      state.volume = state.items.reduce(
        (volume: number, item: IParcelItem) => volume + item.tVolume || 0,
        0,
      );
    },
    editItemQt: (
      state: IEditableParcelState,
      action: { payload: { index: number; value: number } },
    ) => {
      state.items = state.items.map((item, index) =>
        index === action.payload.index
          ? {
              ...item,
              qt: action.payload.value,
              tVolume: Number((item.volume * action.payload.value).toFixed(3)),
              tWeight: Number((item.weight * action.payload.value).toFixed(3)),
            }
          : item,
      );
      state.volume = state.items.reduce(
        (volume: number, item: IParcelItem) => volume + item.tVolume || 0,
        0,
      );
      state.weight = state.items.reduce(
        (weight: number, item: IParcelItem) => weight + item.tWeight || 0,
        0,
      );
      state.qt = state.items.reduce(
        (qt: number, item: IParcelItem) => qt + item.qt || 0,
        0,
      );
    },
    sendParcel: (state: IEditableParcelState) => {
      state.sent = true;
    },
    savedParcel: (
      state: IEditableParcelState,
      action: { payload: { number: string; id: string } },
    ) => {
      (state.id = action.payload.id), (state.number = action.payload.number);
    },

    clearCreateParcelState: (state: IEditableParcelState) => {
      state.sent = initialState.sent;
      state.id = initialState.id;
      state.customer = initialState.customer;
      state.number = initialState.number;
      state.sendCity = initialState.sendCity;
      state.sendPerson = initialState.sendPerson;
      state.sendAddress = initialState.sendAddress;
      state.sendCompany = initialState.sendCompany;
      state.sendAddInfo = initialState.sendAddInfo;
      state.sendPhone = initialState.sendPhone;
      state.recCity = initialState.recCity;
      state.recPerson = initialState.recPerson;
      state.recAddress = initialState.recAddress;
      state.recCompany = initialState.recCompany;
      state.recAddInfo = initialState.recAddInfo;
      state.recPhone = initialState.recPhone;
      state.qt = initialState.qt;
      state.weight = initialState.weight;
      state.volume = initialState.volume;
      state.priceId = initialState.priceId;
      state.cost = initialState.cost;
      state.insureValue = initialState.insureValue;
      state.COD = initialState.COD;
      state.payType = initialState.payType;
      state.delType = initialState.delType;
      state.tMax = initialState.tMax;
      state.tMin = initialState.tMin;
      state.fragile = initialState.fragile;
      state.containerRent = initialState.containerRent;
      state.items = initialState.items;
      state.payer = initialState.payer;
    },
  },
});

export const { clearCreateParcelState, ...editParcel } =
  editableParcelSlice.actions;

export const editableParcel = editableParcelSlice.reducer;
