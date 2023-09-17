import * as React from "react";
import { Breadcrumb, Layout, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { TemplatesTable } from "./components/table";
import { minPageHeight } from "../../utils/pageSettings";
import "./templates.less";

export const Templates = () => {
  const { Content } = Layout;
  const navigate = useNavigate();
  const onRowClick = (id: string) => {
    navigate(`/templates/${id}`);
  };

  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
        items={[{ title: "Главная" }, { title: "Шаблоны" }]}
      />
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
            navigate(`/templates/create`);
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
