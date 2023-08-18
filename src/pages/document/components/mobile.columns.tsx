import * as React from 'react';
import { ColumnsType } from "antd/es/table";
import { IDocumentParcel } from "../../../interfaces/documents/IDocument";
import { dateToLocalString } from '../../../utils/dateConverter';

export const parcelsMobileColumns: ColumnsType<IDocumentParcel> = [
    {
        title: "Накладные:",
        key: 'mobileData',
        render: (text: string, record: IDocumentParcel, index: number) => (
            <>
            <div>
                Накладная № <b>{record.number}</b> от {dateToLocalString(record.date)}
            </div>
            <div>
               Отправитель: {record.sendCity},  {record.sendAddress}, {record.sendCompany}
            </div>
            <div>
               Получатель: {record.recCity}, {record.recAddress}, {record.recCompany}
            </div>
            <div>
                Мест: {record.qt} Вес: {record.weight} кг, Об. вес: {record.volume} кг
            </div>
        </>
        )
    }
];