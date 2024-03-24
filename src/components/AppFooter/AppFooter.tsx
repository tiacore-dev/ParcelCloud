import * as React from "react";
import { Flex, Layout, Space } from "antd";
import { isMobile } from "../../utils/isMobile";
import {
  AppstoreOutlined,
  CalculatorOutlined,
  IdcardOutlined,
  MailOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { checkPermission } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const AppFooter = () => {
  const { Footer } = Layout;
  const navigate = useNavigate();

  const items: React.JSX.Element[] = [];

  if (checkPermission("parcel-view-my")) {
    items.push(
      <Space
        size="small"
        direction="vertical"
        style={{ textAlign: "center" }}
        onClick={() => {
          navigate("/parcels");
        }}
      >
        <MailOutlined style={{ fontSize: "20px" }} />
        <div style={{ fontSize: "12px" }}>Накладные</div>
      </Space>,
    );
  }

  if (checkPermission("parcel-view-in-work")) {
    items.unshift(
      <Space
        size="small"
        direction="vertical"
        style={{ textAlign: "center" }}
        onClick={() => {
          navigate("/tasks");
        }}
      >
        <UnorderedListOutlined style={{ fontSize: "20px" }} />
        <div style={{ fontSize: "12px" }}>Задачи</div>
      </Space>,
    );
  }
  if (
    checkPermission("manifest-incoming-view") ||
    checkPermission("manifest-outgoing-view")
  ) {
    items.push(
      <Space
        size="small"
        direction="vertical"
        style={{ textAlign: "center" }}
        onClick={() => {
          navigate("/manifests");
        }}
      >
        <AppstoreOutlined style={{ fontSize: "20px" }} />
        <div style={{ fontSize: "12px" }}>Манифесты</div>
      </Space>,
    );
  }

  if (checkPermission("price-view")) {
    items.push(
      <Space
        size="small"
        direction="vertical"
        style={{ textAlign: "center" }}
        onClick={() => {
          navigate("/prices");
        }}
      >
        <CalculatorOutlined style={{ fontSize: "20px" }} />
        <div style={{ fontSize: "12px" }}>Тарифы</div>
      </Space>,
    );
  }

  items.push(
    <Space
      size="small"
      direction="vertical"
      style={{ textAlign: "center" }}
      onClick={() => {
        navigate("/auth");
      }}
    >
      <IdcardOutlined style={{ fontSize: "20px" }} />
      <div style={{ fontSize: "12px" }}>Аккаунт</div>
    </Space>,
  );

  return isMobile() ? (
    <Footer
      style={{
        padding: "12px 12px",
      }}
    >
      <Flex justify="space-around" align="center">
        {items}
      </Flex>
    </Footer>
  ) : (
    <Footer
      style={{
        padding: "25px 50px",
        textAlign: "center",
      }}
    >
      Parcel Cloud ©2023 Created by{" "}
      <a href="https://www.linkedin.com/in/ilia-timofeev-b56830261/">
        Ilia Timofeev
      </a>
    </Footer>
  );
};
