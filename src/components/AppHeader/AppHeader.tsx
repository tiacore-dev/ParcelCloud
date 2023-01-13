import * as React from 'react'
import { Layout, Menu } from 'antd'
import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import { pushPath } from '../../core/history';
import { authlogout } from '../../store/modules/auth';
import { useDispatch } from 'react-redux';

const { Header } = Layout;




export const AppHeader = () => {

  const dispatch = useDispatch();

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
  },{
    key: "logout",
    label: "Выход",
    onClick: () => { 
      // pushPath('/auth')
      dispatch(authlogout())
     }
  }];

  return <Header className="header">
  <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items} />
</Header>
}
  
