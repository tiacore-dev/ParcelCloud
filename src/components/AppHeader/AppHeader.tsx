import * as React from 'react'
import  { Layout, Menu } from 'antd'
import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import { pushPath } from '../../core/history';

const { Header } = Layout;

const items: MenuItemType[] = [{
    key: "home",
    label: "Главная",
    onClick: ()=>{pushPath('/')}
  },{
    key: "parcels",
    label: "Накладные",
    onClick: ()=>{pushPath('/parcels/123')}
  },{
    key: "couriers",
    label: "Курьеры",
    onClick: ()=>{pushPath('/couriers')}
  }];

export const AppHeader = <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items} />
      </Header>