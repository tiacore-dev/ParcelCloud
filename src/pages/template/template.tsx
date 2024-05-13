import * as React from "react";
import { Breadcrumb, Button, Form, Layout, Space } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authToken } from "../../hooks/useAuth";
import { IState } from "../../store/modules";
import {
  clearTemplateState,
  editTemplate,
  setTemplatStateData,
} from "../../store/modules/pages/template";
import { useNavigate } from "react-router-dom";

import { minPageHeight } from "../../utils/pageSettings";
import { TemplateContent } from "./components/content";
import {
  EditeTemplateDto,
  deleteTemplateAction,
  editTemplateAction,
} from "../../hooks/ApiActions/templates";
import { isMobile } from "../../utils/isMobile";

export const Template = () => {
  const { Content } = Layout;

  const routeParams = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const templatesData = useSelector(
    (state: IState) => state.dictionaries.templates.data,
  );
  const templateData = useSelector((state: IState) => state.pages.template);

  const params: EditeTemplateDto = {
    ...templateData,
    authToken: authToken(),
    id: routeParams.templateId,
  };

  const editTemplateHandler = React.useCallback((params: EditeTemplateDto) => {
    editTemplateAction(dispatch, params);
    navigate("/templates");
  }, []);

  const deleteTemplateHandler = React.useCallback(
    (params: EditeTemplateDto) => {
      deleteTemplateAction(dispatch, params);
      navigate("/templates");
    },
    [],
  );

  React.useEffect(() => {
    dispatch(editTemplate.setTemplateDisabled(false));
    if (routeParams.templateId !== "create") {
      dispatch(
        setTemplatStateData(
          templatesData.find(
            (template) => template.id === routeParams.templateId,
          ),
        ),
      );
    } else {
      dispatch(clearTemplateState());
    }
  }, []);

  return (
    <>
      <Breadcrumb
        style={isMobile() && { backgroundColor: "#F8F8F8" }}
        className="breadcrumb"
        items={[
          { title: "Главная" },
          {
            title: "Шаблоны",
          },
          {
            title:
              routeParams.templateId !== "create"
                ? "Создать шаблон"
                : templateData?.name,
          },
        ]}
      />

      <Content
        style={{
          padding: "24px",
          margin: 0,
          minHeight: minPageHeight(),
          background: "#FFF",
        }}
      >
        <TemplateContent />
        <Form>
          <Form.Item>
            <Space>
              <Button
                type="primary"
                onClick={() => editTemplateHandler(params)}
              >
                Сохранить
              </Button>
              <Button
                onClick={() => {
                  navigate(`/templates`);
                }}
              >
                Закрыть
              </Button>
              <Button danger onClick={() => deleteTemplateHandler(params)}>
                Удалить
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Content>
    </>
  );
};
