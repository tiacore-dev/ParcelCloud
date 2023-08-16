import * as React from 'react';
import { IParcelsCovertedData } from "./parcels";
import { dateToLocalString } from '../../utils/dateConverter';
import { IParcelsList } from '../../interfaces/parcels/IParcelsList';
 

export const convertParcelsDataMobile = (data: IParcelsList[]): IParcelsCovertedData[] => {

    if (!data) {
        return []
    }

    return data.map((parcel, index) => {

        const mobileData = (<>
            <div>
                Накладная № <b>{parcel.number}</b> от {dateToLocalString(parcel.date)}
            </div>
            <div>
               Отправитель: {parcel.sendCity},  {parcel.sendAddress}, {parcel.sendCompany}
            </div>
            <div>
               Получатель: {parcel.recCity}, {parcel.recAddress}, {parcel.recCompany}
            </div>
            <div>
                Мест: {parcel.qt} Вес: {parcel.weight} кг, Об. вес: {parcel.volume} кг
            </div>
        </>)

        return {
            
            key: parcel.id,
            mobileData
        }
    })
}