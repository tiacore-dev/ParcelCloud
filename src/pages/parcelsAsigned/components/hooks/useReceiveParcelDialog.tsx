import React, { ReactNode, useCallback } from "react";
import { authToken, checkPermission } from "../../../../hooks/useAuth";
import { useDispatch } from "react-redux";
import {
  GetParcelDto,
  setGeneralParcelStatus,
} from "../../../../hooks/ApiActions/parcel";
import { ReceiveParcelDialog } from "../../../../hooks/ActionDialogs";

export const useReceiveParcelDialog = (): ((
  id: string,
  number: string,
  toReceive: boolean,
) => ReactNode) => {
  const receiveCreate = checkPermission("receive-create");
  const token = authToken();
  const dispatch = useDispatch();

  const getReceiveParcelDialog = useCallback(
    (id: string, number: string, toReceive: boolean) => {
      const canReceive: boolean = toReceive && receiveCreate;

      if (!canReceive) {
        return null;
      }

      const receiveParcelParams: GetParcelDto = {
        authToken: token,
        parcelId: id,
      };

      const receiveParcel = () => {
        setGeneralParcelStatus(dispatch, receiveParcelParams);
      };

      return (
        <ReceiveParcelDialog
          onReceive={receiveParcel}
          parcelId={id}
          parcelNumber={number}
          buttonType="default"
        />
      );
    },
    [],
  );

  return getReceiveParcelDialog;
};
