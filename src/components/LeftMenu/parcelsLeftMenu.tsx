import * as React from 'react'
import { Layout, Menu } from 'antd'
import { parcelMenuItems } from './parcelMenuItems';

const { Sider } = Layout;


export const ParcelsLeftMenu = () => {

    
    return <Sider
        width={200}
        style={{
            background: '#FFF',
            height: "calc(100vh - 131px)"
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
            items={parcelMenuItems()}
        />
    </Sider>
}