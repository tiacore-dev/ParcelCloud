import * as React from 'react'
// import * as ReactDOM from 'react-dom'
import { Layout, Menu, theme } from 'antd'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { pushPath } from '../../core/history';
import { authData, checkBranchesPermission } from '../../hooks/useAuth';

const { Sider } = Layout;


export const ParcelsLentMenu = () => {

    const data = authData();
    const branches = data.branches;
    const branchesKeys = Object.keys(branches);
    const items = []

    if (checkBranchesPermission("parcel-create")) {
        items.push({
            key: "parcel-create",
            icon: React.createElement(NotificationOutlined),
            label: 'Создать накладную',
            onClick: () => { pushPath('/parcels/create') }
        })
    }
    items.push({
        key: "storage",
        icon: React.createElement(LaptopOutlined),
        label: 'На складе',
        children: branchesKeys.map((branchKey: string) => {
            return {
                key: branchKey,
                label: branches[branchKey],
                onClick: () => { pushPath(`/parcels/storage/${branchKey}`) }
            }
        })
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