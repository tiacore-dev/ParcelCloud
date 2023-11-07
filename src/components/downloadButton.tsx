import * as React from "react";
import { Button } from "antd";
import { FileExcelTwoTone } from "@ant-design/icons";
import { CSVLink } from "react-csv";
import { LabelKeyObject } from "react-csv/lib/core";

interface IDownloadButtonProps {
  data: object[];
  headers: LabelKeyObject[];
  filename?: string;
}

export const DownloadButton = ({
  data,
  headers,
  filename,
}: IDownloadButtonProps) => (
  <Button
    className="parcels_filters_right-button"
    icon={<FileExcelTwoTone twoToneColor="#ff1616" />}
  >
    <CSVLink data={data} headers={headers} filename={filename}>
      Скачать
    </CSVLink>
  </Button>
);
