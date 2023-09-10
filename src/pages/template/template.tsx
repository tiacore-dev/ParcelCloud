import * as React from "react";
import { Breadcrumb, Button, Form, Input, Layout, Select, Space } from "antd";
import { Link, useParams } from "react-router-dom";
// import { ITemplatesRouteParams } from "../../core/router";
import { useDispatch, useSelector } from "react-redux";
import { useApi } from "../../hooks/useApi";
import { IauthToken, authToken } from "../../hooks/useAuth";
import { IState } from "../../store/modules";
import { ITemplate } from "../../interfaces/templates/ITemplate";
import {
  clearTemplateState,
  editTemplate,
  setTemplatStateData,
} from "../../store/modules/pages/template";
import { useNavigate } from "react-router-dom";
import {
  getTemplatesFailure,
  getTemplatesRequest,
  getTemplatesSuccess,
} from "../../store/modules/pages/templates";
import { minPageHeight } from "../../utils/pageSettings";
import { getCities } from "../../store/modules/dictionaries/selectors/cities.selector";

interface EditeTemplateDto extends ITemplate {
  authToken: IauthToken;
}

export const Template = () => {
  const { Content } = Layout;

  const routeParams = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const templatesData = useSelector(
    (state: IState) => state.pages.templates.data,
  );
  const templateData = useSelector((state: IState) => state.pages.template);
  const cities = useSelector(getCities);
  const citySelectOptions = cities.map((city) => ({
    label: city,
    value: city,
  }));
  const params: EditeTemplateDto = {
    ...templateData,
    authToken: authToken(),
    id: routeParams.templateId,
  };

  const [componentDisabled, setComponentDisabled] =
    React.useState<boolean>(false);

  const editTemplateHandler = () => {
    setComponentDisabled(true);
    useApi<ITemplate[], EditeTemplateDto>("templateedit", "edit", params)
      .then((templatesData) => {
        dispatch(getTemplatesSuccess(templatesData));
        navigate(`/templates`);
      })
      .catch((err) => {
        dispatch(getTemplatesFailure(err));
        navigate(`/templates`);
      });
  };

  const deleteTemplateHandler = () => {
    setComponentDisabled(true);
    dispatch(getTemplatesRequest());
    useApi<ITemplate[], EditeTemplateDto>("templatedelete", "delete", params)
      .then((templatesData) => {
        dispatch(getTemplatesSuccess(templatesData));
        navigate(`/templates`);
      })
      .catch((err) => {
        dispatch(getTemplatesFailure(err));
        navigate(`/templates`);
      });
  };

  React.useEffect(() => {
    setComponentDisabled(false);
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
        style={{
          margin: "16px 0",
        }}
        items={[
          <Breadcrumb.Item>Главная</Breadcrumb.Item>,
          <Breadcrumb.Item>
            <Link to="/templates">Шаблоны</Link>
          </Breadcrumb.Item>,
          <Breadcrumb.Item>
            {routeParams.templateId !== "create"
              ? "Создать шаблон"
              : templateData?.name}
          </Breadcrumb.Item>,
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
        <Form
          labelCol={{ flex: "150px" }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          layout="horizontal"
          disabled={componentDisabled}
          colon={false}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item label="Название">
            <Input
              value={templateData.name}
              onChange={(event) =>
                dispatch(editTemplate.setTemplatStateName(event.target.value))
              }
            />
          </Form.Item>
          <Form.Item label="Город">
            <Select
              value={templateData.city}
              showSearch
              optionFilterProp="children"
              onChange={(value: string) =>
                dispatch(editTemplate.setTemplatStateCity(value))
              }
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={citySelectOptions}
            />
          </Form.Item>
          <Form.Item label="Адрес">
            <Input
              value={templateData.address}
              onChange={(event) =>
                dispatch(
                  editTemplate.setTemplatStateAddress(event.target.value),
                )
              }
            />
          </Form.Item>
          <Form.Item label="Контактное лицо">
            <Input
              value={templateData.person}
              onChange={(event) =>
                dispatch(editTemplate.setTemplatStatePerson(event.target.value))
              }
            />
          </Form.Item>
          <Form.Item label="Телефон">
            <Input
              value={templateData.phone}
              onChange={(event) =>
                dispatch(editTemplate.setTemplatStatePhone(event.target.value))
              }
            />
          </Form.Item>
          <Form.Item label="Компания">
            <Input
              value={templateData.company}
              onChange={(event) =>
                dispatch(
                  editTemplate.setTemplatStateCompany(event.target.value),
                )
              }
            />
          </Form.Item>

          <Form.Item label="Доп. информация">
            <Input
              value={templateData.addInfo}
              onChange={(event) =>
                dispatch(
                  editTemplate.setTemplatStateAddInfo(event.target.value),
                )
              }
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" onClick={editTemplateHandler}>
                Сохранить
              </Button>
              <Button
                onClick={() => {
                  navigate(`/templates`);
                }}
              >
                Закрыть
              </Button>
              <Button danger onClick={deleteTemplateHandler}>
                Удалить
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Content>
    </>
  );
};
