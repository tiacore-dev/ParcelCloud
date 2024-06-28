import React from "react";
import { ActionDialog } from "./ActionDialog";
import { DeleteTwoTone } from "@ant-design/icons";

interface IReceiveParcelDialogProps {
  parcelId?: string;
  parcelNumber?: string;
  iconOnly?: boolean;
  buttonType?: "link" | "primary" | "text" | "default" | "dashed";
  onDelete: () => void;
}

export const DeleteParcelDialog = (props: IReceiveParcelDialogProps) => {
  const {
    onDelete,
    parcelNumber,
    iconOnly = true,
    buttonType = "default",
  } = props;

  return (
    <ActionDialog
      onConfirm={onDelete}
      buttonText={iconOnly ? "" : "Удалить"}
      buttonType={buttonType}
      buttonIcon={<DeleteTwoTone twoToneColor="#ff1616" />}
      modalTitle={`Подтверждение удаления ${parcelNumber}`}
      modalText={
        <p>Вы действительно хотитие удалить наладную {parcelNumber}?</p>
      }
    />
  );
};
