import * as React from "react";
import { Layout } from "antd";
import { isMobile } from "../../utils/isMobile";

const { Footer } = Layout;
const style: React.CSSProperties = {
  textAlign: "center",
};

if (isMobile()) {
  style.padding = "12px 50px";
}

export const AppFooter = (
  <Footer style={style}>
    Parcel Cloud ©2023 Created by{" "}
    <a href="https://www.linkedin.com/in/ilia-timofeev-b56830261/">
      Ilia Timofeev
    </a>
  </Footer>
);
