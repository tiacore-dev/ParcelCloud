import * as React from "react";
import { Layout, Menu } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { pushPath } from "../../core/history";
import { isMobile } from "../../utils/isMobile";
import { checkPermission } from "../../hooks/useAuth";

const { Header } = Layout;

export const AppHeader = () => {
  const desktopItems: ItemType[] = [];

  if (checkPermission("parcel-view-in-work")) {
    desktopItems.push({
      key: "tasks",
      label: "Мои задачи",
      onClick: () => {
        pushPath("/tasks");
      },
    });
  }

  desktopItems.push({
    key: "parcels",
    label: "Накладные",
    onClick: () => {
      pushPath("/parcels");
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
        pushPath("/manifests");
      },
    });
  }

  if (checkPermission("price-view")) {
    desktopItems.push({
      key: "prices",
      label: "Расчет тарифа",
      onClick: () => {
        pushPath("/prices");
      },
    });
  }

  if (checkPermission("document-view")) {
    desktopItems.push({
      key: "documents",
      label: "Документы",
      onClick: () => {
        pushPath("/documents");
      },
    });
  }

  desktopItems.push({
    key: "auth",
    label: "Аккаунт",
    onClick: () => {
      pushPath("/auth");
    },
  });

  const mobileItems: ItemType[] = [
    {
      key: "parcelsApp",
      label: "Накладные",
      onClick: () => {
        pushPath("/parcels");
      },
    },
    {
      key: "createParcel",
      label: "Создать",
      onClick: () => {
        pushPath("/parcels/create");
      },
    },
    {
      key: "templates",
      label: "Шаблоны",
      onClick: () => {
        pushPath("/templates");
      },
    },
    {
      key: "prices",
      label: "Расчет тарифа",
      onClick: () => {
        pushPath("/prices");
      },
    },
    {
      key: "documents",
      label: "Документы",
      onClick: () => {
        pushPath("/documents");
      },
    },
    {
      key: "auth",
      label: "Аккаунт",
      onClick: () => {
        pushPath("/auth");
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
