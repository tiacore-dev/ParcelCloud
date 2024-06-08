import React from "react";
import { ActionDialog } from "./ActionDialog";
import { CheckCircleTwoTone } from "@ant-design/icons";

interface IReceiveParcelDialogProps {
  parcelId?: string;
  parcelNumber?: string;
  iconOnly?: boolean;
  buttonType?: "link" | "primary" | "text" | "default" | "dashed";
  onReceive: () => void;
}

export const ReceiveParcelDialog = (props: IReceiveParcelDialogProps) => {
  const {
    onReceive,
    parcelNumber,
    iconOnly = false,
    buttonType = "primary",
  } = props;

  return (
    <ActionDialog
      onConfirm={onReceive}
      buttonText={iconOnly ? "" : "Получено"}
      buttonType={buttonType}
      buttonIcon={<CheckCircleTwoTone twoToneColor="#ff1616" />}
      modalTitle={`Подтверждение получения ${parcelNumber}`}
      modalText={
        <p>
          Подтверждате, что накладная {parcelNumber} получена от отправителя?
        </p>
      }
    />
  );
};
