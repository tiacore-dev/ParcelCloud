import * as React from 'react'
import { Layout, Menu } from 'antd'
import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import { pushPath } from '../../core/history';
import { parcelMenuItems } from '../LeftMenu/parcelMenuItems';
import { isMobile } from '../../utils/isMobile';


const { Header } = Layout;




export const AppHeader = () => {



  const items = [
    isMobile() ? {
      key: "parcelsApp",
      label: "Накладные",
      children: parcelMenuItems()
    } : {
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
      key: "documents",
      label: "Документы",
      onClick: () => { pushPath('/documents') }
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

