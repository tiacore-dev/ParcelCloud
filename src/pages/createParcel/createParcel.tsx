import * as React from "react";
import {
  Breadcrumb,
  Layout,
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  Switch,
  Row,
  Col,
  Modal,
  message,
  DatePicker,
} from "antd";
import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../store/modules";
import {
  clearCreateParcelState,
  editParcel,
} from "../../store/modules/editableEntities/editableParcel";
import { delTypeSelectOptions } from "../../enumerations/delTypeEnum";
import { PayTypeSelectOptions } from "../../enumerations/payTypeEnum";
import { ItemsTable } from "./components/itemsTable";
import { useApi } from "../../hooks/useApi";
import { CreateParcelDto } from "./dto/createParcel.dto";
import { pushPath } from "../../core/history";
import { authToken } from "../../hooks/useAuth";
import { TemplatesTable } from "../templates/components/table";
import {
  temperatureSelectOptions,
  temperatureValues,
} from "../../enumerations/temperatires";
import { CalculateDto } from "./dto/calculate.dto";
import dayjs from "dayjs";
import { dateFormat } from "../../utils/dateConverter";
import { clearTemplatesSettingsState } from "../../store/modules/settings/templates";
import { minPageHeight } from "../../utils/pageSettings";
import { isMobile } from "../../utils/isMobile";
import "./createParcel.less";
import { getCities } from "../../store/modules/dictionaries/selectors/cities.selector";

export const CreateParcel = () => {
  const dispatch = useDispatch();
  const { TextArea } = Input;
  const data = useSelector(
    (state: IState) => state.editableEntities.editableParcel,
  );
  const cities = useSelector(getCities);
  const { Content } = Layout;
  const citySelectOptions = cities.map((city) => ({
    label: city,
    value: city,
  }));
  const [componentDisabled, setComponentDisabled] =
    React.useState<boolean>(false);
  const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
    setComponentDisabled(disabled);
  };

  const [isSendModalOpen, setIsSendModalOpen] = React.useState(false);
  const [isRecModalOpen, setIsRecModalOpen] = React.useState(false);

  const showSendModal = () => {
    dispatch(clearTemplatesSettingsState());
    setIsSendModalOpen(true);
  };

  const showRecModal = () => {
    dispatch(clearTemplatesSettingsState());
    setIsRecModalOpen(true);
  };
  const [messageApi, contextHolder] = message.useMessage();

  const templatesData = useSelector(
    (state: IState) => state.pages.templates.data,
  );

  const createParcelParams: CreateParcelDto = {
    ...data,
    authToken: authToken(),
  };

  const handleSave = () => {
    dispatch(editParcel.sendParcel());

    useApi<{ id: string; number: string }, CreateParcelDto>(
      "parcelcreate",
      "create",
      createParcelParams,
    )
      .then((parcelData) => {
        dispatch(editParcel.savedParcel(parcelData));
        pushPath(`/parcels/${parcelData.id}`);
        dispatch(clearCreateParcelState());
      })
      .catch(() => {
        // dispatch(getParcelFailure(err))
      });
  };

  const calculateParams: CalculateDto = {
    authToken: authToken(),
    sendCity: data.sendCity,
    recCity: data.recCity,
    weight: Math.max(data.weight, data.volume),
    delType: data.delType,
    temperature: data.tMax,
  };

  const handleCalculate = () => {
    if (!data.recCity) {
      messageApi.open({
        type: "warning",
        content: String("не заполнен город получателя"),
      });
    }

    if (!data.sendCity) {
      messageApi.open({
        type: "warning",
        content: String("не заполнен город отправителя"),
      });
    }

    useApi<{ cost: number }, CalculateDto>("calculate", "get", calculateParams)
      .then((result) => {
        if (result.cost === 0) {
          messageApi.open({
            type: "warning",
            content: String("Не удалось расчитать тариф"),
          });
        }

        dispatch(editParcel.setCost(result.cost));
      })
      .catch(() => {});
  };

  const onTemperatureSelect = (value: string) => {
    const temperature = temperatureValues[value];
    if (temperature) {
      dispatch(editParcel.settMin(temperature.min));
      dispatch(editParcel.settMax(temperature.max));
    }
  };

  const onSendTemplateRowClick = (id: string) => {
    const templateData = templatesData.find((template) => template.id === id);

    dispatch(editParcel.setSendCity(templateData.city));
    dispatch(editParcel.setSendAddInfo(templateData.addInfo));
    dispatch(editParcel.setSendAddress(templateData.address));
    dispatch(editParcel.setSendCompany(templateData.company));
    dispatch(editParcel.setSendPerson(templateData.person));
    dispatch(editParcel.setSendPhone(templateData.phone));

    setIsSendModalOpen(false);
  };

  const onRecTemplateRowClick = (id: string) => {
    const templateData = templatesData.find((template) => template.id === id);

    dispatch(editParcel.setRecCity(templateData.city));
    dispatch(editParcel.setRecAddInfo(templateData.addInfo));
    dispatch(editParcel.setRecAddress(templateData.address));
    dispatch(editParcel.setRecCompany(templateData.company));
    dispatch(editParcel.setRecPerson(templateData.person));
    dispatch(editParcel.setRecPhone(templateData.phone));

    setIsRecModalOpen(false);
  };

  return (
    <>
      {contextHolder}

      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>Главная</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/parcels">Накладные</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Создать накладную</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        style={{
          padding: "0 24px",
          margin: 0,
          minHeight: minPageHeight(),
          background: "#FFF",
        }}
      >
        <Title level={3}>Создание накладной</Title>
        <Form
          labelCol={{ span: isMobile() ? 8 : 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onValuesChange={onFormLayoutChange}
          disabled={componentDisabled}
        >
          <Row>
            <Col span={isMobile() ? 24 : 12}>
              <Form.Item>Данные отправителя</Form.Item>
              <Form.Item>
                <Button onClick={showSendModal}>Заполнить из шаблона</Button>

                <Modal
                  title="Данные отправителя: выберите шаблон"
                  open={isSendModalOpen}
                  width={1000}
                  footer={false}
                  onCancel={() => {
                    setIsSendModalOpen(false);
                  }}
                >
                  <TemplatesTable onRowClick={onSendTemplateRowClick} search />
                </Modal>
              </Form.Item>

              <Form.Item label="Город">
                <Select
                  value={data.sendCity}
                  showSearch
                  optionFilterProp="children"
                  onChange={(value: string) =>
                    dispatch(editParcel.setSendCity(value))
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
                  value={data.sendAddress}
                  onChange={(event) =>
                    dispatch(editParcel.setSendAddress(event.target.value))
                  }
                />
              </Form.Item>

              <Form.Item label="Компания">
                <Input
                  value={data.sendCompany}
                  onChange={(event) =>
                    dispatch(editParcel.setSendCompany(event.target.value))
                  }
                />
              </Form.Item>

              <Form.Item label="Контактное лицо">
                <Input
                  value={data.sendPerson}
                  onChange={(event) =>
                    dispatch(editParcel.setSendPerson(event.target.value))
                  }
                />
              </Form.Item>

              <Form.Item label="Контактный телефон">
                <Input
                  value={data.sendPhone}
                  onChange={(event) =>
                    dispatch(editParcel.setSendPhone(event.target.value))
                  }
                />
              </Form.Item>

              <Form.Item label="Доп. информация">
                <TextArea
                  value={data.sendAddInfo}
                  onChange={(event) =>
                    dispatch(editParcel.setSendAddInfo(event.target.value))
                  }
                  rows={4}
                />
              </Form.Item>
            </Col>
            <Col span={isMobile() ? 24 : 12}>
              <Form.Item>Данные получателя</Form.Item>
              <Form.Item>
                <Button onClick={showRecModal}>Заполнить из шаблона</Button>

                <Modal
                  title="Данные получателя: выберите шаблон"
                  open={isRecModalOpen}
                  width={1000}
                  footer={false}
                  onCancel={() => {
                    setIsRecModalOpen(false);
                  }}
                >
                  <TemplatesTable onRowClick={onRecTemplateRowClick} search />
                </Modal>
              </Form.Item>

              <Form.Item label="Город">
                <Select
                  value={data.recCity}
                  showSearch
                  optionFilterProp="children"
                  onChange={(value: string) =>
                    dispatch(editParcel.setRecCity(value))
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
                  value={data.recAddress}
                  onChange={(event) =>
                    dispatch(editParcel.setRecAddress(event.target.value))
                  }
                />
              </Form.Item>

              <Form.Item label="Компания">
                <Input
                  value={data.recCompany}
                  onChange={(event) =>
                    dispatch(editParcel.setRecCompany(event.target.value))
                  }
                />
              </Form.Item>

              <Form.Item label="Контактное лицо">
                <Input
                  value={data.recPerson}
                  onChange={(event) =>
                    dispatch(editParcel.setRecPerson(event.target.value))
                  }
                />
              </Form.Item>

              <Form.Item label="Контактный телефон">
                <Input
                  value={data.recPhone}
                  onChange={(event) =>
                    dispatch(editParcel.setRecPhone(event.target.value))
                  }
                />
              </Form.Item>

              <Form.Item label="Доп. информация">
                <TextArea
                  value={data.recAddInfo}
                  onChange={(event) =>
                    dispatch(editParcel.setRecAddInfo(event.target.value))
                  }
                  rows={4}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Дата вызова курьера">
            <DatePicker
              value={dayjs(data.date)}
              placeholder="Дата начала"
              onChange={(value) =>
                dispatch(editParcel.setDate(value.valueOf()))
              }
              format={dateFormat}
            />
          </Form.Item>

          <Form.Item label="Тип доставки">
            <Select
              value={data.delType}
              options={delTypeSelectOptions}
              onChange={(value) => dispatch(editParcel.setDelType(value))}
            />
          </Form.Item>

          <Form.Item label="Тип оплаты">
            <Select
              value={data.payType}
              options={PayTypeSelectOptions}
              onChange={(value) => dispatch(editParcel.setPayType(value))}
            />
          </Form.Item>

          <Form.Item label="Страховая стоимость">
            <InputNumber
              value={data.insureValue}
              min={0}
              onChange={(value) => dispatch(editParcel.setInsureValue(value))}
            />
          </Form.Item>

          <Form.Item label="Хрупкий груз" valuePropName="checked">
            <Switch
              checked={data.fragile}
              onChange={() => dispatch(editParcel.toggleFragile())}
            />
          </Form.Item>

          <Form.Item label="Аренда термоконтейнера" valuePropName="checked">
            <Switch
              checked={data.containerRent}
              onChange={() => dispatch(editParcel.toggleContainerRent())}
            />
          </Form.Item>

          <Form.Item label="Температурный режим">
            <Select
              value={data.tMin.toString() + data.tMax.toString()}
              optionFilterProp="children"
              onChange={onTemperatureSelect}
              options={temperatureSelectOptions}
            />
          </Form.Item>

          <ItemsTable data={data} />

          <Form.Item label="Итого мест">
            <InputNumber value={data.qt} readOnly />
          </Form.Item>

          <Form.Item label="Общий вес">
            <InputNumber value={data.weight} readOnly />
          </Form.Item>

          <Form.Item label="Общий объемный вес">
            <InputNumber value={data.volume} readOnly precision={3} />
          </Form.Item>

          <Form.Item>
            <Button onClick={handleCalculate}>Расчет тарифа</Button>
          </Form.Item>

          {!!data.cost && (
            <Form.Item label="Стоимость доставвки">{data.cost} руб.</Form.Item>
          )}
          <Form.Item>
            <Button onClick={handleSave}>Сохранить накладную</Button>
          </Form.Item>
        </Form>
      </Content>
    </>
  );
};
