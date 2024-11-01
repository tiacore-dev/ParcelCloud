import { Breadcrumb, Form, InputNumber, Layout, Select, Table } from "antd";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../store/modules";
import {
  clearPricesState,
  editPrices,
  getPricesFailure,
  getPricesRequest,
  getPricesSuccess,
} from "../../store/modules/pages/prices";
import { ItemsTable } from "./components/itemsTable";
import { IauthToken, authToken } from "../../hooks/useAuth";
import { useApi } from "../../hooks/useApi";
import { IPrice } from "../../interfaces/prices/IPrice";
import { pricesColumns } from "./components/pricesCollumns";
import {
  clearCreateParcelState,
  editParcelAction,
} from "../../store/modules/editableEntities/editableParcel";
import { delTypeEnum } from "../../enumerations/delTypeEnum";
import { useNavigate } from "react-router-dom";
import {
  temperatureSelectOptions,
  temperatureValues,
} from "../../enumerations/temperatires";
import { minPageHeight } from "../../utils/pageSettings";
import "./prices.less";
import { isMobile } from "../../utils/isMobile";
import { getCities } from "../../store/modules/dictionaries/selectors/cities.selector";
import {
  setAppHeaderTitle,
  setShowBackButton,
} from "../../store/modules/settings/general";
import { selectFilterHandler } from "../../utils/selectFilterHandler";

interface GetPricesDto {
  authToken: IauthToken;
  sendCity: string;
  recCity: string;
}

export interface GetParcelResponce {
  prices: IPrice[];
  temperatureModify: number;
  vatExtra: boolean;
  bonusModify: number;
}

export const Prices = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cities = useSelector(getCities);
  const { Content } = Layout;
  const citySelectOptions = cities.map((city) => ({
    label: city,
    value: city,
  }));
  const data = useSelector((state: IState) => state.pages.prices);

  const getPricesParams: GetPricesDto = {
    authToken: authToken(),
    sendCity: data.sendCity,
    recCity: data.recCity,
  };
  const handleCreate = (delType: keyof typeof delTypeEnum) => {
    dispatch(clearCreateParcelState());

    dispatch(editParcelAction.setSendCity(data.sendCity));
    dispatch(editParcelAction.setRecCity(data.recCity));
    dispatch(editParcelAction.settMax(data.tMax));
    dispatch(editParcelAction.settMin(data.tMin));

    dispatch(editParcelAction.setDelType(delType));
    dispatch(editParcelAction.setItems(data.items));

    dispatch(editParcelAction.setInsureValue(data.insureValue));

    navigate("/parcels/create");
  };

  const onTemperatureSelect = (value: string) => {
    const temperature = temperatureValues[value];
    if (temperature) {
      dispatch(editPrices.settMin(temperature.min));
      dispatch(editPrices.settMax(temperature.max));
    }
  };

  const useTemperatureModify = data.tMax !== 0 || data.tMin !== 0;

  const temperatureModify = !!data.temperatureModify
    ? data.temperatureModify
    : data.tMax < 0
    ? 1.5
    : 1.3;

  const priceCollumns = pricesColumns(
    Math.max(data.weight, data.volume),
    useTemperatureModify ? temperatureModify : 0,
    data.vatExtra,
    data.bonusModify,
    data.insureValue,
    handleCreate
  );

  React.useEffect(() => {
    if (isMobile()) {
      dispatch(setShowBackButton(false));
      dispatch(setAppHeaderTitle("Расчет тарифа"));
    }
    dispatch(clearPricesState());
  }, []);

  React.useEffect(() => {
    if (data.sendCity !== "" && data.recCity !== "") {
      dispatch(getPricesRequest());
      useApi<GetParcelResponce, GetPricesDto>("prices", "get", getPricesParams)
        .then((pricesData) => {
          dispatch(getPricesSuccess(pricesData));
        })
        .catch((err) => {
          dispatch(getPricesFailure(err));
        });
    }
  }, [data.sendCity, data.recCity]);

  return (
    <>
      <Breadcrumb
        style={isMobile() && { backgroundColor: "#F8F8F8" }}
        className="breadcrumb"
        items={[{ title: "Главная" }, { title: "Расчет тарифа" }]}
      />
      <Content
        style={{
          padding: 16,
          margin: 0,
          minHeight: minPageHeight(),
          background: "#FFF",
        }}
      >
        <Form
          labelCol={{ span: isMobile() ? 8 : 4 }}
          layout={isMobile() ? "vertical" : "horizontal"}
        >
          <Form.Item label="Город отправителя" className="prices__form_item">
            <Select
              value={data.sendCity}
              showSearch
              optionFilterProp="children"
              onChange={(value: string) =>
                dispatch(editPrices.setSendCity(value))
              }
              filterOption={selectFilterHandler}
              options={citySelectOptions}
            />
          </Form.Item>

          <Form.Item label="Город получателя" className="prices__form_item">
            <Select
              value={data.recCity}
              showSearch
              optionFilterProp="children"
              onChange={(value: string) =>
                dispatch(editPrices.setRecCity(value))
              }
              filterOption={selectFilterHandler}
              options={citySelectOptions}
            />
          </Form.Item>

          <Form.Item label="Температурный режим" className="prices__form_item">
            <Select
              value={data.tMin.toString() + data.tMax.toString()}
              optionFilterProp="children"
              onChange={onTemperatureSelect}
              options={temperatureSelectOptions}
            />
          </Form.Item>
          <Form.Item label="Страховая стоимость" className="prices__form_item">
            <InputNumber
              style={{ width: "100%" }}
              value={data.insureValue}
              onChange={(value) => dispatch(editPrices.setInsureValue(value))}
            />
          </Form.Item>
        </Form>
        <div style={{ marginTop: 16, marginBottom: 6 }}>Грузы:</div>

        <ItemsTable data={data} />

        <Form
          labelCol={{ span: isMobile() ? 8 : 4 }}
          layout={isMobile() ? "vertical" : "horizontal"}
        >
          <Form.Item
            label="Общее количество мест"
            className="prices__form_item"
          >
            <InputNumber value={data.qt} readOnly />
          </Form.Item>

          <Form.Item label="Общий вес" className="prices__form_item">
            <InputNumber value={data.weight} readOnly />
          </Form.Item>

          <Form.Item label="Общий объемный вес" className="prices__form_item">
            <InputNumber value={data.volume} readOnly precision={3} />
          </Form.Item>
          {!!data.recCity && !!data.sendCity && !!data.prices?.length ? (
            <Form.Item label="Доступные тарифы">
              <Table
                columns={priceCollumns}
                rowClassName={() => "editable-row"}
                dataSource={data.prices.map((item, index) => ({
                  ...item,
                  key: index,
                }))}
                bordered
                size="middle"
                pagination={false}
              />
            </Form.Item>
          ) : (
            !!data.recCity &&
            !!data.sendCity && (
              <Form.Item label="Доступные тарифы">
                {!!data.loading
                  ? "Загрузка..."
                  : "Нет доступных тарифов по заданному направлению"}
              </Form.Item>
            )
          )}
        </Form>
      </Content>
    </>
  );
};
