import * as React from "react";
import { Layout, Menu } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { useNavigate } from "react-router-dom";
import { isMobile } from "../../utils/isMobile";
import { checkPermission } from "../../hooks/useAuth";

const { Header } = Layout;

export const AppHeader = () => {
  const desktopItems: ItemType[] = [];
  const navigate = useNavigate();
  if (checkPermission("parcel-view-in-work")) {
    desktopItems.push({
      key: "tasks",
      label: "Мои задачи",
      onClick: () => {
        navigate("/tasks");
      },
    });
  }

  desktopItems.push({
    key: "parcels",
    label: "Накладные",
    onClick: () => {
      navigate("/parcels");
    },
  });

  if (
    checkPermission("manifest-incoming-view") ||
    checkPermission("manifest-outgoing-view")
  ) {
    desktopItems.push({
      key: "manifests",
      label: "Манифесты",
      onClick: () => {
        navigate("/manifests");
      },
    });
  }

  if (checkPermission("price-view")) {
    desktopItems.push({
      key: "prices",
      label: "Расчет тарифа",
      onClick: () => {
        navigate("/prices");
      },
    });
  }

  if (checkPermission("document-view")) {
    desktopItems.push({
      key: "documents",
      label: "Документы",
      onClick: () => {
        navigate("/documents");
      },
    });
  }

  desktopItems.push({
    key: "auth",
    label: "Аккаунт",
    onClick: () => {
      navigate("/auth");
    },
  });

  const mobileItems: ItemType[] = [
    {
      key: "parcelsApp",
      label: "Накладные",
      onClick: () => {
        navigate("/parcels");
      },
    },
    {
      key: "createParcel",
      label: "Создать",
      onClick: () => {
        navigate("/parcels/create");
      },
    },
    {
      key: "templates",
      label: "Шаблоны",
      onClick: () => {
        navigate("/templates");
      },
    },
    {
      key: "prices",
      label: "Расчет тарифа",
      onClick: () => {
        navigate("/prices");
      },
    },
    {
      key: "documents",
      label: "Документы",
      onClick: () => {
        navigate("/documents");
      },
    },
    {
      key: "auth",
      label: "Аккаунт",
      onClick: () => {
        navigate("/auth");
      },
    },
  ];

  return (
    <Header className="header">
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        items={isMobile() ? mobileItems : desktopItems}
      />
    </Header>
  );
};
