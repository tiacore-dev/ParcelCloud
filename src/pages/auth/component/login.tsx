import * as React from 'react';
import { Button, Form, Input, message } from 'antd';
import { useDispatch } from 'react-redux';
import { pushPath } from '../../../core/history';
import { useApi } from '../../../hooks/useApi';
import { ILoginData } from '../../../hooks/useAuth';
import { authlogin, IAuthLoginPayload } from '../../../store/modules/auth';
import Title from 'antd/es/typography/Title';

interface IResponcePermissions {
    code: string;
    permissions: string[]
}

interface IResponceAvailableEntities {
    code: string;
    name: string;
}

export interface ILoginResponce {
    fullName: string;
    email: string;
    userKey: string;
    token: string;
    branchesPermissions: IResponcePermissions[];
    companiesPermissions: IResponcePermissions[];
    organizationsPermissions: IResponcePermissions[];
    branches: IResponceAvailableEntities[];
    companies: IResponceAvailableEntities[];
    organizations: IResponceAvailableEntities[];


}

export const Login = () => {

    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();

    const reducePermissions = (prev: Record <string, string[]> , item: IResponcePermissions) => {
        prev[item.code] = item.permissions
        return prev
    }

    const reduceAvailableEntities = (prev: Record <string, string> , item: IResponceAvailableEntities) => {
        prev[item.code] = item.name
        return prev
    }
    
    const convertLoginResponce = (loginResponce: ILoginResponce): IAuthLoginPayload => {
        const branchesPermissions = loginResponce.branchesPermissions.reduce(reducePermissions, {})
        const companiesPermissions = loginResponce.companiesPermissions.reduce(reducePermissions, {})
        const organizationsPermissions = loginResponce.organizationsPermissions.reduce(reducePermissions, {})
        const branches =  loginResponce.branches.reduce(reduceAvailableEntities, {})
        const companies =  loginResponce.companies.reduce(reduceAvailableEntities, {})
        const organizations =  loginResponce.organizations.reduce(reduceAvailableEntities, {})


        return {...loginResponce, 
            branchesPermissions,
            companiesPermissions,
            organizationsPermissions,
            branches,
            companies,
            organizations
        }
    }

    const login = React.useCallback(
        async (loginData) => {
            useApi<ILoginResponce, ILoginData>('auth', 'login', loginData)
                .then((data) => {
                    dispatch(authlogin(convertLoginResponce(data)))
                    pushPath('/')
                })
                .catch((err) => {
                    messageApi.open({
                        type: 'error',
                        content: String(err),
                      });
                })
        }, []
    )
    return (
        <>
        {contextHolder}
        
        <Title  style={{
                marginTop: "40px",
                textAlign: "center"
            }}>
            Parcel Cloud
        </Title>
        <Form
            name="login"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={login}
            autoComplete="off"
            style={{
                width: "380px",
                margin: "40px auto"
            }}
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
        </>
    )
}