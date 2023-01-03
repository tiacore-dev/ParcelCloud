import * as React from 'react'
import { Layout } from 'antd'
import { AppHeader } from '../AppHeader/AppHeader';
import { AppFooter } from '../AppFooter/AppFooter';
import { LentMenu } from '../LeftMenu/LeftMenu';
import { AppRouter } from '../../core/router';


export const App = () => {

  React.useEffect(()=>{
    console.log(location),[location]
  })

  return (
    <Layout>
      <AppHeader/>
      <Layout>
        {LentMenu}
        <AppRouter/>
      </Layout>
      {AppFooter}
    </Layout>
  );
};