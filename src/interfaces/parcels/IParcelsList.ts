import React from "react";
import { ParcelStatus } from "./IParcel";

export interface IParcelsList {
  id: string;
  date: string;
  planDate: string | undefined;
  customer: string;
  number: string;
  orderNumber?: string;
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
  cost?: number;
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
  received: boolean;
  recTime: string;
  sendTime: string;
  delDate: string;
}

export interface IParcelsAsignedListColumn extends IParcelsAsignedList {
  key: string;
}

export interface IParcelsInStorageList extends IParcelsList {
  aptdPartner?: string;
  aptdTransfer?: string;
  internalInformation?: string;
  toDelivery: boolean;
  toReceive: boolean;
  myOwn: boolean;
}

export interface IParcelsInStorageListColumn extends IParcelsInStorageList {
  key: string;
}

export interface IParcelsAsignedGroup {
  customer: string;
  sendCity?: string;
  sendAddress?: string;
  sendCompany?: string;
  sendTime?: string;
  recCity?: string;
  recAddress?: string;
  recCompany?: string;
  recTime?: string;
  toDelivery: boolean;
  toReceive: boolean;
  received: boolean;
}

export interface IParcelsAsignedGroupColumn extends IParcelsAsignedGroup {
  key: React.Key;
}
