import React, { useState } from "react";
import { ActionDialog } from "./ActionDialog";
import { FileTextTwoTone } from "@ant-design/icons";
import { getScan } from "../ApiActions/parcel";
import { authToken } from "../useAuth";
import { NotificationInstance } from "antd/es/notification/interface";

interface IReceiveParcelDialogProps {
  parcelId?: string;
  api: NotificationInstance;
  buttonType?: "link" | "primary" | "text" | "default" | "dashed";
}

export const ScanDialog = (props: IReceiveParcelDialogProps) => {
  const { parcelId, api, buttonType = "default" } = props;
  const errFunc = (description: string) => {
    api.error({
      message: `Ошибка`,
      description,
      placement: "bottomRight",
    });
  };
  const [photoData, setPhotoData] = useState("");

  const token = authToken();

  const loadImage = () => {
    const params = {
      authToken: token,
      parcelId,
    };
    getScan(errFunc, setPhotoData, params);
  };

  return (
    <ActionDialog
      onOpen={loadImage}
      buttonType={buttonType}
      buttonIcon={<FileTextTwoTone twoToneColor="#ff1616" />}
      modalText={
        <img
          alt=" Загрузка изображения..."
          style={{ width: "100%" }}
          src={photoData}
        />
      }
    />
  );
};
