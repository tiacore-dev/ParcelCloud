import * as React from 'react'
import { Layout, Menu } from 'antd'
import { AppstoreOutlined, PlusCircleOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { pushPath } from '../../core/history';

const { Sider } = Layout;


export const ParcelsLentMenu = () => {

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
        onClick: () => { pushPath('/parcels/all') }
    })

    items.push({
        key: "parcels.template",
        icon: <AppstoreOutlined />,
        label: 'Шаблоны',
        onClick: () => { pushPath('/parcels/template') }
    })





    return <Sider
        width={200}
        style={{
            background: '#FFF',
            height: "calc(100vh - 129px)"
        }}
    >
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{
                height: '100%',
                borderRight: 0,
            }}
            items={items}
        />
    </Sider>
}