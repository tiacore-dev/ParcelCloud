import { delTypeEnum } from "../../enumerations/delTypeEnum";
import { payTypeEnum } from "../../enumerations/payTypeEnum";

export type ParcelStatus =
  | "expected"
  | "general"
  | "delivered"
  | "canceled"
  | "in-progress";

export interface IParcelItem {
  weight: number;
  h: number;
  l: number;
  w: number;
  volume: number;
  qt: number;
  tWeight: number;
  tVolume: number;
  comment?: string;
}

export interface IParcelHistory {
  id?: string;
  date: string;
  type?: string;
  comment?: string;
  editable?: boolean;
}

export interface IParcel {
  id: string;
  date: number;
  number: string;
  customer: string;
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
  containerRent: boolean;
  items: IParcelItem[];
  history: IParcelHistory[];
  status: ParcelStatus;
  toDelivery?: boolean;
  toReceive?: boolean;
  toReceiveСonfirmed?: boolean;
}
