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

export interface GetManifestsDto extends IManifestsSettingsState {
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
