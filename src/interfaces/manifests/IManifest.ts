import { IParcelsList } from "../parcels/IParcelsList";

type ManifestType = "incoming" | "outgoing";

export interface IManifest {
  id: string;
  number: string;
  date: string;
  sendCompany: string;
  sendCity: string;
  recCompany: string;
  recCity: string;
  transferNumber: string;
  manifestCompany: string;
  delDate: string;
  qtParcels: number;
  qtItems: number;
  weight: number;
  volume: number;
  parcels: IParcelsList[];
  colmplited: boolean;
  delivered: boolean;
  sent: boolean;
  type: ManifestType;
  planDate: string;
}
