import { delTypeEnum } from "../../enumerations/delTypeEnum";
import { payTypeEnum } from "../../enumerations/payTypeEnum";

export type ParcelStatus =
  | "expected"
  | "availableToReceive"
  | "general"
  | "delivered"
  | "canceled"
  | "in-progress"
  | "availableToSend"
  | "sent";

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
  planDate: string | undefined;
  number: string;
  orderNumber?: string;
  customer: string;
  payer?: string;
  sendCity: string;
  sendPerson: string;
  sendAddress: string;
  sendCompany: string;
  sendAddInfo: string;
  sendPhone: string;
  sendTime: string;
  recCity: string;
  recPerson: string;
  recAddress: string;
  recCompany: string;
  recAddInfo: string;
  recPhone: string;
  recTime: string;
  description: string;
  qt: number;
  weight: number;
  volume: number;
  priceId?: string;
  cost?: number;
  price?: number;
  days?: string;
  insureValue: number;
  COD: number;
  payType: keyof typeof payTypeEnum;
  delType: keyof typeof delTypeEnum;
  tMax: number;
  tMin: number;
  fragile: boolean;
  returnParcel?: boolean;
  containerRent: boolean;
  items: IParcelItem[];
  history: IParcelHistory[];
  status: ParcelStatus;
  deletionAvailable?: boolean;
  toDelivery?: boolean;
  toReceive?: boolean;
  toReceiveСonfirmed?: boolean;
}
