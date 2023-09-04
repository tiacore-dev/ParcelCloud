import { Button, Descriptions, Space } from "antd";
import * as React from "react";
import { useDispatch } from "react-redux";
import { authData } from "../../../hooks/useAuth";
import { authlogout } from "../../../store/modules/auth";
import { useloadSourse } from "../../../components/App/App";

export const Account = () => {
  const data = authData();
  const dispatch = useDispatch();

  const [load, clearStates] = useloadSourse();

  const refresh = () => {
    clearStates();
    load(data);
  };

  return (
    <>
      <Descriptions
        title="Данные пользователя"
        column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
      >
        <Descriptions.Item label="Имя пользователя">
          {data.fullName}
        </Descriptions.Item>
        <Descriptions.Item label="e-mail">{data.email}</Descriptions.Item>
      </Descriptions>
      <Space direction="vertical">
        <Button onClick={refresh}>Обновить данные</Button>

        <Button onClick={() => dispatch(authlogout())}>Выход</Button>
      </Space>
    </>
  );
};
