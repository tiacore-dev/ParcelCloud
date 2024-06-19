import * as React from "react";
import { Button } from "antd";
import { FileExcelTwoTone } from "@ant-design/icons";
import { CSVLink } from "react-csv";
import { LabelKeyObject } from "react-csv/lib/core";

interface IDownloadButtonProps {
  data: object[];
  headers: LabelKeyObject[];
  filename?: string;
  className?: string;
}

export const DownloadButton = ({
  data,
  headers,
  filename,
  className = "parcels_filters_right-button",
}: IDownloadButtonProps) => (
  <Button
    size="large"
    className={className}
    icon={<FileExcelTwoTone twoToneColor="#ff1616" />}
  >
    <CSVLink data={data} headers={headers} filename={filename} separator=";">
      Скачать
    </CSVLink>
  </Button>
);
