import * as React from "react";
import { Breadcrumb, Layout } from "antd";
import { authData } from "../../hooks/useAuth";
import { Login } from "./component/login";
import { Account } from "./component/account";
import "./auth.less";
import { minPageHeight } from "../../utils/pageSettings";
import { useDispatch } from "react-redux";
import { isMobile } from "../../utils/isMobile";
import {
  setAppHeaderTitle,
  setShowBackButton,
} from "../../store/modules/settings/general";

export const Auth = () => {
  const { Content } = Layout;
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (isMobile()) {
      dispatch(setShowBackButton(false));
      dispatch(setAppHeaderTitle("Аккаунт"));
    }
  }, []);

  const breadcrumbItems = React.useMemo(
    () => [{ title: "Главная" }, { title: "Аккаунт" }],
    [],
  );

  return (
    <>
      {" "}
      {authData().isAuth && (
        <Breadcrumb
          style={isMobile() && { backgroundColor: "#F8F8F8" }}
          className="breadcrumb"
          items={breadcrumbItems}
        ></Breadcrumb>
      )}
      <Content
        style={{
          padding: 16,
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
