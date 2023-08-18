import * as React from 'react'
import { Layout, Menu } from 'antd'
import { parcelMenuItems } from './parcelMenuItems';
import { minLeftMenuHeight } from '../../utils/pageSettings';

const { Sider } = Layout;


export const ParcelsLeftMenu = () => {

    
    return <Sider
        width={200}
        style={{
            background: '#FFF',
        }}
    >
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{
                height: minLeftMenuHeight(),
                borderRight: 0,
            }}
            items={parcelMenuItems()}
        />
    </Sider>
}