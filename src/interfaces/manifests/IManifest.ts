import { IParcelsList } from "../parcels/IParcelsList";

export interface IManifest {
  id: string;
  number: string;
  date: string;
  sendCompany: string;
  sendCity: string;
  recCompany: string;
  recCity: string;
  manifestNumber: string;
  manifestCompany: string;
  delDate: string;
  qtParcels: number;
  qtItems: number;
  weight: number;
  volume: number;
  parcels: IParcelsList[];
  colmplited: boolean;
  delivered: boolean;
}
