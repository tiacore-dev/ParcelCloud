import * as React from "react";
import { Form, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { editTemplate } from "../../../store/modules/pages/template";
import { getCities } from "../../../store/modules/dictionaries/selectors/cities.selector";
import { IState } from "../../../store/modules";

export const TemplateContent = () => {
  const dispatch = useDispatch();
  const templateData = useSelector((state: IState) => state.pages.template);
  const componentDisabled = useSelector(
    (state: IState) => state.pages.template.disabled,
  );
  const cities = useSelector(getCities);
  const citySelectOptions = cities.map((city) => ({
    label: city,
    value: city,
  }));

  return (
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
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={citySelectOptions}
        />
      </Form.Item>
      <Form.Item label="Адрес">
        <Input
          value={templateData.address}
          onChange={(event) =>
            dispatch(editTemplate.setTemplatStateAddress(event.target.value))
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
            dispatch(editTemplate.setTemplatStateCompany(event.target.value))
          }
        />
      </Form.Item>

      <Form.Item label="Доп. информация">
        <Input
          value={templateData.addInfo}
          onChange={(event) =>
            dispatch(editTemplate.setTemplatStateAddInfo(event.target.value))
          }
        />
      </Form.Item>
    </Form>
  );
};
