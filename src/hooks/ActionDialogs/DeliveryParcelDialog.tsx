import React from "react";
import { ActionDialog } from "./ActionDialog";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { DeliveryParcelDto, deliveryParcel } from "../ApiActions/parcel";
import { authToken } from "../useAuth";
import { DatePicker, Input, TimePicker } from "antd";
import dayjs from "dayjs";
import { dateTimeFormat } from "../../utils/dateConverter";

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

  const token = authToken();
  const params: DeliveryParcelDto = React.useMemo(
    () => ({
      authToken: token,
      parcelId: parcelId,
      recName,
      recDate: dayjs(recDate).format(dateTimeFormat),
    }),
    [parcelId, recName, recDate, token],
  );

  const receiveParcel = () => {
    deliveryParcel(dispatch, params);
  };
  return (
    <ActionDialog
      onConfirm={receiveParcel}
      buttonText={iconOnly ? "" : "Доставлено"}
      buttonType="primary"
      buttonIcon={<CheckCircleTwoTone twoToneColor="#ff1616" />}
      modalTitle={`Подтверждение доставки ${parcelNumber}`}
      modalText={
        <div>
          <p>Укажите Фамилию, Имя и Должность получателя</p>
          <Input value={recName} onChange={(e) => setRecName(e.target.value)} />
          <p> Укажите дату доставки:</p>
          <DatePicker
            value={dayjs(recDate)}
            onChange={(date) => setRecDate(date.valueOf())}
          />
          <p> Укажите время доставки:</p>
          <TimePicker
            value={dayjs(recDate)}
            onChange={(date) => setRecDate(date.valueOf())}
            format={"HH:mm"}
          />
        </div>
      }
    />
  );
};
