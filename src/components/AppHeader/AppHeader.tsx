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

  const parcels_children: ItemType[] = [];

  parcels_children.push({
    key: "allParcels",
    label:
      checkPermission("parcel-view-all") ||
      checkPermission("parcel-view-assigned")
        ? "Все накладные"
        : "Мои накладные",
    onClick: () => {
      pushPath("/parcels");
    },
  });

  if (checkPermission("parcel-create")) {
    parcels_children.push({
      key: "createParcels",
      label: "Создать накладную",
      onClick: () => {
        pushPath("/parcels/create");
      },
    });
  }

  if (checkPermission("template-view")) {
    parcels_children.push({
      key: "templates",
      label: "Шаблоны",
      onClick: () => {
        pushPath("/templates");
      },
    });
  }

  desktopItems.push({
    key: "parcels",
    label: "Накладные",
    children: parcels_children,
  });

  const storage_children: ItemType[] = [];

  if (checkPermission("manifest-incoming-view")) {
    storage_children.push({
      key: "manifestsIncoming",
      label: "Манифесты входящие",
      onClick: () => {
        pushPath("/manifestsIncoming");
      },
    });
  }

  if (checkPermission("manifest-outgoing-view")) {
    storage_children.push({
      key: "manifestsOutgoing",
      label: "Манифесты исходящие",
      onClick: () => {
        pushPath("/manifestsOutgoing");
      },
    });
  }

  if (storage_children.length) {
    desktopItems.push({
      key: "storage",
      label: "Склад",
      children: storage_children,
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
