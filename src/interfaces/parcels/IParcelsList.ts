export type ITaskType = "deliver" | "receive";

export interface IParcelsList {
  id: string;
  date: string;
  customer: string;
  number: string;
  recCity: string;
  recAddress: string;
  recCompany: string;
  sendCity: string;
  sendAddress: string;
  sendCompany: string;
  qt: number;
  weight: number;
  volume: number;
  price?: number;
  statusType?: string;
  statusValue?: string;
  statusDate?: string;
}

export interface IParcelsListColumn extends IParcelsList {
  key: string;
}

export interface IParcelsAsignedList extends IParcelsList {
  taskType: ITaskType;
  recTime: string;
  sendTime: string;
  delDate: string;
}

export interface IParcelsAsignedListColumn extends IParcelsAsignedList {
  key: string;
}
