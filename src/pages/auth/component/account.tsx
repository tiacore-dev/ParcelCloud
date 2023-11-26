import { Button, Descriptions, Space } from "antd";
import * as React from "react";
import { useDispatch } from "react-redux";
import { authData, checkPermission } from "../../../hooks/useAuth";
import { authlogout } from "../../../store/modules/auth";
import { useloadSourse } from "../../../components/App/App";
import { clearParcelsSettingsState } from "../../../store/modules/settings/parcels";
import { clearParcelsState } from "../../../store/modules/pages/parcels";
import { clearCitiesState } from "../../../store/modules/dictionaries/cities";
import { clearTemplatesState } from "../../../store/modules/pages/templates";
import { clearParcelState } from "../../../store/modules/pages/parcel";
import { clearCreateParcelState } from "../../../store/modules/editableEntities/editableParcel";
import { clearPricesState } from "../../../store/modules/pages/prices";
import { clearDocumentsState } from "../../../store/modules/pages/documents";
import { clearParcelsAsignedState } from "../../../store/modules/pages/parcelsAsigned";
import { clearParcelsAsignedSettingsState } from "../../../store/modules/settings/parcelsAsigned";
import { clearParcelsInStorageSettingsState } from "../../../store/modules/settings/parcelsInStorage";
import { clearParcelsInStorageState } from "../../../store/modules/pages/parcelsInStorage";
import { clearCreateManifestState } from "../../../store/modules/editableEntities/editableManifest";
import { useNavigate } from "react-router-dom";

export const Account = () => {
  const data = authData();
  const dispatch = useDispatch();

  const [load, clearStates] = useloadSourse();
  const navigate = useNavigate();
  const refresh = () => {
    clearStates();
    load(data);
  };

  return (
    <>
      <Descriptions
        title="Данные пользователя"
        column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
      >
        <Descriptions.Item label="Имя пользователя">
          {data.fullName}
        </Descriptions.Item>
        <Descriptions.Item label="e-mail">{data.email}</Descriptions.Item>
      </Descriptions>
      <Space direction="vertical">
        <Button onClick={refresh}>Обновить данные</Button>

        <Button
          onClick={() => {
            dispatch(clearParcelsSettingsState());
            dispatch(clearParcelsState());
            dispatch(clearParcelsAsignedState());
            dispatch(clearParcelsAsignedSettingsState());
            dispatch(clearParcelsInStorageSettingsState());
            dispatch(clearParcelsInStorageState());
            dispatch(clearCitiesState());
            dispatch(clearCitiesState());
            dispatch(clearTemplatesState());
            dispatch(clearParcelState());
            dispatch(clearCreateParcelState());
            dispatch(clearCreateManifestState());
            dispatch(clearPricesState());
            dispatch(clearDocumentsState());
            dispatch(authlogout());
          }}
        >
          Выход
        </Button>

        {checkPermission("template-view") && (
          <Button
            onClick={() => {
              navigate("/templates");
            }}
          >
            Шаблоны
          </Button>
        )}

        {checkPermission("document-view") && (
          <Button
            onClick={() => {
              navigate("/documents");
            }}
          >
            Документы
          </Button>
        )}
      </Space>
    </>
  );
};
