import { IParcelHistory } from "../../../interfaces/parcels/IParcel";
import * as React from 'react';
import { dateToLocalString } from "../../../utils/dateConverter";

export const historyDesktopColumns = [
    {
        title: 'История накладной',
        children: [{
            title: 'Дата',
            key: 'numbdatedateer',
            width: '25%',
            render: (text: string, record: IParcelHistory, index: number) => (dateToLocalString(record.date))
        },
        {
            title: 'Статус',
            dataIndex: 'type',
            key: 'type',
            width: '35%',
        },
        {
            title: 'Комментарий',
            dataIndex: 'comment',
            key: 'comment',
            width: '40%',
        }]
    }
];