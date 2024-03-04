import * as React from "react";
import {
  Breadcrumb,
  Layout,
  Form,
  Input,
  Button,
  InputNumber,
  message,
  Table,
  Select,
} from "antd";
import Title from "antd/es/typography/Title";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../store/modules";
import { editParcelAction } from "../../store/modules/editableEntities/editableParcel";
import { useNavigate } from "react-router-dom";
import { authToken } from "../../hooks/useAuth";
import { minPageHeight } from "../../utils/pageSettings";
import { isMobile } from "../../utils/isMobile";
import "./createManifest.less";
import { IParcel } from "../../interfaces/parcels/IParcel";
import { CreateManifestDto } from "./dto/createManifest.dto";
import { editManifestAction } from "../../store/modules/editableEntities/editableManifest";
import { createManifest } from "../../hooks/ApiActions/manifest";
import { parcelsInStorageMobileColumns } from "../parcelsInStorage/components/mobile.columns";
import { parcelsInEditableManifestDesktopColumns } from "./components/desktop.columns";
import { getParcelsInStorage } from "../../hooks/ApiActions/parcel";
import { IParcelsInStorageList } from "../../interfaces/parcels/IParcelsList";
import Search from "antd/es/input/Search";
import { getCities } from "../../store/modules/dictionaries/selectors/cities.selector";
import { selectFilterHandler } from "../../utils/selectFilterHandler";

interface ICreateManifestProps {
  parcel?: IParcel;
  hideSaveButton?: boolean;
}

export const CreateManifest = (props: ICreateManifestProps) => {
  const { parcel, hideSaveButton } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cities = useSelector(getCities);
  const citySelectOptions = cities.map((city) => ({
    label: city,
    value: city,
  }));

  const data = useSelector(
    (state: IState) => state.editableEntities.editableManifest
  );

  const { Content } = Layout;

  React.useEffect(() => {
    if (parcel) {
      dispatch(editParcelAction.setParcelData(parcel));
    }
  }, []);

  const [barcode, setBarcode] = React.useState<string>("");

  const [componentDisabled, setComponentDisabled] =
    React.useState<boolean>(false);
  const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
    setComponentDisabled(disabled);
  };

  const [messageApi, contextHolder] = message.useMessage();

  const token = authToken();

  const createManifestParams: CreateManifestDto = {
    ...data,
    parcels: data.parcels.map((parcel) => parcel.id),
    authToken: token,
  };

  const onError = (err: string) => {
    messageApi.open({
      type: "error",
      content: err,
    });
  };

  const handleSave = () => {
    createManifest(dispatch, navigate, createManifestParams, onError);
  };

  const title = React.useMemo(
    () =>
      data.id
        ? "Редактирование манифеста " + data.number
        : "Создание манифеста",
    [data.id]
  );

  const parcelsOnStorage = useSelector(
    (state: IState) => state.pages.parcelsInStorage.data
  );

  const handleAddParcel = (parcelNumber: string) => {
    setBarcode(parcelNumber);

    if (
      data.parcels.filter((parcel) => parcel.number === parcelNumber).length !==
      0
    ) {
      onError(`Накладная ${parcelNumber} уже добавлена`);
      setBarcode("");
      return;
    }

    const parcelFromList = parcelsOnStorage.find(
      (parcel) => parcel.number === parcelNumber
    );

    if (parcelFromList) {
      dispatch(editManifestAction.addParcel(parcelFromList));
      setBarcode("");
    } else {
      getParcelsInStorage(
        dispatch,
        {
          authToken: token,
        },
        (data: IParcelsInStorageList[]) => {
          const parcelFromList = data.find(
            (parcel) => parcel.number === parcelNumber
          );
          if (parcelFromList) {
            editManifestAction.addParcel(parcelFromList);
            setBarcode("");
          } else {
            onError(`Не удалось найти накладную ${parcelNumber}`);
          }
        }
      );
    }
  };

  const setRecCityHandle = (value: string) =>
    dispatch(editManifestAction.setRecCity(value));

  return (
    <>
      {contextHolder}

      <Breadcrumb
        className="breadcrumb"
        style={isMobile() && { backgroundColor: "#F8F8F8" }}
        items={[
          { title: "Главная" },
          {
            title: "Манифесты",
            // <Link to="/parcels">Накладные</Link>
          },
          { title: "Создать манифест" },
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
          {!!data.id && (
            <Form.Item label="Номер манифеста">
              <Input value={data.number} readOnly />
            </Form.Item>
          )}

          <Form.Item label="Город получения">
            <Select
              value={data.recCity}
              showSearch
              optionFilterProp="children"
              onChange={setRecCityHandle}
              filterOption={selectFilterHandler}
              options={citySelectOptions}
            />
          </Form.Item>

          <Form.Item label="Номер накладной перевозчика">
            <Input
              value={data.transferNumber}
              onChange={(e) => {
                dispatch(editManifestAction.setTransferNumber(e.target.value));
              }}
            />
          </Form.Item>

          <Form.Item label="Перевозчик">
            <Input
              value={data.manifestCompany}
              onChange={(e) => {
                dispatch(editManifestAction.setManifestCompany(e.target.value));
              }}
            />
          </Form.Item>

          <Form.Item label="Количество накладных">
            <InputNumber value={data.qtParcels} readOnly />
          </Form.Item>

          <Form.Item label="Количество мест">
            <InputNumber
              value={data.qtItems}
              min={1}
              onChange={(e) => {
                dispatch(editManifestAction.setQtItems(e));
              }}
            />
          </Form.Item>

          <Form.Item label="Общий вес">
            <InputNumber
              min={0}
              value={data.weight}
              onChange={(e) => {
                dispatch(editManifestAction.setWeight(e));
              }}
            />
          </Form.Item>

          <Form.Item label="Общий объемный вес">
            <InputNumber
              min={0}
              value={data.volume}
              onChange={(e) => {
                dispatch(editManifestAction.setVolume(e));
              }}
            />
          </Form.Item>

          <Form.Item>
            <Search
              placeholder="Добавить накладную по номеру"
              onSearch={(e) => handleAddParcel(e)}
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              style={{ maxWidth: "300px" }}
            />
          </Form.Item>

          <Table
            dataSource={data.parcels}
            columns={
              isMobile()
                ? parcelsInStorageMobileColumns()
                : parcelsInEditableManifestDesktopColumns(navigate, dispatch)
            }
            pagination={false}
          />

          {!hideSaveButton && (
            <Form.Item>
              <Button
                style={{ marginTop: "12px" }}
                loading={data.sent}
                onClick={handleSave}
                type="primary"
                disabled={data.parcels.length === 0}
              >
                Сохранить манифест
              </Button>
            </Form.Item>
          )}
        </Form>
      </Content>
    </>
  );
};
