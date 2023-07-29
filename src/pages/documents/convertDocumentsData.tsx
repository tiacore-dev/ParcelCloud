import * as React from 'react';
import { IDocumentsCovertedData } from "./documents";
import { dateToLocalString } from '../../utils/dateConverter';
import { IDocumentsList } from '../../interfaces/documents/IDocumentsList';


export const convertDocumentsData = (data: IDocumentsList[]): IDocumentsCovertedData[] => {

    return data.map((document) => {


        const number = (<>
            <div>
                {document.number}
            </div>
            <div>
                от {dateToLocalString(document.date)}
            </div>
        </>)
        const customer = (<>
            <div>
                {document.customer}
            </div>
            <div>
                ИНН {document.customerInn} {!!document.customerKpp && ` КПП ${document.customerKpp}`}
            </div>

        </>)
        const performer = (<>
            <div>
                {document.performer}
            </div>
            <div>
                ИНН {document.performerInn} {!!document.performerKpp && ` КПП ${document.performerKpp}`}
            </div>
        </>)
        const summ = (<>
            <div>
                {document.summ.toFixed(2)} руб.
            </div>
           {!!document.vat &&  <div>
                в том числе НДС
            </div>}
        </>)

        return {
            key: document.id,
            number,
            customer,
            performer,
            summ
        }
    })
}