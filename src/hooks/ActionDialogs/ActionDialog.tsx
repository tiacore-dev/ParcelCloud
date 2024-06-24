import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";

interface IActionDialogProps {
  buttonText?: string;
  buttonType?: "link" | "text" | "primary" | "default" | "dashed";
  buttonIcon?: React.JSX.Element;
  buttonClassName?: string;

  modalTitle?: string;
  modalText?: React.JSX.Element;
  modalOkText?: string;
  modalOkLoading?: boolean;

  footerDisable?: boolean;

  width?: string;
  onOpen?: () => void;
  onConfirm?: () => void;
}

export const ActionDialog = (props: IActionDialogProps) => {
  const {
    buttonText,
    buttonType,
    buttonIcon,
    buttonClassName,
    modalTitle,
    modalText,
    modalOkLoading,
    modalOkText,
    footerDisable,
    width,
    onOpen,
    onConfirm,
  } = props;
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    if (open && onOpen) {
      onOpen();
    }
  }, [open]);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    if (onConfirm) {
      void onConfirm();
    }

    setOpen(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const button = (
    <Button
      size="large"
      type={buttonType}
      onClick={showModal}
      icon={buttonIcon}
      className={buttonClassName}
    >
      {buttonText}
    </Button>
  );

  const footer = footerDisable
    ? null
    : [
        <Button size="large" key="back" onClick={handleCancel}>
          Отмена
        </Button>,
        <Button
          size="large"
          key="submit"
          type="primary"
          loading={modalOkLoading}
          onClick={handleOk}
        >
          {modalOkText ?? "Ок"}
        </Button>,
      ];

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
        footer={footer}
      >
        {modalText}
      </Modal>
    </>
  );
};
