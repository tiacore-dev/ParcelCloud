import { Button, Modal } from "antd";
import * as React from "react";
import { IParcel } from "../../../interfaces/parcels/IParcel";
import { ParcelPrint } from "../../../utils/parcelPrint/printTemplates";
import { useReactToPrint } from "react-to-print";
import { isMobile } from "../../../utils/isMobile";
import { PrinterTwoTone } from "@ant-design/icons";

interface IPrintModalProps {
  data: IParcel;
}

export const PrintModal = (props: IPrintModalProps) => {
  const { data } = props;
  const componentRef = React.useRef();
  const [open, setOpen] = React.useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      {!isMobile() && (
        <Button
          className="parcel__actions__button"
          icon={<PrinterTwoTone twoToneColor="#ff1616" />}
          onClick={showModal}
        ></Button>
      )}
      <Modal
        open={open}
        title={data.number}
        width={"210mm"}
        onOk={handlePrint}
        onCancel={handleClose}
        footer={[
          <Button key="back" onClick={handleClose}>
            Отмена
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              handleClose();
              handlePrint();
            }}
          >
            Печать
          </Button>,
        ]}
      >
        <ParcelPrint data={data} ref={componentRef} />
      </Modal>
    </>
  );
};
