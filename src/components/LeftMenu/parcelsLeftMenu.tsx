import * as React from 'react'
import { Layout, Menu } from 'antd'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { pushPath } from '../../core/history';
import { authData } from '../../hooks/useAuth';

const { Sider } = Layout;


export const ParcelsLentMenu = () => {

    const data = authData();
    const items = []

    items.push({
        key: "storage",
        icon: React.createElement(LaptopOutlined),
    })
    items.push({
        key: "acceptanceinstorage",
        icon: React.createElement(NotificationOutlined),
        label: 'Прнинять на склад',
        onClick: () => { pushPath('/parcels/storage/acceptance') }
    })

    items.push({
        key: "handovertocourier",
        icon: React.createElement(UserOutlined),
        label: 'Выдать курьеру',
        onClick: () => { pushPath('/parcels/storage/acceptance') }
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