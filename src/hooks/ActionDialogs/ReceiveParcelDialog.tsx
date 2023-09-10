import React from "react";
import { ActionDialog } from "./ActionDialog";
import { CheckCircleTwoTone } from "@ant-design/icons";

interface IReceiveParcelDialogProps {
  parcelId?: string;
  parcelNumber?: string;
  iconOnly?: boolean;

  onReceive: () => void;
}

export const ReceiveParcelDialog = (props: IReceiveParcelDialogProps) => {
  const { onReceive, parcelNumber, iconOnly = false } = props;

  return (
    <ActionDialog
      onConfirm={onReceive}
      buttonText={iconOnly ? "" : "Получено"}
      buttonType="primary"
      buttonIcon={<CheckCircleTwoTone />}
      modalTitle={`Подтверждение получения ${parcelNumber}`}
      modalText={
        <p>
          Подтверждате, что накладная {parcelNumber} получена от отправителя?
        </p>
      }
    />
  );
};
