import { Breadcrumb, Layout } from "antd";
import * as React from "react";
import { pushPath } from "../../core/history";
import { minPageHeight } from "../../utils/pageSettings";

export const Main = () => {
  const { Content } = Layout;

  {
    React.useEffect(() => {
      pushPath("/parcels");
    }, []);
  }
  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>Главная</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: minPageHeight(),
          background: "#FFF",
        }}
      >
        Main
      </Content>
    </>
  );
};
