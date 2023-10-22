export interface IDocumentsList {
  id: string;
  date: string;
  number: string;
  customer: string;
  customerInn: string;
  customerKpp: string;
  performer: string;
  performerInn: string;
  performerKpp: string;
  viewed: boolean;
  summ: number;
  vat: number;
}

export interface IDocumentsListColumn extends IDocumentsList {
  key: string;
}
