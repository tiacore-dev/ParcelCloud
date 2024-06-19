import { Layout } from "antd";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { minPageHeight } from "../../utils/pageSettings";
import { isMobile } from "../../utils/isMobile";
import { checkPermission } from "../../hooks/useAuth";

export const Main = () => {
  const navigate = useNavigate();
  const { Content } = Layout;

  const defaultPage = checkPermission("parcel-view-in-work")
    ? "/tasks"
    : "/parcels";

  {
    React.useEffect(() => {
      navigate(defaultPage);
    }, []);
  }
  return (
    <>
      <Content
        style={{
          padding: isMobile() ? 0 : 8,
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
