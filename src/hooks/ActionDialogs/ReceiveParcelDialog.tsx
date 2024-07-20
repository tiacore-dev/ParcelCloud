import React from "react";
import { ActionDialog } from "./ActionDialog";
import { CheckCircleTwoTone, EditTwoTone } from "@ant-design/icons";
import { Button, Input, Space } from "antd";

interface IReceiveParcelDialogProps {
  parcelId?: string;
  parcelNumber?: string;
  iconOnly?: boolean;
  buttonType?: "link" | "primary" | "text" | "default" | "dashed";
  onReceive: (number: string) => void;
}

export const ReceiveParcelDialog = (props: IReceiveParcelDialogProps) => {
  const {
    onReceive,
    parcelNumber,
    iconOnly = false,
    buttonType = "primary",
  } = props;

  const [number, setNumber] = React.useState<string>(parcelNumber);
  const [editingNumber, setEditingNumber] = React.useState<boolean>(false);
  return (
    <ActionDialog
      onConfirm={() => onReceive(number)}
      buttonText={iconOnly ? "" : "Получено"}
      buttonType={buttonType}
      buttonIcon={<CheckCircleTwoTone twoToneColor="#ff1616" />}
      modalTitle={`Подтверждение получения ${parcelNumber}`}
      modalText={
        <div>
          <Space>
            Номер накладной:
            <Input
              onChange={(e) => setNumber(e.target.value)}
              value={number}
              readOnly={!editingNumber}
            />
            {!editingNumber && (
              <Button
                icon={<EditTwoTone twoToneColor="#ff1616" />}
                onClick={() => setEditingNumber(true)}
              />
            )}
          </Space>
          {number === parcelNumber ? (
            <p>Подтверждате, что накладная {number} получена от отправителя?</p>
          ) : (
            <p>
              Подтверждате, для накладной установлен новый номер {number}, и что
              накладная получена от отправителя?
            </p>
          )}
        </div>
      }
    />
  );
};
