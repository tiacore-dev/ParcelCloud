import { delTypeEnum } from "../../../enumerations/delTypeEnum";
import { IauthToken } from "../../../hooks/useAuth";

export interface CalculateDto {
    authToken: IauthToken
    sendCity: string;
    recCity: string;
    weight: number;
    delType: keyof typeof delTypeEnum;
    temperature: boolean
}