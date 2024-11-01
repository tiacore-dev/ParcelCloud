import React, { ReactNode, useCallback } from "react";
import { authToken, checkPermission } from "../../../../hooks/useAuth";
import { useDispatch } from "react-redux";
import {
  GetParcelDto,
  setGeneralParcelStatus,
} from "../../../../hooks/ApiActions/parcel";
import { ReceiveParcelDialog } from "../../../../hooks/ActionDialogs";
import { NotificationInstance } from "antd/es/notification/interface";

export const useReceiveParcelDialog = (
  api: NotificationInstance,
): ((
  id: string,
  number: string,
  customer: string,
  sendAddress: string,
  toReceive: boolean,
) => ReactNode) => {
  const receiveCreate = checkPermission("receive-create");
  const token = authToken();
  const dispatch = useDispatch();

  const getReceiveParcelDialog = useCallback(
    (
      id: string,
      number: string,
      customer: string,
      sendAddress: string,
      toReceive: boolean,
    ) => {
      const canReceive: boolean = toReceive && receiveCreate;

      if (!canReceive) {
        return null;
      }

      const receiveParcelParams: GetParcelDto = {
        number: number,
        customer: customer,
        sendAddress: sendAddress,
        authToken: token,
        parcelId: id,
      };

      const receiveParcel = (number: string) => {
        setGeneralParcelStatus(
          dispatch,
          { ...receiveParcelParams, number },
          api,
        );
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
