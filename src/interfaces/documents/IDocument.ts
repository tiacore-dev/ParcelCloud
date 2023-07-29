

export interface IDocumentParcel {
    id: string;
    number: string;
    date: string;
    sendCity: string;
    sendAddress: string;
    sendCompany: string;
    recCity: string;
    recAddress: string;
    recCompany: string;
    qt: number;
    weight: number;
    volume: number;
    summ: number;
}

export interface IDocument {
    id: string;
    number: string;
    date: string;
    customer: string;
    customerAddress?: string;
    customerInn?: string;
    customerKpp?: string;
    performer: string;
    performerAddress?: string;
    performerInn?: string;
    performerKpp?: string;
    summ: number;
    vat: number;
    info?: string;
    comment: string;
    parcels?: IDocumentParcel[]
}

