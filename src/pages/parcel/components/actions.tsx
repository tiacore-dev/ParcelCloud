import * as React from "react";
import { IParcel } from "../../../interfaces/parcels/IParcel";
import { PrintModal } from "./printModal";
import { Button } from "antd";
import { PlusCircleTwoTone } from "@ant-design/icons";
import {
  DeleteParcelDto,
  GetParcelDto,
  acceptReceiveTask,
  deleteParcel,
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
import { DownloadButton } from "./downloadButton";
import { NotificationInstance } from "antd/es/notification/interface";
import { DeleteParcelDialog } from "../../../hooks/ActionDialogs/DeleteParcelDialo";
import { useNavigate } from "react-router-dom";

interface IParcelActionsProps {
  api: NotificationInstance;
  parcelData: IParcel;
  params: GetParcelDto;
}

export const ParcelActions = (props: IParcelActionsProps) => {
  const { parcelData, params, api } = props;

  const token = authToken();
  const podCreateMy = checkPermission("pod-create-my");
  const receiveCreate = checkPermission("receive-create");
  const parcelEditMy = checkPermission("parcel-edit-my");
  const parcelEditAll = checkPermission("parcel-edit-all");
  const parcelAccept = checkPermission("parcel-accept");
  const parcelEditReceived = checkPermission("parcel-edit-received");
  const podCreateAll = checkPermission("pod-create-all");
  const parcelDeleteMy = checkPermission("parcel-delete-my");
  const setReceivingResponsible = checkPermission("set_receiving_responsible");

  const canDelivery: boolean =
    (parcelData.toDelivery && podCreateMy) ||
    (podCreateAll &&
      parcelData.status !== "delivered" &&
      parcelData.status !== "canceled");

  const canReceive: boolean = parcelData.toReceive && receiveCreate;

  const canDelete: boolean = parcelData.deletionAvailable && parcelDeleteMy;

  const canSetReceivingResp: boolean =
    parcelData.toReceive && setReceivingResponsible;

  const canEdit: boolean =
    (parcelData.status === "expected" && parcelEditMy) || parcelEditAll;

  const canEditItems: boolean =
    parcelData.status === "general" && parcelEditReceived;

  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    number: parcelData.number,
    customer: parcelData.customer,
    sendAddress: parcelData.sendAddress,
    parcelId: parcelData.id,
  };

  const deleteParcelParams: DeleteParcelDto = {
    authToken: token,
    parcelId: parcelData.id,
  };

  const receiveParcel = (number: string) => {
    setGeneralParcelStatus(dispatch, { ...receiveParcelParams, number }, api);
  };

  const handleDeleteParcel = React.useCallback(() => {
    deleteParcel(dispatch, deleteParcelParams, () => {
      navigate("/parcels");
    });
  }, []);

  const toReceiveСonfirmedButton = parcelData.toReceiveСonfirmed === false &&
    parcelAccept && (
      <Button
        size="large"
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

  const deleteParcelDialog = canDelete && (
    <DeleteParcelDialog
      onDelete={handleDeleteParcel}
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
  const downloadButton = parcelData && <DownloadButton data={parcelData} />;

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
      {downloadButton}
      {deleteParcelDialog}
    </div>
  );
};
