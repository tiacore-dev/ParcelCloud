import { ColumnsType } from "antd/es/table";
import { ITemplate } from "../../../interfaces/templates/ITemplate";

export const templatesDesktopColumns: ColumnsType<ITemplate> = [
  {
    title: "Наименование",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Город",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "Адрес",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Контактное лицо",
    dataIndex: "person",
    key: "person",
  },
  {
    title: "Компания",
    dataIndex: "company",
    key: "company",
  },
  {
    title: "Телефон",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Доп. информация",
    dataIndex: "addInfo",
    key: "addInfo",
  },
];
