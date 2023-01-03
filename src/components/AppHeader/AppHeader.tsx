import * as React from 'react'
import  { Layout, Menu } from 'antd'
import { MenuItemType } from 'antd/es/menu/hooks/useItems';

const { Header } = Layout;

const items: MenuItemType[] = [{
    key: "sklad",
    label: "Склад",
  },{
    key: "sale",
    label: "Продажи",
  },{
    key: "courier",
    label: "Курьеры",
  },{
    key: "manage",
    label: "Управление",
  }];

export const AppHeader = <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items} />
      </Header>