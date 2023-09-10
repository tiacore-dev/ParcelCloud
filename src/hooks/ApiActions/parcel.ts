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
  setParcelStatus,
} from "../../store/modules/pages/parcel";
import {
  IParcel,
  IParcelHistory,
  IParcelItem,
  ParcelStatus,
} from "../../interfaces/parcels/IParcel";
import { payTypeEnum } from "../../enumerations/payTypeEnum";
import { delTypeEnum } from "../../enumerations/delTypeEnum";

export interface GetParcelsDto extends IParcelsSettingsState {
  authToken: IauthToken;
}

export interface GetParcelDto {
  parcelId: string;
  authToken: IauthToken;
}

export interface EditParcelDto {
  id: string;
  customer?: string;
  sendCity?: string;
  sendPerson?: string;
  sendAddress?: string;
  sendCompany?: string;
  sendAddInfo?: string;
  sendPhone?: string;
  recCity?: string;
  recPerson?: string;
  recAddress?: string;
  recCompany?: string;
  recAddInfo?: string;
  recPhone?: string;
  qt?: number;
  weight?: number;
  volume?: number;
  priceId?: string;
  cost?: number;
  insureValue?: number;
  COD?: number;
  payType?: keyof typeof payTypeEnum;
  delType?: keyof typeof delTypeEnum;
  tMax?: number;
  tMin?: number;
  fragile?: boolean;
  containerRent?: boolean;
  items?: IParcelItem[];
  authToken: IauthToken;
}

export interface DeliveryParcelDto {
  parcelId: string;
  recName: string;
  recDate: string;
  authToken: IauthToken;
}

export interface ParcelStatusData {
  status: ParcelStatus;
  toDelivery?: boolean;
  toReceive?: boolean;
  history?: IParcelHistory[];
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

export const setGeneralParcelStatus = (
  dispatch: Dispatch<AnyAction>,
  setGeneralParcelStatusParam: GetParcelDto,
) => {
  useApi<ParcelStatusData, GetParcelDto>(
    "generalstatus",
    "set",
    setGeneralParcelStatusParam,
  )
    .then((response) => {
      dispatch(setParcelStatus(response));
    })
    .catch((err) => {
      dispatch(getParcelsFailure(err));
    });
};

export const deliveryParcel = (
  dispatch: Dispatch<AnyAction>,
  deliveryParcelParam: DeliveryParcelDto,
) => {
  useApi<ParcelStatusData, GetParcelDto>(
    "deliveryparcel",
    "set",
    deliveryParcelParam,
  )
    .then((response) => {
      dispatch(setParcelStatus(response));
    })
    .catch((err) => {
      dispatch(getParcelsFailure(err));
    });
};

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

export const editParcel = (
  dispatch: Dispatch<AnyAction>,
  deliveryParcelParam: EditParcelDto,
) => {
  useApi<IParcel, EditParcelDto>("parceledit", "edit", deliveryParcelParam)
    .then((response) => {
      dispatch(getParcelSuccess(response));
    })
    .catch((err) => {
      dispatch(getParcelFailure(err));
    });
};
