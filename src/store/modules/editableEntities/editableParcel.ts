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
  orderNumber: "",
  planDate: "",
  customer: "",
  payer: undefined,
  sendCity: "",
  sendPerson: "",
  sendAddress: "",
  sendCompany: "",
  sendAddInfo: "",
  sendPhone: "",
  sendTime: "",
  recCity: "",
  recPerson: "",
  recAddress: "",
  recCompany: "",
  recAddInfo: "",
  recPhone: "",
  recTime: "",
  description: "",
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

const setParcelData = (
  state: IEditableParcelState,
  parcelData: Partial<IParcel>,
) => {
  state.id = parcelData.id;
  state.date = parcelData.date;
  state.number = parcelData.number;
  state.orderNumber = parcelData.orderNumber;
  state.customer = parcelData.customer;
  state.payer = undefined;
  state.sendCity = parcelData.sendCity;
  state.sendPerson = parcelData.sendPerson;
  state.sendAddress = parcelData.sendAddress;
  state.sendCompany = parcelData.sendCompany;
  state.sendAddInfo = parcelData.sendAddInfo;
  state.sendPhone = parcelData.sendPhone;
  state.sendTime = parcelData.sendTime;
  state.recCity = parcelData.recCity;
  state.recPerson = parcelData.recPerson;
  state.recAddress = parcelData.recAddress;
  state.recCompany = parcelData.recCompany;
  state.recAddInfo = parcelData.recAddInfo;
  state.recPhone = parcelData.recPhone;
  state.recTime = parcelData.recTime;
  state.description = parcelData.description;
  state.qt = parcelData.qt;
  state.weight = parcelData.weight;
  state.volume = parcelData.volume;
  state.priceId = parcelData.priceId;
  state.cost = parcelData.cost;
  state.insureValue = parcelData.insureValue;
  state.COD = parcelData.COD;
  state.payType = parcelData.payType;
  state.delType = parcelData.delType;
  state.tMax = parcelData.tMax;
  state.tMin = parcelData.tMin;
  state.fragile = parcelData.fragile;
  state.containerRent = parcelData.containerRent;
  state.items = parcelData.items;
  state.sent = false;
};

const editableParcelSlice = createSlice({
  name: "parcel",
  initialState,
  reducers: {
    setParcelData: (
      state: IEditableParcelState,
      action: { payload: IParcel },
    ) => {
      setParcelData(state, action.payload);
    },

    setCopyParcelData: (
      state: IEditableParcelState,
      action: { payload: IParcel },
    ) => {
      setParcelData(state, {
        ...action.payload,
        id: initialState.id,
        date: initialState.date,
      });
    },

    setNumber: (state: IEditableParcelState, action: { payload: string }) => {
      state.number = action.payload;
    },

    setOrderNumber: (
      state: IEditableParcelState,
      action: { payload: string },
    ) => {
      state.orderNumber = action.payload;
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
    setSendTime: (state: IEditableParcelState, action: { payload: string }) => {
      state.sendTime = action.payload;
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
    setRecTime: (state: IEditableParcelState, action: { payload: string }) => {
      state.recTime = action.payload;
    },
    setDescription: (
      state: IEditableParcelState,
      action: { payload: string },
    ) => {
      state.description = action.payload;
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
    copyItem: (state: IEditableParcelState, action: { payload: number }) => {
      state.items.push({ ...state.items[action.payload] });
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
      state.id = action.payload.id;
      state.number = action.payload.number;
      state.sent = false;
    },
    saveError: (state: IEditableParcelState) => {
      state.sent = false;
    },

    clearCreateParcelState: (state: IEditableParcelState) => {
      setParcelData(state, initialState);
    },
  },
});

export const { clearCreateParcelState, ...editParcelAction } =
  editableParcelSlice.actions;

export const editableParcel = editableParcelSlice.reducer;
