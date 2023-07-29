import * as React from 'react';
import { dateToLocalString } from '../../utils/dateConverter';
import { IDocumentParcel } from '../../interfaces/documents/IDocument';
 

export const convertDocumentParcelsData = (data?: IDocumentParcel[]) => {

    if (!data) {
        return []
    }

    return data.map((parcel, index) => {


        const number = (<>
            <div>
                {parcel.number}
            </div>
            <div>
               от {dateToLocalString(parcel.date)}
            </div>
        </>)
        const rec = (<>
            <div>
                {parcel.recCity}
            </div>
            <div>
                {parcel.recAddress}
            </div>
            <div>
                {parcel.recCompany}
            </div>
        </>)
        const send = (<>
            <div>
                {parcel.sendCity}
            </div>
            <div>
                {parcel.sendAddress}
            </div>
            <div>
                {parcel.sendCompany}
            </div>
        </>)
        const items = (<>
            <div>
                Мест: {parcel.qt} 
            </div>
            <div>
                Вес: {parcel.weight}
            </div>
            <div>
                Об. вес: {parcel.volume}
            </div>
        </>)
        const summ = (<>
            <div>
              {parcel.summ.toFixed(2)} 
            </div>
        </>)

        return {
            
            key: parcel.id,
            number,
            rec,
            send,
            items,
            summ,
        }
    })
}