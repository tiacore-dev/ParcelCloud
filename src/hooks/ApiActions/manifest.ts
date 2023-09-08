import { AnyAction, Dispatch } from "redux";
import { IauthToken } from "../useAuth";
import {
  getManifestsFailure,
  getManifestsRequest,
  getManifestsSuccess,
} from "../../store/modules/pages/manifests";
import { useApi } from "../useApi";
import { IManifestsSettingsState } from "../../store/modules/settings/manifests";
import { IManifestList } from "../../interfaces/manifests/IManifestList";
import { IManifest } from "../../interfaces/manifests/IManifest";
import {
  getManifestFailure,
  getManifestRequest,
  getManifestSuccess,
} from "../../store/modules/pages/manifest";

export interface GetManifestsDto extends IManifestsSettingsState {
  authToken: IauthToken;
}

export interface GetManifestDto {
  manifestId: string;
  authToken: IauthToken;
}

export const getManifests = (
  dispatch: Dispatch<AnyAction>,
  getManifestsParam: GetManifestsDto,
) => {
  dispatch(getManifestsRequest());
  useApi<IManifestList[], GetManifestsDto>(
    "manifests",
    "get",
    getManifestsParam,
  )
    .then((manifestsData) => {
      dispatch(getManifestsSuccess(manifestsData));
    })
    .catch((err) => {
      dispatch(getManifestsFailure(err));
    });
};

export const getManifest = (
  dispatch: Dispatch<AnyAction>,
  getManifestParam: GetManifestDto,
) => {
  dispatch(getManifestRequest());
  useApi<IManifest, GetManifestDto>("manifest", "get", getManifestParam)
    .then((manifestData) => {
      dispatch(getManifestSuccess(manifestData));
    })
    .catch((err) => {
      dispatch(getManifestFailure(err));
    });
};
