import * as React from "react";
import { Breadcrumb, Layout, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { TemplatesTable } from "./components/table";
import { minPageHeight } from "../../utils/pageSettings";
import "./templates.less";
import { isMobile } from "../../utils/isMobile";

export const Templates = () => {
  const { Content } = Layout;
  const navigate = useNavigate();
  const onRowClick = (id: string) => {
    navigate(`/templates/${id}`);
  };

  return (
    <>
      <Breadcrumb
        style={isMobile() && { backgroundColor: "#F8F8F8" }}
        className="breadcrumb"
        items={[{ title: "Главная" }, { title: "Шаблоны" }]}
      />
      <Content
        style={{
          padding: isMobile() ? 0 : 8,
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
