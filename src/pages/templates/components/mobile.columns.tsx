import * as React from 'react';
import { ColumnsType } from "antd/es/table";
import { ITemplate } from "../../../interfaces/templates/ITemplate";
import { Card, Form } from 'antd';



export const templatesMobileColumns: ColumnsType<ITemplate> = [
    {
        key: 'mobileData',
        render: (text: string, record: ITemplate, index: number) => (
            <Card
                size='small'
                title={record.name}
            >
                {/* <Form.Item label="Наименование" className='templates__form_item'> */}
                    {record.name}
                {/* </Form.Item> */}
                {/* <Form.Item label="Город" className='templates__form_item'> */}
                    {record.city}
                {/* </Form.Item>
                <Form.Item label="Адрес" className='templates__form_item'> */}
                    {record.address}
                {/* </Form.Item>
                <Form.Item label="Конт. лицо" className='templates__form_item'> */}
                    {record.person}
                {/* </Form.Item>
                <Form.Item label="Компания" className='templates__form_item'> */}
                    {record.company}
                {/* </Form.Item>
                <Form.Item label="Телефон" className='templates__form_item'> */}
                    {record.phone}
                {/* </Form.Item>
                <Form.Item label="Доп. инфо" className='templates__form_item'> */}
                    {record.addInfo}
                {/* </Form.Item> */}
            </Card>
        )
    }
];