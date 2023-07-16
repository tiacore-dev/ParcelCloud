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
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Главная</Breadcrumb.Item>
                <Breadcrumb.Item>Аккаунт</Breadcrumb.Item>

            </Breadcrumb>
            <Content
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: "calc(100vh - 185px)",
                    minWidth: 380,
                    background: '#FFF',
                }}
            >
                {authData().isAuth ? <Account /> : <Login />}

            </Content>
        </>
    )
}
