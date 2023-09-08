import { AnyAction, Dispatch } from "redux";
import { IParcelsSettingsState } from "../../store/modules/settings/parcels";
import { IauthToken } from "../useAuth";
import {
  getParcelsFailure,
  getParcelsRequest,
  getParcelsSuccess,
} from "../../store/modules/pages/parcels";
import { useApi } from "../useApi";
import { IParcelsList } from "../../interfaces/parcels/IParcelsList";

export interface GetParcelsDto extends IParcelsSettingsState {
  authToken: IauthToken;
}

export const getParcels = (
  dispatch: Dispatch<AnyAction>,
  getParcelsParam: GetParcelsDto,
) => {
  dispatch(getParcelsRequest());
  useApi<IParcelsList[], GetParcelsDto>("parcels", "get", getParcelsParam)
    .then((parcelsData) => {
      dispatch(getParcelsSuccess(parcelsData));
    })
    .catch((err) => {
      dispatch(getParcelsFailure(err));
    });
};
