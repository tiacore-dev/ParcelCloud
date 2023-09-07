import * as React from "react";
import {
  AppstoreOutlined,
  PlusCircleOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { pushPath } from "../../core/history";

export const parcelMenuItems = () => {
  const items = [];

  items.push({
    key: "createParcels",
    icon: <PlusCircleOutlined />,
    label: "Создать накладную",
    onClick: () => {
      pushPath("/parcels/create");
    },
  });

  items.push({
    key: "parcels",
    icon: <UnorderedListOutlined />,
    label: "Мои накладные",
    onClick: () => {
      pushPath("/parcels");
    },
  });

  items.push({
    key: "templates",
    icon: <AppstoreOutlined />,
    label: "Шаблоны",
    onClick: () => {
      pushPath("/templates");
    },
  });

  return items;
};
