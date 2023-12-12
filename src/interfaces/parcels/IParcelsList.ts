import { ParcelStatus } from "./IParcel";

export interface IParcelsList {
  id: string;
  date: string;
  planDate: string | undefined;
  customer: string;
  number: string;
  recCity: string;
  recAddress: string;
  recCompany: string;
  sendCity: string;
  sendAddress: string;
  sendCompany: string;
  recAddInfo?: string;
  qt: number;
  weight: number;
  volume: number;
  price?: number;
  status?: ParcelStatus;
  statusType?: string;
  statusValue?: string;
  statusDate?: string;
}

export interface IParcelsListColumn extends IParcelsList {
  key: string;
}

export interface IParcelsAsignedList extends IParcelsList {
  toDelivery: boolean;
  toReceive: boolean;
  recTime: string;
  sendTime: string;
  delDate: string;
}

export interface IParcelsAsignedListColumn extends IParcelsAsignedList {
  key: string;
}

export interface IParcelsInStorageList extends IParcelsList {
  toDelivery: boolean;
  toReceive: boolean;
  myOwn: boolean;
}

export interface IParcelsInStorageListColumn extends IParcelsInStorageList {
  key: string;
}
