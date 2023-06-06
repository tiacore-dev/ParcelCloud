import { Button, Descriptions, List } from 'antd';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { authData } from '../../../hooks/useAuth';
import { authlogout } from '../../../store/modules/auth';


export const Account = () => {
    const data = authData();
    const dispatch = useDispatch();

    return (
        <>
            <Descriptions
                title="Данные пользователя"
                column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
            >
                <Descriptions.Item label="Имя пользователя">{data.fullName}</Descriptions.Item>
                <Descriptions.Item label="e-mail">{data.email}</Descriptions.Item>
            </Descriptions>


           <Button
                onClick={() => dispatch(authlogout())}
            >
                Выход
            </Button>
        </>
    )
}
