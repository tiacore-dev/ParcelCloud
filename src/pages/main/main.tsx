import { Layout } from "antd";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { minPageHeight } from "../../utils/pageSettings";

export const Main = () => {
  const navigate = useNavigate();
  const { Content } = Layout;

  {
    React.useEffect(() => {
      navigate("/parcels");
    }, []);
  }
  return (
    <>
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
