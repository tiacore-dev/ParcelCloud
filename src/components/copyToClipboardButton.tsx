import * as React from "react";
import { Button } from "antd";
import { CopyOutlined } from "@ant-design/icons";

interface ICopyToClipboardButtonProps {
  text: string;
  className?: string;
}

export const CopyToClipboardButton = ({
  text,
  className = "without-border",
}: ICopyToClipboardButtonProps) => (
  <Button
    className={className}
    icon={<CopyOutlined />}
    onClick={() => {
      navigator.clipboard.writeText(text);
    }}
  />
);
