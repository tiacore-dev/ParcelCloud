import { Button, Card, Form, Input, InputNumber, Popconfirm } from 'antd';
import * as React from 'react';
import { IParcelItem } from '../../../interfaces/parcels/IParcel';
import { useDispatch } from 'react-redux';
import { editParcel } from '../../../store/modules/editableEntities/editableParcel';
import { isMobile } from '../../../utils/isMobile';



export const columns = () => {

    const dispatch = useDispatch()

    const handleDelete = React.useCallback((index: number) => {
        dispatch(editParcel.deleteItem(index))
    }, [])


    const columns = isMobile() ? [
        {
            key: "mobileData",
            render: (text: string, record: IParcelItem, index: number) => (
                <Card
                    title={`Место №${index+1}`}
                >
                    <Form.Item label="Вес" className='create-parcel__items__form-item'>
                        <InputNumber
                            className='create-parcel__items__input_number'
                            value={record?.weight || 0}
                            min={0}
                            precision={3}
                            decimalSeparator=','
                            onChange={(value) => dispatch(editParcel.editItemWeight({ index, value }))}
                        />
                    </Form.Item>
                    <Form.Item label="Высота (см)" className='create-parcel__items__form-item'>
                        <InputNumber
                            className='create-parcel__items__input_number'
                            value={record?.h || 0}
                            min={0}
                            onChange={(value) => dispatch(editParcel.editItemH({ index, value }))}
                        />
                    </Form.Item>
                    <Form.Item label="Длина (см)" className='create-parcel__items__form-item'>
                        <InputNumber
                            className='create-parcel__items__input_number'
                            value={record?.h || 0}
                            min={0}
                            onChange={(value) => dispatch(editParcel.editItemH({ index, value }))}
                        />
                    </Form.Item>
                    <Form.Item label="Ширина (см)" className='create-parcel__items__form-item'>
                        <InputNumber
                            className='create-parcel__items__input_number'
                            value={record?.w || 0}
                            min={0}
                            onChange={(value) => dispatch(editParcel.editItemW({ index, value }))}
                        />
                    </Form.Item>
                    <Form.Item label="Объемный вес" className='create-parcel__items__form-item'>
                        {record?.volume} кг
                    </Form.Item>
                    <Form.Item label="Количество" className='create-parcel__items__form-item'>
                        <InputNumber
                            className='create-parcel__items__input_number'
                            value={record?.qt || 0}
                            min={1}
                            onChange={(value) => dispatch(editParcel.editItemQt({ index, value }))}
                        />
                    </Form.Item>
                    <Form.Item label="Итого вес" className='create-parcel__items__form-item'>
                        {record?.tWeight} кг
                    </Form.Item>
                    <Form.Item label="Итого об. вес" className='create-parcel__items__form-item'>
                        {record?.tVolume} кг
                    </Form.Item>
                    <Form.Item>
                        <Popconfirm
                            title="Действительно удалить?"
                            onConfirm={() => handleDelete(index)}
                            okText="Да"
                            cancelText="Нет"
                        >
                            <Button danger>Удалить</Button>
                        </Popconfirm>
                    </Form.Item>
                </Card>

            )
        }
    ] : [
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
                    onChange={(value) => dispatch(editParcel.editItemWeight({ index, value }))}
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
                    onChange={(value) => dispatch(editParcel.editItemH({ index, value }))}
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
                    onChange={(value) => dispatch(editParcel.editItemL({ index, value }))}
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
                    onChange={(value) => dispatch(editParcel.editItemW({ index, value }))}
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
                    onChange={(value) => dispatch(editParcel.editItemQt({ index, value }))}
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
    ]


    return (columns);
}