import * as React from "react";
import { Button, Form, Input, message } from "antd";
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
        SVS Logistik Parcel Cloud
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
          label="e-mail"
          name="email"
          rules={[{ required: true, message: "Please input your e-mail!" }]}
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
          <Button type="primary" htmlType="submit">
            Вход
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
