import React from "react";
import { ActionDialog } from "./ActionDialog";
import { EditTwoTone } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { EditParcelDto, editParcel } from "../ApiActions/parcel";
import { authToken } from "../useAuth";
import { CreateParcel } from "../../pages/createParcel/createParcel";
import { IParcel } from "../../interfaces/parcels/IParcel";
import { IState } from "../../store/modules";

interface IReceiveParcelDialogProps {
  parcel: IParcel;
  editItemsOnly: boolean;
  iconOnly?: boolean;
}

export const EditParcelDialog = (props: IReceiveParcelDialogProps) => {
  const { parcel, iconOnly = false, editItemsOnly } = props;
  const dispatch = useDispatch();

  const editableParcelData = useSelector(
    (state: IState) => state.editableEntities.editableParcel,
  );

  const params: EditParcelDto = {
    authToken: authToken(),
    id: parcel.id,
  };

  type editableField =
    | "customer"
    | "sendCity"
    | "sendPerson"
    | "sendAddress"
    | "sendCompany"
    | "sendAddInfo"
    | "sendPhone"
    | "recCity"
    | "recPerson"
    | "recAddress"
    | "recCompany"
    | "recAddInfo"
    | "recPhone"
    | "qt"
    | "weight"
    | "volume"
    | "priceId"
    | "cost"
    | "insureValue"
    | "COD"
    | "payType"
    | "delType"
    | "tMax"
    | "tMin"
    | "containerRent";

  const fields: editableField[] = [
    "customer",
    "sendCity",
    "sendPerson",
    "sendAddress",
    "sendCompany",
    "sendAddInfo",
    "sendPhone",
    "recCity",
    "recPerson",
    "recAddress",
    "recCompany",
    "recAddInfo",
    "recPhone",
    "qt",
    "weight",
    "volume",
    "priceId",
    "cost",
    "insureValue",
    "COD",
    "payType",
    "delType",
    "tMax",
    "tMin",
    "containerRent",
  ];

  React.useEffect(() => {
    fields.forEach((field: editableField) => {
      if (parcel[field] !== editableParcelData[field]) {
        // @ts-ignore
        params[field] = editableParcelData[field];
      }
    });

    if (
      JSON.stringify(parcel.items) !== JSON.stringify(editableParcelData.items)
    ) {
      params.items = editableParcelData.items;
    }
  }, [editableParcelData]);

  console.log(params);
  const receiveParcel = () => {
    editParcel(dispatch, params);
  };
  return (
    <ActionDialog
      onConfirm={receiveParcel}
      buttonText={iconOnly ? "" : "Редактировать"}
      buttonIcon={<EditTwoTone />}
      modalText={
        <CreateParcel
          parcel={parcel}
          hideSaveButton
          hideTemplates
          showItemsOnly={editItemsOnly}
        />
      }
      width="90%"
    />
  );
};