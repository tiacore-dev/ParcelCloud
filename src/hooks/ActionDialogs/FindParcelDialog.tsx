import React, { useCallback } from "react";
import { ActionDialog } from "./ActionDialog";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";

interface IReceiveParcelDialogProps {
  iconOnly?: boolean;
  handleFind: (number: string) => void;
}

export const FindParcelDialog = (props: IReceiveParcelDialogProps) => {
  const { iconOnly = true, handleFind } = props;

  const [number, setNumber] = React.useState("");

  const handleScan = useCallback(
    (result: IDetectedBarcode[]) => {
      if (result && result.length) {
        const rawValue = result[0].rawValue;
        setNumber(rawValue);
      }
    },
    [handleFind],
  );
  return (
    <ActionDialog
      footerDisable={true}
      buttonText={iconOnly ? "" : "Найти по номеру"}
      buttonType="primary"
      buttonIcon={<SearchOutlined />}
      modalTitle={`Поиск накладной по номеру`}
      modalText={
        <Space direction="vertical" style={{ minHeight: "456px" }}>
          <div>Укажите номер или отсканируйте штрихкод / QR-код</div>
          <Space direction="horizontal">
            <Input
              placeholder="Номер накладной..."
              size="large"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            <Button
              size="large"
              onClick={() => {
                handleFind(number);
                setNumber("");
              }}
              icon={<SearchOutlined />}
            />
          </Space>

          <Scanner onScan={handleScan} />
        </Space>
      }
    />
  );
};
