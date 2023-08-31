import { delTypeEnum } from "../../enumerations/delTypeEnum";

export interface IPrice {
  time: string;
  delType: keyof typeof delTypeEnum;
  costs: ICost[];
}

export interface ICost {
  from: number;
  to: number;
  summ: number;
  extra: number;
  extraSumm: number;
}
