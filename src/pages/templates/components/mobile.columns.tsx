import * as React from "react";
import { ColumnsType } from "antd/es/table";
import { ITemplate } from "../../../interfaces/templates/ITemplate";
import { Card } from "antd";

export const templatesMobileColumns: ColumnsType<ITemplate> = [
  {
    key: "mobileData",
    render: (text: string, record: ITemplate) => (
      <Card
        size="small"
        title={record.name}
        headStyle={{ backgroundColor: "#F8F8F8" }}
      >
        <div>{record.city}</div>
        <div>{record.address}</div>
        <div>{record.person}</div>
        <div>{record.company}</div>
        <div>{record.phone}</div>
        <div>{record.addInfo}</div>
      </Card>
    ),
  },
];
