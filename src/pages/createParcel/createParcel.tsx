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
  Space,
} from "antd";
import Title from "antd/es/typography/Title";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../store/modules";
import { editParcelAction } from "../../store/modules/editableEntities/editableParcel";
import { delTypeSelectOptions } from "../../enumerations/delTypeEnum";
import { PayTypeSelectOptions } from "../../enumerations/payTypeEnum";
import { ItemsTable } from "./components/itemsTable";
import { useApi } from "../../hooks/useApi";
import { CreateParcelDto } from "./dto/createParcel.dto";
import { useNavigate } from "react-router-dom";
import { authToken, checkPermission } from "../../hooks/useAuth";
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
import { getCustomers, getPayers } from "../../store/modules/auth";
import { IParcel } from "../../interfaces/parcels/IParcel";
import { createParcel } from "../../hooks/ApiActions/parcel";
import { ActionDialog } from "../../hooks/ActionDialogs";
import { AppstoreTwoTone } from "@ant-design/icons";
import { TemplateContent } from "../template/components/content";
import { ITemplate } from "../../interfaces/templates/ITemplate";
import { setTemplatStateData } from "../../store/modules/pages/template";
import {
  EditeTemplateDto,
  editTemplateAction,
} from "../../hooks/ApiActions/templates";
import {
  setAppHeaderTitle,
  setShowBackButton,
} from "../../store/modules/settings/general";
import { selectFilterHandler } from "../../utils/selectFilterHandler";

interface ICreateParcelProps {
  parcel?: IParcel;
  copy?: boolean;
  hideTemplates?: boolean;
  hideSaveButton?: boolean;
  showItemsOnly?: boolean;
}

export const CreateParcel = (props: ICreateParcelProps) => {
  const { parcel, hideTemplates, hideSaveButton, showItemsOnly, copy } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { TextArea } = Input;
  const data = useSelector(
    (state: IState) => state.editableEntities.editableParcel,
  );
  const cities = useSelector(getCities);
  const company = useSelector((s: IState) => s.auth.company);
  const customers = useSelector(getCustomers);
  const payers = useSelector(getPayers);

  const { Content } = Layout;
  const citySelectOptions = cities.map((city) => ({
    label: city,
    value: city,
  }));

  const customerSelectOptions = [
    {
      label: company.name,
      value: company.id,
    },
  ];

  customers.forEach((customer) =>
    customerSelectOptions.push({
      label: customer.name,
      value: customer.id,
    }),
  );

  const payerSelectOptions = payers.map((payer) => ({
    label: payer.name,
    value: payer.id,
  }));

  const title = React.useMemo(
    () => (data.id ? "Редактирование " + data.number : "Создание накладной"),
    [data.id],
  );

  React.useEffect(() => {
    if (isMobile()) {
      dispatch(setShowBackButton(true));
      dispatch(setAppHeaderTitle(title));
    }
  }, [title]);

  React.useEffect(() => {
    if (!data.customer) {
      dispatch(editParcelAction.setCustomer(company.id));
    }
    if (!data.payer && !!payers.length) {
      dispatch(editParcelAction.setPayer(payers[0].id));
    }
    if (parcel) {
      if (copy) {
        dispatch(editParcelAction.setCopyParcelData(parcel));
      } else {
        dispatch(editParcelAction.setParcelData(parcel));
      }
    }
  }, []);

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
    (state: IState) => state.dictionaries.templates.data,
  );

  const token = authToken();

  const createParcelParams: CreateParcelDto = {
    ...data,
    authToken: token,
  };

  const onError = (err: string) => {
    messageApi.open({
      type: "error",
      content: err,
    });
  };

  const handleSave = () => {
    createParcel(dispatch, navigate, createParcelParams, onError);
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

        dispatch(editParcelAction.setCost(result.cost));
      })
      .catch(() => {});
  };

  const onTemperatureSelect = (value: string) => {
    const temperature = temperatureValues[value];
    if (temperature) {
      dispatch(editParcelAction.settMin(temperature.min));
      dispatch(editParcelAction.settMax(temperature.max));
    }
  };

  const onSendTemplateRowClick = (id: string) => {
    const templateData = templatesData.find((template) => template.id === id);

    dispatch(editParcelAction.setSendCity(templateData.city));
    dispatch(editParcelAction.setSendAddInfo(templateData.addInfo));
    dispatch(editParcelAction.setSendAddress(templateData.address));
    dispatch(editParcelAction.setSendCompany(templateData.company));
    dispatch(editParcelAction.setSendPerson(templateData.person));
    dispatch(editParcelAction.setSendPhone(templateData.phone));

    setIsSendModalOpen(false);
  };

  const onRecTemplateRowClick = (id: string) => {
    const templateData = templatesData.find((template) => template.id === id);

    dispatch(editParcelAction.setRecCity(templateData.city));
    dispatch(editParcelAction.setRecAddInfo(templateData.addInfo));
    dispatch(editParcelAction.setRecAddress(templateData.address));
    dispatch(editParcelAction.setRecCompany(templateData.company));
    dispatch(editParcelAction.setRecPerson(templateData.person));
    dispatch(editParcelAction.setRecPhone(templateData.phone));

    setIsRecModalOpen(false);
  };

  const errors = {
    sendCity: !cities.includes(data.sendCity),
    recCity: !cities.includes(data.recCity),
  };

  const templateData = useSelector((state: IState) => state.pages.template);

  const templateParams: EditeTemplateDto = {
    ...templateData,
    authToken: token,
    id: "create",
  };

  const senderToTemplate = (
    <ActionDialog
      buttonText="Сохранить в шаблон"
      buttonIcon={<AppstoreTwoTone twoToneColor="#ff1616" />}
      modalTitle={"Сохранить шаблон"}
      modalText={<TemplateContent />}
      onOpen={() => {
        const templateData: ITemplate = {
          city: data.sendCity,
          address: data.sendAddress,
          company: data.sendCompany,
          person: data.sendPerson,
          phone: data.sendPhone,
          addInfo: data.sendAddInfo,
        };

        dispatch(setTemplatStateData(templateData));
      }}
      onConfirm={() => editTemplateAction(dispatch, templateParams)}
    />
  );

  const recipientToTemplate = (
    <ActionDialog
      buttonText="Сохранить в шаблон"
      buttonIcon={<AppstoreTwoTone twoToneColor="#ff1616" />}
      modalTitle={"Сохранить шаблон"}
      modalText={<TemplateContent />}
      onOpen={() => {
        const templateData: ITemplate = {
          city: data.recCity,
          address: data.recAddress,
          company: data.recCompany,
          person: data.recPerson,
          phone: data.recPhone,
          addInfo: data.recAddInfo,
        };

        dispatch(setTemplatStateData(templateData));
      }}
      onConfirm={() => editTemplateAction(dispatch, templateParams)}
    />
  );

  return (
    <>
      {contextHolder}

      <Breadcrumb
        className="breadcrumb"
        style={isMobile() && { backgroundColor: "#F8F8F8" }}
        items={[
          { title: "Главная" },
          {
            title: "Накладные",
            // <Link to="/parcels">Накладные</Link>
          },
          { title: "Создать накладную" },
        ]}
      />
      <Content
        style={{
          padding: "0 24px",
          margin: 0,
          minHeight: minPageHeight(),
          background: "#FFF",
        }}
      >
        <Title level={3}>{title}</Title>
        <Form
          labelCol={{ span: isMobile() ? 8 : 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onValuesChange={onFormLayoutChange}
          disabled={componentDisabled}
        >
          {!showItemsOnly && (
            <Row>
              <Col span={isMobile() ? 24 : 12}>
                <Form.Item>Данные отправителя</Form.Item>

                {!hideTemplates && (
                  <Form.Item noStyle>
                    <Space
                      direction={isMobile() ? "vertical" : "horizontal"}
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginRight: "25%",
                        marginBottom: "24px",
                      }}
                    >
                      <Button type="primary" onClick={showSendModal}>
                        Заполнить из шаблона
                      </Button>
                      {isSendModalOpen && (
                        <Modal
                          title="Данные отправителя: выберите шаблон"
                          open={isSendModalOpen}
                          width={"95%"}
                          footer={false}
                          onCancel={() => {
                            setIsSendModalOpen(false);
                          }}
                        >
                          <TemplatesTable
                            onRowClick={onSendTemplateRowClick}
                            search
                          />
                        </Modal>
                      )}
                      {senderToTemplate}
                    </Space>
                  </Form.Item>
                )}

                <Form.Item label="Город">
                  <Select
                    value={data.sendCity}
                    showSearch
                    status={errors.sendCity && "error"}
                    optionFilterProp="children"
                    onChange={(value: string) =>
                      dispatch(editParcelAction.setSendCity(value))
                    }
                    filterOption={selectFilterHandler}
                    options={citySelectOptions}
                  />
                </Form.Item>

                <Form.Item label="Адрес">
                  <Input
                    value={data.sendAddress}
                    onChange={(event) =>
                      dispatch(
                        editParcelAction.setSendAddress(event.target.value),
                      )
                    }
                  />
                </Form.Item>

                <Form.Item label="Компания">
                  <Input
                    value={data.sendCompany}
                    onChange={(event) =>
                      dispatch(
                        editParcelAction.setSendCompany(event.target.value),
                      )
                    }
                  />
                </Form.Item>

                <Form.Item label="Контактное лицо">
                  <Input
                    value={data.sendPerson}
                    onChange={(event) =>
                      dispatch(
                        editParcelAction.setSendPerson(event.target.value),
                      )
                    }
                  />
                </Form.Item>

                <Form.Item label="Контактный телефон">
                  <Input
                    value={data.sendPhone}
                    onChange={(event) =>
                      dispatch(
                        editParcelAction.setSendPhone(event.target.value),
                      )
                    }
                  />
                </Form.Item>

                <Form.Item label="Доп. информация">
                  <TextArea
                    value={data.sendAddInfo}
                    onChange={(event) =>
                      dispatch(
                        editParcelAction.setSendAddInfo(event.target.value),
                      )
                    }
                    rows={4}
                  />
                </Form.Item>
              </Col>
              <Col span={isMobile() ? 24 : 12}>
                <Form.Item>Данные получателя</Form.Item>
                {!hideTemplates && (
                  <Form.Item noStyle>
                    <Space
                      direction={isMobile() ? "vertical" : "horizontal"}
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginRight: "25%",
                        marginBottom: "24px",
                      }}
                    >
                      <Button type="primary" onClick={showRecModal}>
                        Заполнить из шаблона
                      </Button>

                      {isRecModalOpen && (
                        <Modal
                          title="Данные получателя: выберите шаблон"
                          open={isRecModalOpen}
                          width={"95%"}
                          footer={false}
                          onCancel={() => {
                            setIsRecModalOpen(false);
                          }}
                        >
                          <TemplatesTable
                            onRowClick={onRecTemplateRowClick}
                            search
                          />
                        </Modal>
                      )}

                      {recipientToTemplate}
                    </Space>
                  </Form.Item>
                )}

                <Form.Item label="Город">
                  <Select
                    value={data.recCity}
                    status={errors.recCity && "error"}
                    showSearch
                    optionFilterProp="children"
                    onChange={(value: string) =>
                      dispatch(editParcelAction.setRecCity(value))
                    }
                    filterOption={selectFilterHandler}
                    options={citySelectOptions}
                  />
                </Form.Item>

                <Form.Item label="Адрес">
                  <Input
                    value={data.recAddress}
                    onChange={(event) =>
                      dispatch(
                        editParcelAction.setRecAddress(event.target.value),
                      )
                    }
                  />
                </Form.Item>

                <Form.Item label="Компания">
                  <Input
                    value={data.recCompany}
                    onChange={(event) =>
                      dispatch(
                        editParcelAction.setRecCompany(event.target.value),
                      )
                    }
                  />
                </Form.Item>

                <Form.Item label="Контактное лицо">
                  <Input
                    value={data.recPerson}
                    onChange={(event) =>
                      dispatch(
                        editParcelAction.setRecPerson(event.target.value),
                      )
                    }
                  />
                </Form.Item>

                <Form.Item label="Контактный телефон">
                  <Input
                    value={data.recPhone}
                    onChange={(event) =>
                      dispatch(editParcelAction.setRecPhone(event.target.value))
                    }
                  />
                </Form.Item>

                <Form.Item label="Доп. информация">
                  <TextArea
                    value={data.recAddInfo}
                    onChange={(event) =>
                      dispatch(
                        editParcelAction.setRecAddInfo(event.target.value),
                      )
                    }
                    rows={4}
                  />
                </Form.Item>
              </Col>
            </Row>
          )}

          {!!data.id && (
            <Form.Item label="Номер накладной">
              <Input
                value={data.number}
                onChange={(e) =>
                  dispatch(editParcelAction.setNumber(e.target.value))
                }
              />
            </Form.Item>
          )}

          {!showItemsOnly && (
            <>
              {customerSelectOptions.length > 1 &&
                checkPermission("parcel-customer-set") && (
                  <Form.Item label="Заказчик">
                    <Select
                      value={data.customer}
                      showSearch
                      optionFilterProp="children"
                      onChange={(value: string) =>
                        dispatch(editParcelAction.setCustomer(value))
                      }
                      filterOption={selectFilterHandler}
                      options={customerSelectOptions}
                    />
                  </Form.Item>
                )}

              {payerSelectOptions.length > 1 && (
                <Form.Item label="Плательщик">
                  <Select
                    value={data.payer}
                    showSearch
                    optionFilterProp="children"
                    onChange={(value: string) =>
                      dispatch(editParcelAction.setPayer(value))
                    }
                    filterOption={selectFilterHandler}
                    options={payerSelectOptions}
                  />
                </Form.Item>
              )}

              <Form.Item label="Дата вызова курьера">
                <DatePicker
                  value={dayjs(data.date)}
                  placeholder="Дата начала"
                  onChange={(value) =>
                    dispatch(editParcelAction.setDate(value.valueOf()))
                  }
                  format={dateFormat}
                  onFocus={(e) => e.target.blur()}
                />
              </Form.Item>

              {/* <Form.Item label="Номер заказа">
                <Input
                  value={data.orderNumber}
                  onChange={(e) =>
                    dispatch(editParcelAction.setOrderNumber(e.target.value))
                  }
                />
              </Form.Item> */}

              <Form.Item label="Время приезда курьера">
                <Input
                  value={data.sendTime}
                  onChange={(e) =>
                    dispatch(editParcelAction.setSendTime(e.target.value))
                  }
                />
              </Form.Item>

              <Form.Item label="Тип доставки">
                <Select
                  value={data.delType}
                  options={delTypeSelectOptions}
                  onChange={(value) =>
                    dispatch(editParcelAction.setDelType(value))
                  }
                />
              </Form.Item>

              <Form.Item label="Тип оплаты">
                <Select
                  value={data.payType}
                  options={PayTypeSelectOptions}
                  onChange={(value) =>
                    dispatch(editParcelAction.setPayType(value))
                  }
                />
              </Form.Item>

              <Form.Item label="Страховая стоимость">
                <InputNumber
                  value={data.insureValue}
                  min={0}
                  onChange={(value) =>
                    dispatch(editParcelAction.setInsureValue(value))
                  }
                />
              </Form.Item>

              <Form.Item label="Хрупкий груз" valuePropName="checked">
                <Switch
                  checked={data.fragile}
                  onChange={() => dispatch(editParcelAction.toggleFragile())}
                />
              </Form.Item>

              <Form.Item label="Аренда термоконтейнера" valuePropName="checked">
                <Switch
                  checked={data.containerRent}
                  onChange={() =>
                    dispatch(editParcelAction.toggleContainerRent())
                  }
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
              <Form.Item label="Описание вложения">
                <TextArea
                  value={data.description}
                  onChange={(e) =>
                    dispatch(editParcelAction.setDescription(e.target.value))
                  }
                />
              </Form.Item>
            </>
          )}
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
            <Form.Item label="Стоимость доставки">{data.cost} руб.</Form.Item>
          )}
          {!!data.cost && !!data.insureValue && (
            <Form.Item label="Стоимость страховки">
              {data.insureValue * 0.03} руб.
            </Form.Item>
          )}
          {!hideSaveButton && (
            <Form.Item>
              <Button
                loading={data.sent}
                onClick={handleSave}
                type="primary"
                disabled={errors.recCity || errors.sendCity}
              >
                Сохранить накладную
              </Button>
            </Form.Item>
          )}
        </Form>
      </Content>
    </>
  );
};
