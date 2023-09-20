import * as React from "react";
import { Breadcrumb, Layout } from "antd";
import { authData } from "../../hooks/useAuth";
import { Login } from "./component/login";
import { Account } from "./component/account";
import "./auth.less";
import { minPageHeight } from "../../utils/pageSettings";

export const Auth = () => {
  const { Content } = Layout;

  const breadcrumbItems = React.useMemo(
    () => [{ title: "Главная" }, { title: "Аккаунт" }],
    [],
  );

  return (
    <>
      {" "}
      {authData().isAuth && (
        <Breadcrumb className="breadcrumb" items={breadcrumbItems}></Breadcrumb>
      )}
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: minPageHeight(),
          minWidth: 380,
          background: "#FFF",
        }}
      >
        {authData().isAuth ? <Account /> : <Login />}
      </Content>
    </>
  );
};
