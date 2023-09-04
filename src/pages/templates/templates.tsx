import * as React from "react";
import { Breadcrumb, Layout, Button } from "antd";
import { pushPath } from "../../core/history";
import { TemplatesTable } from "./components/table";
import { minPageHeight } from "../../utils/pageSettings";
import "./templates.less";

export const Templates = () => {
  const { Content } = Layout;

  const onRowClick = (id: string) => {
    pushPath(`/templates/${id}`);
  };

  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>Главная</Breadcrumb.Item>
        <Breadcrumb.Item>Шаблоны</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: minPageHeight(),
          background: "#FFF",
        }}
      >
        <Button
          type="primary"
          onClick={() => {
            pushPath(`/templates/create`);
          }}
          style={{ marginBottom: 12 }}
        >
          Создать шаблон
        </Button>

        <TemplatesTable onRowClick={onRowClick} search sort />
      </Content>
    </>
  );
};
