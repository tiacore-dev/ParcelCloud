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
import {
  getParcelFailure,
  getParcelRequest,
  getParcelSuccess,
  setToReceiveСonfirmed,
} from "../../store/modules/pages/parcel";
import { IParcel } from "../../interfaces/parcels/IParcel";

export interface GetParcelsDto extends IParcelsSettingsState {
  authToken: IauthToken;
}

export interface GetParcelDto {
  parcelId: string;
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

export const getParcel = (
  dispatch: Dispatch<AnyAction>,
  getParcelParam: GetParcelDto,
) => {
  dispatch(getParcelRequest());
  useApi<IParcel, GetParcelDto>("parcel", "get", getParcelParam)
    .then((parcelData) => {
      dispatch(getParcelSuccess(parcelData));
    })
    .catch((err) => {
      dispatch(getParcelFailure(err));
    });
};

// export const setGeneralParcelStatus = (
//   dispatch: Dispatch<AnyAction>,
//   getParcelsParam: GetParcelDto,
// ) => {
//   // dispatch(getParcelsRequest());
//   useApi<boolean, GetParcelDto>("parcels", "get", getParcelsParam)
//     .then((response) => {
//       console.log(response);
//       // dispatch(getParcelsSuccess(parcelData));
//     })
//     .catch((err) => {
//       console.log(err);

//       // dispatch(getParcelsFailure(err));
//     });
// };

export const acceptReceiveTask = async (
  dispatch: Dispatch<AnyAction>,
  getParcelParam: GetParcelDto,
): Promise<boolean> => {
  return useApi<boolean, GetParcelDto>("toreceive", "confirm", getParcelParam)
    .then((response) => {
      if (response) {
        dispatch(setToReceiveСonfirmed());
        return true;
      }
    })
    .catch((err) => {
      dispatch(getParcelFailure(err));
      return false;
    });
};
