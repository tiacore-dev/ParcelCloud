import * as React from 'react'
import { Avatar, Layout, Menu } from 'antd'
import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import { pushPath } from '../../core/history';
import { UserOutlined } from '@ant-design/icons';

const { Header } = Layout;

const items: MenuItemType[] = [{
  key: "home",
  label: "Главная",
  onClick: () => { pushPath('/') }
}, {
  key: "parcels",
  label: "Накладные",
  onClick: () => { pushPath('/parcels/123') }
}, {
  key: "couriers",
  label: "Курьеры",
  onClick: () => { pushPath('/couriers') }
}];

export const AppHeader = () => (
  <Header className="header">
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items} />
    <Avatar icon={<UserOutlined />} />
  </Header>)
