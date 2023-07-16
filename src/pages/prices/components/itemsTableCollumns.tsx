import { Input, InputNumber, Popconfirm } from 'antd';
import * as React from 'react';
import { IParcelItem } from '../../../interfaces/parcels/IParcel';
import { useDispatch } from 'react-redux';
import { editPrices } from '../../../store/modules/pages/prices';




export const columns = () => {

    const dispatch = useDispatch()

    const handleDelete = React.useCallback((index: number) => {
        dispatch(editPrices.deleteItem(index))
    }, [])



    return ([
        {
            title: 'Вес (кг)',
            dataIndex: 'weight',
            render: (text: string, record: IParcelItem, index: number) => (
                <InputNumber
                    value={record?.weight || 0}
                    bordered={false}
                    min={0}
                    precision={3}
                    decimalSeparator=','
                    onChange={(value) => dispatch(editPrices.editItemWeight({ index, value }))}
                />
            )
        },

        {
            title: 'Высота (см)',
            dataIndex: 'h',
            render: (text: string, record: IParcelItem, index: number) => (
                <InputNumber
                    value={record?.h || 0}
                    bordered={false}
                    min={0}
                    onChange={(value) => dispatch(editPrices.editItemH({ index, value }))}
                />
            )
        },

        {
            title: 'Длина (см)',
            dataIndex: 'l',
            render: (text: string, record: IParcelItem, index: number) => (
                <InputNumber
                    value={record?.l || 0}
                    bordered={false}
                    min={0}
                    onChange={(value) => dispatch(editPrices.editItemL({ index, value }))}
                />
            )
        },

        {
            title: 'Ширина (см)',
            dataIndex: 'w',
            render: (text: string, record: IParcelItem, index: number) => (
                <InputNumber
                    value={record?.w || 0}
                    bordered={false}
                    min={0}
                    onChange={(value) => dispatch(editPrices.editItemW({ index, value }))}
                />
            )
        },

        {
            title: 'Объемный вес (кг)',
            dataIndex: 'volume',
            key: 'volume',
        },

        {
            title: 'Количество',
            dataIndex: 'qt',
            render: (text: string, record: IParcelItem, index: number) => (
                <InputNumber
                    value={record?.qt || 0}
                    bordered={false}
                    min={1}
                    onChange={(value) => dispatch(editPrices.editItemQt({ index, value }))}
                />
            )
        },

        {
            title: 'Итого вес (кг)',
            dataIndex: 'tWeight',
            key: 'tWeight',
        },

        {
            title: 'Итого об. вес (кг)',
            dataIndex: 'tVolume',
            key: 'tVolume',
        },
       
        {
            dataIndex: 'operation',
            render: (text: string, record: IParcelItem, index: number) =>

                <Popconfirm
                    title="Действительно удалить?"
                    onConfirm={() => handleDelete(index)}
                    okText="Да"
                    cancelText="Нет"
                >
                    <a>Удалить</a>
                </Popconfirm>
        },
    ]);
}