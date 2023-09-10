import React, { useState } from "react";
import { Button, Modal } from "antd";

interface IActionDialogProps {
  buttonText?: string;
  buttonType?: "link" | "text" | "primary" | "default" | "dashed";
  buttonIcon?: React.JSX.Element;
  buttonClassName?: string;

  modalTitle?: string;
  modalText?: React.JSX.Element;

  width?: string;

  onConfirm: () => void;
}

export const ActionDialog = (props: IActionDialogProps) => {
  const {
    buttonText,
    buttonType,
    buttonIcon,
    buttonClassName,
    modalTitle,
    modalText,
    width,
    onConfirm,
  } = props;
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);

    void onConfirm();

    setOpen(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const button = (
    <Button
      type={buttonType}
      onClick={showModal}
      icon={buttonIcon}
      className={buttonClassName}
    >
      {buttonText}
    </Button>
  );

  return (
    <>
      {button}
      <Modal
        width={width}
        title={modalTitle}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {modalText}
      </Modal>
    </>
  );
};
