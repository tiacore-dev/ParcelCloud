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
  sendManifestSuccess,
} from "../../store/modules/pages/manifest";
import { CreateManifestDto } from "../../pages/createManifest/dto/createManifest.dto";
import {
  clearCreateManifestState,
  editManifestAction,
} from "../../store/modules/editableEntities/editableManifest";
import { NavigateFunction } from "react-router-dom";

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

export const createManifest = (
  dispatch: Dispatch<AnyAction>,
  navigate: NavigateFunction,
  getManifestParam: CreateManifestDto,
  onError?: (err: string) => void,
) => {
  dispatch(getManifestRequest());
  useApi<{ id: string }, CreateManifestDto>(
    "manifestcreate",
    "create",
    getManifestParam,
  )
    .then((manifestData) => {
      dispatch(editManifestAction.savedManifest(manifestData));
      navigate(`/manifests/${manifestData.id}`);
      dispatch(clearCreateManifestState());
    })
    .catch((err) => {
      if (onError) {
        onError(String(err));
      }
      dispatch(editManifestAction.saveError(err));
    });
};

export const sendManifest = (
  dispatch: Dispatch<AnyAction>,
  getManifestParam: GetManifestDto,
  onError?: (err: string) => void,
) => {
  dispatch(getManifestRequest());
  useApi<{ id: string }, GetManifestDto>(
    "manifestsend",
    "send",
    getManifestParam,
  )
    .then(() => {
      dispatch(sendManifestSuccess());
    })
    .catch((err) => {
      if (onError) {
        onError(String(err));
      }
      dispatch(editManifestAction.saveError(err));
    });
};

export const deleteManifest = (
  dispatch: Dispatch<AnyAction>,
  navigate: NavigateFunction,
  getManifestParam: GetManifestDto,
  onError?: (err: string) => void,
) => {
  dispatch(getManifestRequest());
  useApi<{ id: string }, GetManifestDto>(
    "manifestdelete",
    "delete",
    getManifestParam,
  )
    .then((manifestData) => {
      dispatch(editManifestAction.savedManifest(manifestData));
      navigate(`/manifests`);
      dispatch(clearCreateManifestState());
    })
    .catch((err) => {
      if (onError) {
        onError(String(err));
      }
      dispatch(editManifestAction.saveError(err));
    });
};
