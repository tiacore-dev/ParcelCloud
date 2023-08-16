import * as React from 'react'
import { AppstoreOutlined, PlusCircleOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { pushPath } from '../../core/history';

export const parcelMenuItems = () => {

const items = []

    items.push({
        key: "parcels.create",
        icon: <PlusCircleOutlined />,
        label: 'Создать накладную',
        onClick: () => { pushPath('/parcels/create') }
    })

    items.push({
        key: "parcels.all",
        icon: <UnorderedListOutlined />,
        label: 'Мои накладные',
        onClick: () => { pushPath('/parcels') }
    })

    items.push({
        key: "parcels.template",
        icon: <AppstoreOutlined />,
        label: 'Шаблоны',
        onClick: () => { pushPath('/templates') }
    })

    return items
}