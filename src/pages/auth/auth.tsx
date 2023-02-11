import * as React from 'react';
import { Breadcrumb, Layout } from 'antd';
import { authData } from '../../hooks/useAuth';
import { Login } from './component/login';
import { Account } from './component/account';
import './auth.less'

export const Auth = () => {


    const { Content } = Layout;

    return (
        <>
                <Content
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                        minWidth: 380,
                        background: '#FFF',
                    }}
                >
                    {authData().isAuth ? <Account /> : <Login />}

                </Content>
        </>
    )
}
