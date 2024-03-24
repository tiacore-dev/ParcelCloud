import * as React from "react";
import { Layout } from "antd";
import { AppHeader } from "../AppHeader/AppHeader";
import { AppFooter } from "../AppFooter/AppFooter";
import { useLocation, useNavigate } from "react-router-dom";
import { Auth } from "../../pages/auth/auth";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../store/modules";
import {
  clearCitiesState,
  getCitiesFailure,
  getCitiesRequest,
  getCitiesSuccess,
} from "../../store/modules/dictionaries/cities";
import { useApi } from "../../hooks/useApi";
import { IauthToken } from "../../hooks/useAuth";
import {
  clearTemplatesState,
  getTemplatesFailure,
  getTemplatesRequest,
  getTemplatesSuccess,
} from "../../store/modules/pages/templates";
import { clearParcelsSettingsState } from "../../store/modules/settings/parcels";
import { clearParcelsState } from "../../store/modules/pages/parcels";
import { ITemplate } from "../../interfaces/templates/ITemplate";
import { clearParcelState } from "../../store/modules/pages/parcel";
import { clearCreateParcelState } from "../../store/modules/editableEntities/editableParcel";
import { clearPricesState } from "../../store/modules/pages/prices";
import { clearDocumentsState } from "../../store/modules/pages/documents";
import "./App.less";
import { Route, Routes } from "react-router-dom";
import { Main } from "../../pages/main/main";
import { CreateParcel } from "../../pages/createParcel/createParcel";
import { Parcels } from "../../pages/parcels/parcels";
import { Parcel } from "../../pages/parcel/parcel";
import { Templates } from "../../pages/templates/templates";
import { Template } from "../../pages/template/template";
import { Prices } from "../../pages/prices/prices";
import { Documents } from "../../pages/documents/documents";
import { Document } from "../../pages/document/document";
import { ParcelsAsigned } from "../../pages/parcelsAsigned/parcelsAsigned";
import { Manifests } from "../../pages/manifests/manifests";
import { Manifest } from "../../pages/manifest/manifest";
import { HistoryPage } from "../../pages/history/history";
import { ParcelsInStorage } from "../../pages/parcelsInStorage/parcelsInStorage";
import { clearParcelsInStorageState } from "../../store/modules/pages/parcelsInStorage";
import { clearParcelsAsignedState } from "../../store/modules/pages/parcelsAsigned";
import { clearParcelsAsignedSettingsState } from "../../store/modules/settings/parcelsAsigned";
import { clearParcelsInStorageSettingsState } from "../../store/modules/settings/parcelsInStorage";
import { clearCreateManifestState } from "../../store/modules/editableEntities/editableManifest";
import { CreateManifest } from "../../pages/createManifest/createManifest";
import { Api } from "../../pages/info";
import { isMobile } from "../../utils/isMobile";
import { pageHeight } from "../../utils/pageSettings";

interface useloadSourseDto {
  authToken: IauthToken;
}

export const useloadSourse = (): [
  (authData: IauthToken) => void,
  () => void,
] => {
  const dispatch = useDispatch();
  const clearStates = React.useCallback(() => {
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
  }, []);

  const load = React.useCallback((authData: IauthToken) => {
    // Загрузка справочника городов
    dispatch(getCitiesRequest());
    useApi<string[], Record<string, never>>("cities", "get", {})
      .then((response) => {
        dispatch(getCitiesSuccess(response));
      })
      .catch((err) => {
        dispatch(getCitiesFailure(err));
      });

    // Загрузка шаблонов
    dispatch(getTemplatesRequest());
    useApi<ITemplate[], useloadSourseDto>("templates", "get", {
      authToken: authData,
    })
      .then((response) => {
        dispatch(getTemplatesSuccess(response));
      })
      .catch((err) => {
        dispatch(getTemplatesFailure(err));
      });
  }, []);

  return [load, clearStates];
};

export const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authData = useSelector((state: IState) => state.auth);
  const isAuth = authData.isAuth;
  if (!isAuth && location.pathname !== "/auth") {
    navigate("/auth");
  }
  const mobile = isMobile();

  return (
    <>
      <Layout>
        {isAuth && !mobile && <AppHeader isMobile={mobile} />}

        <Layout
          style={{
            padding: mobile ? "0" : "0 24px",
            height: pageHeight(),
            overflowX: "auto",
            backgroundColor: "#FFFFFF",
          }}
        >
          <Routes>
            <Route path="/">
              <Route index={true} element={<Main />} />
              <Route path="auth" element={<Auth />} />
              <Route path="parcels">
                <Route index={true} element={<Parcels />} />
                <Route path="create" element={<CreateParcel />} />
                <Route path=":parcelId" element={<Parcel />} />
              </Route>
              <Route path="templates">
                <Route index={true} element={<Templates />} />
                <Route path=":templateId" element={<Template />} />
              </Route>
              <Route path="manifests">
                <Route index={true} element={<Manifests />} />
                <Route path="create" element={<CreateManifest />} />
                <Route path=":manifestId" element={<Manifest />} />
              </Route>
              <Route path="documents">
                <Route index={true} element={<Documents />} />
                <Route path=":documentId" element={<Document />} />
              </Route>
              <Route path="tasks" element={<ParcelsAsigned />} />
              <Route path="storage" element={<ParcelsInStorage />} />
              <Route path="history" element={<HistoryPage />} />
              <Route path="prices" element={<Prices />} />
              <Route path="api" element={<Api />} />
            </Route>
          </Routes>
        </Layout>

        {isAuth && <AppFooter />}
      </Layout>
    </>
  );
};
