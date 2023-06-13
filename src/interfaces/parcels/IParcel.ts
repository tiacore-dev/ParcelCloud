

export interface IParcelItem {
    weight: number;
    h: number;
    l: number;
    w: number;
    volume: number;
    qt: number;
    tWeight: number;
    tVolume: number;
    comment: string;
}

export interface IParcelHistory {
    date: string;
    type?: string;
    comment?: string;
}

export interface IParcel {
    id: string;
    number: string;
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
    insuranceValue: number;
    COD: number;
    payMethod: string;
    delType: string;
    tempMax: number;
    tempMin: number;
    fragile: boolean;
    items: IParcelItem[],
    history: IParcelHistory[]
}

