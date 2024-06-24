import React, { useCallback } from "react";
import { ActionDialog } from "./ActionDialog";
import { SearchOutlined } from "@ant-design/icons";
import { FindParcelDto, findParcel } from "../ApiActions/parcel";
import { authToken } from "../useAuth";
import { Button, Input, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { NotificationInstance } from "antd/es/notification/interface";

interface IReceiveParcelDialogProps {
  iconOnly?: boolean;
  api: NotificationInstance;
}

export const FindParcelDialog = (props: IReceiveParcelDialogProps) => {
  const { iconOnly = true, api } = props;
  const navigate = useNavigate();

  const [number, setNumber] = React.useState("");

  const token = authToken();
  const getParams: (parcelNumber: string) => FindParcelDto = useCallback(
    (parcelNumber: string) => ({
      authToken: token,
      number: parcelNumber,
    }),
    [token],
  );

  const errFunc = useCallback((errorMessage: string) => {
    api.error({
      message: `Ошибка`,
      description: errorMessage,
      placement: "bottomRight",
    });
  }, []);

  const handleFind = (number: string) => {
    const params = getParams(number);
    findParcel(navigate, errFunc, params);
  };

  const handleScan = useCallback((result: IDetectedBarcode[]) => {
    if (result && result.length) {
      const rawValue = result[0].rawValue;
      handleFind(rawValue);
    }
  }, []);
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
