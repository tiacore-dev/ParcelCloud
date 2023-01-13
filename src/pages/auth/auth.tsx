import { Breadcrumb, Layout, Button, Checkbox, Form, Input } from 'antd';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { pushPath } from '../../core/history';
import { useApi } from '../../hooks/useApi';
import { ILoginData } from '../../hooks/useAuth';
import { authlogin } from '../../store/modules/auth';

export interface ILoginResponce {
    fullName: string;
    email: string;
    userKey: string;
    token: string;
    permissions: {
        companyBranchCode: string;
        CompanyBranchPermissions: string[]
    };
}

export const Auth = () => {

    const dispatch = useDispatch();

    const login = React.useCallback(
        async (loginData) => {
            useApi<ILoginResponce, ILoginData>('auth', 'login', loginData)
            .then((data) => { 
                dispatch(authlogin(data))
                pushPath('/')
            })
            .catch((err) => console.log(err))
        }, []
    )




    const { Content } = Layout;

    return (
        <>
            <Layout
                style={{
                    padding: '0 24px',
                    background: '#fff',
                    margin: 'auto'
                }}
            >
                <Content
                    style={{
                        padding: 24,
                        margin: 'auto',
                        marginTop: '80px',
                        minHeight: 280,
                        minWidth: 380,
                        background: '#FFF',
                    }}
                >
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={login}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="e-mail"
                            name="email"
                            rules={[{ required: true, message: 'Please input your e-mail!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Вход
                            </Button>
                        </Form.Item>
                    </Form>
                </Content>
            </Layout>
        </>
    )
}
