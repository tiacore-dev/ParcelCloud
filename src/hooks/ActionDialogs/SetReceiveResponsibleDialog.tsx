import React from "react";
import { ActionDialog } from "./ActionDialog";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { Select, Space } from "antd";
import { selectFilterHandler } from "../../utils/selectFilterHandler";

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

  const [responsible, setResponsible] = React.useState<string>(parcelNumber);

  const responsibleSelectOptions = cities.map((city) => ({
    label: city,
    value: city,
  }));

  return (
    <ActionDialog
      onConfirm={() => onReceive(number)}
      buttonText={iconOnly ? "" : "Получено"}
      buttonType={buttonType}
      buttonIcon={<CheckCircleTwoTone twoToneColor="#ff1616" />}
      modalTitle={`Подтверждение получения ${parcelNumber}`}
      modalText={
        <div>
          <Space>
            Назначенный курьер:
            <Select
              value={responsible}
              showSearch
              optionFilterProp="children"
              onChange={(value: string) => setResponsible(value)}
              filterOption={selectFilterHandler}
              options={responsibleSelectOptions}
            />
          </Space>

          <p>Подтверждате, что накладная {number} Назначена на куреьра </p>
        </div>
      }
    />
  );
};
