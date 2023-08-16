import * as React from 'react';
import { IDocumentsCovertedData } from "./documents";
import { dateToLocalString } from '../../utils/dateConverter';
import { IDocumentsList } from '../../interfaces/documents/IDocumentsList';


export const convertDocumentsDataMobile = (data: IDocumentsList[]): IDocumentsCovertedData[] => {

    return data.map((document) => {


        const mobileData = (<>
            <div style={{fontWeight: 600}}>
                Реализация №{document.number} от {dateToLocalString(document.date)}
            </div>
            <div>
               Заказчик: {document.customer}, ИНН {document.customerInn} {!!document.customerKpp && ` КПП ${document.customerKpp}`}
            </div>
            <div>
               Исполнитель: {document.performer},  ИНН {document.performerInn} {!!document.performerKpp && ` КПП ${document.performerKpp}`}
            </div>
            <div style={{fontWeight: 600}}>
                Сумма: {document.summ.toFixed(2)} руб. {!!document.vat && "в том числе НДС"}
            </div>
        </>)
    
        return {
            key: document.id,
            mobileData
        }
    })
}