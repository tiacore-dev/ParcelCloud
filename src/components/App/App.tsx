import * as React from 'react'
import { Layout } from 'antd'
import { AppHeader } from '../AppHeader/AppHeader';
import { AppFooter } from '../AppFooter/AppFooter';
import { LeftMenu } from '../LeftMenu/LeftMenu';
import { AppRouter } from '../../core/router';
import { authData } from '../../hooks/useAuth';
import { pushPath } from '../../core/history';
import { Auth } from '../../pages/auth/auth';




export const App = () => {


  const isAuth = authData().isAuth;

  if (!isAuth) {
    pushPath('/auth')
  }
  
  return (
    <>
    {isAuth ? 
    <Layout>
      <AppHeader/>
      <Layout>
        <LeftMenu />
        <Layout
          style={{
            padding: '0 24px',
          }}
        >
        <AppRouter/>
        </Layout>
      </Layout>
      {AppFooter}
    </Layout> : 
      <Auth/>}
      </>   
  );
};


