import * as React from 'react';
import { IParcelItem } from '../../../interfaces/parcels/IParcel';
import { IConvertedParcelItem } from '../parcel';


export const convertItemsDataMobile = (data: IParcelItem[]): IConvertedParcelItem[] => {

    return data.map((item, index) => {


        const mobileData = (<>
            <div>
                Вес: {item.weight} кг, Размер: {item.l}х{item.w}х{item.h}, Об.вес: {item.weight} кг
            </div>
            <div>
               Кол-во: {item.qt}, Σ Вес: {item.tWeight}, Σ Об. вес: {item.tVolume}
            </div>
        </>)
    
        return {
            key: index,
            mobileData
        }
    })
}