import React from "react";
import { ActionDialog } from "./ActionDialog";
import { CopyTwoTone } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { CreateParcel } from "../../pages/createParcel/createParcel";
import { IParcel } from "../../interfaces/parcels/IParcel";
import { IState } from "../../store/modules";
import { CreateParcelDto } from "../../pages/createParcel/dto/createParcel.dto";
import { authToken } from "../useAuth";
import { createParcel } from "../ApiActions/parcel";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

interface IReceiveParcelDialogProps {
  parcel: IParcel;
  iconOnly?: boolean;
}

export const CopyParcelDialog = (props: IReceiveParcelDialogProps) => {
  const dispatch = useDispatch();
  const editableParcelData = useSelector(
    (state: IState) => state.editableEntities.editableParcel,
  );
  const [messageApi, contextHolder] = message.useMessage();
  const params: CreateParcelDto = {
    ...editableParcelData,
    authToken: authToken(),
  };
  const { parcel, iconOnly = false } = props;
  const navigate = useNavigate();
  const onError = (err: string) => {
    messageApi.open({
      type: "error",
      content: err,
    });
  };
  const handleCopyParcel = () => {
    createParcel(dispatch, navigate, params, onError);
  };

  return (
    <>
      {contextHolder}
      <ActionDialog
        modalOkText="Сохранить накладную"
        modalOkLoading={editableParcelData.sent}
        onConfirm={handleCopyParcel}
        buttonText={iconOnly ? "" : "Копировать"}
        buttonIcon={<CopyTwoTone twoToneColor="#ff1616" />}
        modalText={<CreateParcel parcel={parcel} hideSaveButton copy />}
        width="90%"
      />
    </>
  );
};
