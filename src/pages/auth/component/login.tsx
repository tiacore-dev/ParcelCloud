import * as React from "react";
import { Button, Form, Input, Space, message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../../hooks/useApi";
import { ILoginData } from "../../../hooks/useAuth";
import { authlogin } from "../../../store/modules/auth";
import Title from "antd/es/typography/Title";
import { useloadSourse } from "../../../components/App/App";
import { IUser } from "../../../interfaces/users/IUser";

export const Login = () => {
  const dispatch = useDispatch();
  const [load] = useloadSourse();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const login = React.useCallback(async (loginData: ILoginData) => {
    useApi<IUser, ILoginData>("auth", "login", loginData)
      .then((data) => {
        dispatch(authlogin(data));
        load(data);
        navigate("/");
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: String(err),
        });
      });
  }, []);
  return (
    <>
      {contextHolder}

      <Title
        style={{
          marginTop: "40px",
          textAlign: "center",
        }}
      >
        SVS Logistik
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
          margin: "40px auto",
        }}
      >
        <Form.Item
          label="Login"
          name="email"
          rules={[{ required: true, message: "Please input your login!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              Вход
            </Button>

            <Button
              type="default"
              onClick={() => {
                location.href = "http://www.svs-logistik.ru";
              }}
            >
              Вернуться на сайт
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};
