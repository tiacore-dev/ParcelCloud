import * as React from "react";
import { Table } from "antd";
import { IParcelHistory } from "../../interfaces/parcels/IParcel";
import { isMobile } from "../../utils/isMobile";
import { historyMobileColumns } from "./historyMobile.columns";
import { historyDesktopColumns } from "./historyDesktop.columns";

export const History = ({
  historyData,
  bordered = false,
}: {
  historyData: IParcelHistory[];
  bordered?: boolean;
}) => {
  const mobile = isMobile();

  return (
    <Table
      pagination={false}
      bordered={bordered}
      style={{ marginBottom: 12 }}
      dataSource={[...historyData]
        .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
        .map((el: IParcelHistory, index: number) => ({
          ...el,
          key: index,
        }))}
      columns={mobile ? historyMobileColumns : historyDesktopColumns}
    />
  );
};
