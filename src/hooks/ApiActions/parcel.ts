import { AnyAction, Dispatch } from "redux";
import { IParcelsSettingsState } from "../../store/modules/settings/parcels";
import { IauthToken } from "../useAuth";
import {
  getParcelsFailure,
  getParcelsRequest,
  getParcelsSuccess,
} from "../../store/modules/pages/parcels";
import { useApi } from "../useApi";
import {
  IParcelsAsignedList,
  IParcelsInStorageList,
  IParcelsList,
} from "../../interfaces/parcels/IParcelsList";
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
import { setManifestParcelsStatus } from "../../store/modules/pages/manifest";
import { GetParcelsAsignedDto } from "../../pages/parcelsAsigned/parcelsAsigned";
import {
  getParcelsAsignedFailure,
  getParcelsAsignedRequest,
  getParcelsAsignedSuccess,
} from "../../store/modules/pages/parcelsAsigned";
import { CreateParcelDto } from "../../pages/createParcel/dto/createParcel.dto";
import {
  clearCreateParcelState,
  editParcelAction,
} from "../../store/modules/editableEntities/editableParcel";
import { NavigateFunction } from "react-router-dom";
import {
  getHistoryFailure,
  getHistoryRequest,
  getHistorySuccess,
} from "../../store/modules/pages/history";
import {
  getParcelsInStorageFailure,
  getParcelsInStorageRequest,
  getParcelsInStorageSuccess,
} from "../../store/modules/pages/parcelsInStorage";
import { GetParcelsInStorageDto } from "../../pages/parcelsInStorage/parcelsInStorage";

export interface GetParcelsDto extends IParcelsSettingsState {
  authToken: IauthToken;
}

export interface GetParcelDto {
  parcelId: string;
  authToken: IauthToken;
}

export interface GetHistoryDto {
  parcelNumber: string;
  authToken: IauthToken;
}

export interface GeneralStatusParcelsSetDto {
  parcelIds: string[];
  authToken: IauthToken;
}

export interface EditParcelDto {
  id: string;
  number?: string;
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

export interface ParcelsStatusData {
  id: string;
  status: ParcelStatus;
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

export const setGeneralParcelsStatus = (
  dispatch: Dispatch<AnyAction>,
  setGeneralParcelStatusParam: GeneralStatusParcelsSetDto,
) => {
  useApi<ParcelsStatusData[], GeneralStatusParcelsSetDto>(
    "generalparcelsstatus",
    "set",
    setGeneralParcelStatusParam,
  ).then((response) => {
    dispatch(setManifestParcelsStatus(response));
  });
};

export const getParcelsAsigned = (
  dispatch: Dispatch<AnyAction>,
  getParcelsParam: GetParcelsAsignedDto,
) => {
  dispatch(getParcelsAsignedRequest());
  useApi<IParcelsAsignedList[], GetParcelsAsignedDto>(
    "parcelsasigned",
    "get",
    getParcelsParam,
  )
    .then((parcelsData) => {
      dispatch(getParcelsAsignedSuccess(parcelsData));
    })
    .catch((err) => {
      dispatch(getParcelsAsignedFailure(err));
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
  editParcelParam: EditParcelDto,
) => {
  useApi<IParcel, EditParcelDto>("parceledit", "edit", editParcelParam)
    .then((response) => {
      dispatch(getParcelSuccess(response));
    })
    .catch((err) => {
      dispatch(getParcelFailure(err));
    });
};

export const createParcel = (
  dispatch: Dispatch<AnyAction>,
  navigate: NavigateFunction,
  createParcelParams: CreateParcelDto,
  onError?: (err: string) => void,
) => {
  dispatch(editParcelAction.sendParcel());

  useApi<{ id: string; number: string }, CreateParcelDto>(
    "parcelcreate",
    "create",
    createParcelParams,
  )
    .then((parcelData) => {
      dispatch(editParcelAction.savedParcel(parcelData));
      navigate(`/parcels/${parcelData.id}`);
      dispatch(clearCreateParcelState());
    })
    .catch((err) => {
      console.log("err", err);

      if (onError) {
        onError(String(err));
      }
      dispatch(editParcelAction.saveError(err));
    });
};

export const getHistory = (
  dispatch: Dispatch<AnyAction>,
  getHistoryParam: GetHistoryDto,
) => {
  dispatch(getHistoryRequest());
  useApi<IParcelHistory[], GetHistoryDto>("history", "get", getHistoryParam)
    .then((response) => {
      dispatch(getHistorySuccess(response));
    })
    .catch((err) => {
      dispatch(getHistoryFailure(err));
    });
};

export const getParcelsInStorage = (
  dispatch: Dispatch<AnyAction>,
  getParcelsParam: GetParcelsInStorageDto,
) => {
  dispatch(getParcelsInStorageRequest());
  useApi<IParcelsInStorageList[], GetParcelsInStorageDto>(
    "parcelsinstorage",
    "get",
    getParcelsParam,
  )
    .then((parcelsData) => {
      dispatch(getParcelsInStorageSuccess(parcelsData));
    })
    .catch((err) => {
      dispatch(getParcelsInStorageFailure(err));
    });
};
