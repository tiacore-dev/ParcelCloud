import { delTypeEnum } from "../../../enumerations/delTypeEnum";
import { payTypeEnum } from "../../../enumerations/payTypeEnum";
import { IauthToken } from "../../../hooks/useAuth";
import { IParcelItem } from "../../../interfaces/parcels/IParcel";

export interface CreateParcelDto {
    authToken: IauthToken
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
    notification: boolean;
    items: IParcelItem[], 
}