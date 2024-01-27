import React from "react";
import { ActionDialog } from "./ActionDialog";
import { CheckCircleTwoTone, PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { DeliveryParcelDto, deliveryParcel } from "../ApiActions/parcel";
import { authToken } from "../useAuth";
import { DatePicker, Input, Space, TimePicker, Upload } from "antd";
import dayjs from "dayjs";
import { dateTimeFormat } from "../../utils/dateConverter";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

interface IReceiveParcelDialogProps {
  parcelId?: string;
  parcelNumber?: string;
  iconOnly?: boolean;
}

export const DeliveryParcelDialog = (props: IReceiveParcelDialogProps) => {
  const { parcelId, parcelNumber, iconOnly = false } = props;
  const dispatch = useDispatch();

  const [recName, setRecName] = React.useState("");
  const [recDate, setRecDate] = React.useState(Date.now());
  const [fileString, setFileString] = React.useState<string | undefined>(
    undefined,
  );

  const token = authToken();
  const params: DeliveryParcelDto = React.useMemo(
    () => ({
      authToken: token,
      parcelId: parcelId,
      recName,
      recDate: dayjs(recDate).format(dateTimeFormat),
      img: fileString?.split(",").pop(),
    }),
    [parcelId, recName, recDate, token],
  );

  const receiveParcel = () => {
    deliveryParcel(dispatch, params);
  };

  const [fileData, setFileData] = React.useState<UploadFile | undefined>(
    undefined,
  );

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Загрузить фото</div>
    </div>
  );

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileData(newFileList[0]);

  const beforeUploadHandler = async (file: RcFile) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64data = reader.result as string;
      setFileString(base64data);
    };
  };

  return (
    <ActionDialog
      onConfirm={receiveParcel}
      buttonText={iconOnly ? "" : "Доставлено"}
      buttonType="primary"
      buttonIcon={<CheckCircleTwoTone twoToneColor="#ff1616" />}
      modalTitle={`Подтверждение доставки ${parcelNumber}`}
      modalText={
        <Space direction="vertical">
          <div>Укажите Фамилию, Имя и Должность получателя</div>
          <Input value={recName} onChange={(e) => setRecName(e.target.value)} />
          <div> Укажите дату доставки:</div>
          <DatePicker
            value={dayjs(recDate)}
            onChange={(date) => setRecDate(date.valueOf())}
            onFocus={(e) => e.target.blur()}
          />
          <div> Укажите время доставки:</div>
          <TimePicker
            value={dayjs(recDate)}
            onChange={(date) => setRecDate(date.valueOf())}
            format={"HH:mm"}
          />

          <Upload
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUploadHandler}
            onChange={handleChange}
          >
            {fileData ? (
              <img src={fileString} alt="image" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Space>
      }
    />
  );
};
