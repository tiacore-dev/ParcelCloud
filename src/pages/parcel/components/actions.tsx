import * as React from "react";
import { IParcel } from "../../../interfaces/parcels/IParcel";
import { PrintModal } from "./printModal";
import { notification, Button } from "antd";
import { PlusCircleTwoTone } from "@ant-design/icons";
import {
  GetParcelDto,
  acceptReceiveTask,
  setGeneralParcelStatus,
} from "../../../hooks/ApiActions/parcel";
import { useDispatch } from "react-redux";
import { ReceiveParcelDialog } from "../../../hooks/ActionDialogs/ReceiveParcelDialog";
import { DeliveryParcelDialog } from "../../../hooks/ActionDialogs/DeliveryParcelDialog";
import { authToken, checkPermission } from "../../../hooks/useAuth";
import { EditParcelDialog } from "../../../hooks/ActionDialogs/EditParcelDialog";
import { CopyParcelDialog } from "../../../hooks/ActionDialogs";
import { PrintStampModal } from "./printStampModal";
import { isMobile } from "../../../utils/isMobile";

interface IParcelActionsProps {
  parcelData: IParcel;
  params: GetParcelDto;
}

export const ParcelActions = (props: IParcelActionsProps) => {
  const { parcelData, params } = props;

  const [api, contextHolder] = notification.useNotification();
  const token = authToken();
  const podCreateMy = checkPermission("pod-create-my");
  const receiveCreate = checkPermission("receive-create");
  const parcelEditMy = checkPermission("parcel-edit-my");
  const parcelEditAll = checkPermission("parcel-edit-all");

  const parcelEditReceived = checkPermission("parcel-edit-received");
  const podCreateAll = checkPermission("pod-create-all");

  const canDelivery: boolean =
    (parcelData.toDelivery && podCreateMy) ||
    (podCreateAll &&
      parcelData.status !== "delivered" &&
      parcelData.status !== "canceled");

  const canReceive: boolean = parcelData.toReceive && receiveCreate;

  const canEdit: boolean =
    (parcelData.status === "expected" && parcelEditMy) || parcelEditAll;

  const canEditItems: boolean =
    parcelData.status === "general" && parcelEditReceived;

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

  const receiveParcelParams: GetParcelDto = {
    authToken: token,
    parcelId: parcelData.id,
  };

  const receiveParcel = () => {
    setGeneralParcelStatus(dispatch, receiveParcelParams);
  };

  const toReceiveСonfirmedButton = parcelData.toReceiveСonfirmed === false && (
    <Button
      type="primary"
      className="parcel__actions__button"
      icon={<PlusCircleTwoTone twoToneColor="#ff1616" />}
      onClick={onAcceptReceiveTask}
    >
      Принять в работу
    </Button>
  );

  const receiveParcelDialog = canReceive && (
    <ReceiveParcelDialog
      onReceive={receiveParcel}
      parcelId={parcelData.id}
      parcelNumber={parcelData.number}
    />
  );

  const deliveryParcelDialog = canDelivery && (
    <DeliveryParcelDialog
      parcelId={parcelData.id}
      parcelNumber={parcelData.number}
    />
  );

  const copyParcelDialog = <CopyParcelDialog parcel={parcelData} iconOnly />;

  const editParcelDialog = (canEdit || canEditItems) && (
    <EditParcelDialog parcel={parcelData} editItemsOnly={!canEdit} iconOnly />
  );

  const printModal = parcelData && <PrintModal data={parcelData} />;
  const printStampModal = parcelData && <PrintStampModal data={parcelData} />;

  return (
    <div
      className="parcel__actions"
      style={{ position: isMobile() ? "relative" : "absolute" }}
    >
      {toReceiveСonfirmedButton}
      {receiveParcelDialog}
      {deliveryParcelDialog}
      {editParcelDialog}
      {copyParcelDialog}
      {printModal}
      {printStampModal}

      {contextHolder}
    </div>
  );
};
