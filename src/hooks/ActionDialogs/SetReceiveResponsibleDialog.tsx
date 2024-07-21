import React from "react";
import { ActionDialog } from "./ActionDialog";
import { CheckCircleTwoTone, UserOutlined } from "@ant-design/icons";
import { Select, Space } from "antd";
import { selectFilterHandler } from "../../utils/selectFilterHandler";
import { getResponsible } from "../../store/modules/dictionaries/selectors/responsible.selector";
import { useSelector } from "react-redux";

interface ISetReceiveResponsibleDialogProps {
  parcelId?: string;
  parcelNumber?: string;
  iconOnly?: boolean;
  buttonType?: "link" | "primary" | "text" | "default" | "dashed";
  onReceive: (number: string) => void;
}

export const SetReceiveResponsibleDialog = (
  props: ISetReceiveResponsibleDialogProps,
) => {
  const {
    onReceive,
    parcelNumber,
    iconOnly = false,
    buttonType = "primary",
  } = props;

  const [responsibleId, setResponsibleId] =
    React.useState<string>(parcelNumber);

  const responsibleList = useSelector(getResponsible);

  const responsibleSelectOptions = responsibleList.map((responsible) => ({
    label: responsible.name,
    value: responsible.id,
  }));

  const responsible = responsibleList.find((r) => r.id === responsibleId);

  return (
    <ActionDialog
      // onConfirm={() => onReceive(parcelNumber)}
      buttonText={iconOnly ? "" : "Назначить курьера"}
      buttonType={buttonType}
      buttonIcon={<UserOutlined style={{ color: "#ff1616" }} />}
      modalTitle={`Назначение курьера на забор накладной ${parcelNumber}`}
      footerDisable={!responsible}
      modalText={
        <div>
          <Space>
            Назначенный курьер:
            <Select
              value={responsibleId}
              showSearch
              optionFilterProp="children"
              onChange={(value: string) => setResponsibleId(value)}
              filterOption={selectFilterHandler}
              options={responsibleSelectOptions}
            />
          </Space>
          {responsible && (
            <p>
              {`Подтверждате, что накладная ${parcelNumber} Назначена на куреьра ${responsible.name}`}
            </p>
          )}
        </div>
      }
    />
  );
};
