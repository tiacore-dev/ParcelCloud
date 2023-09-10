import * as React from "react";
import { IParcel } from "../../../interfaces/parcels/IParcel";
import { PrintModal } from "./printModal";
import { notification, Button } from "antd";
import {
  CheckCircleTwoTone,
  EditTwoTone,
  PlusCircleTwoTone,
} from "@ant-design/icons";
import {
  GetParcelDto,
  acceptReceiveTask,
} from "../../../hooks/ApiActions/parcel";
import { useDispatch } from "react-redux";

interface IParcelActionsProps {
  parcelData: IParcel;
  params: GetParcelDto;
}

export const ParcelActions = (props: IParcelActionsProps) => {
  const { parcelData, params } = props;

  const [api, contextHolder] = notification.useNotification();

  const dispatch = useDispatch();
  const onAcceptReceiveTask = async () => {
    const result = await acceptReceiveTask(dispatch, params);
    if (result) {
      api.success({
        message: `Успешно`,
        description: "Принято в Работу!",
        placement: "bottomRight",
      });
    } else {
      api.error({
        message: `Ошибка`,
        description: "Что-то пошло не так",
        placement: "bottomRight",
      });
    }
  };

  return (
    <div className="parcel__actions">
      {parcelData.toReceiveСonfirmed === false && (
        <Button
          type="primary"
          className="parcel__actions__button"
          icon={<PlusCircleTwoTone />}
          style={{}}
          onClick={onAcceptReceiveTask}
        >
          Принять в работу
        </Button>
      )}

      {parcelData.toReceive && (
        <Button
          type="primary"
          className="parcel__actions__button"
          icon={<CheckCircleTwoTone />}
          style={{}}
        >
          Получено
        </Button>
      )}

      {parcelData.toDelivery && (
        <Button
          type="primary"
          className="parcel__actions__button"
          icon={<CheckCircleTwoTone />}
          style={{}}
        >
          Доставлено
        </Button>
      )}

      <Button
        className="parcel__actions__button"
        icon={<EditTwoTone />}
      ></Button>

      {parcelData && <PrintModal data={parcelData} />}

      {contextHolder}
    </div>
  );
};
