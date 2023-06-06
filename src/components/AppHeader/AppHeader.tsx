import * as React from 'react'
import { Layout, Menu } from 'antd'
import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import { pushPath } from '../../core/history';


const { Header } = Layout;




export const AppHeader = () => {



  const items: MenuItemType[] = [
    {
      key: "parcelsApp",
      label: "Накладные",
      onClick: () => { pushPath('/parcels') }
    },
    {
      key: "prices",
      label: "Расчет тарифа",
      onClick: () => { pushPath('/prices') }
    },
    {
      key: "reports",
      label: "Отчетность",
      onClick: () => { pushPath('/reports') }
    },
    {
      key: "auth",
      label: "Аккаунт",
      onClick: () => {
        pushPath('/auth')
      }
    }
  ];

  return <Header className="header">
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items} />
  </Header>
}

