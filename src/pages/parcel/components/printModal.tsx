import { Button, Modal } from "antd";
import * as React from "react";
import { IParcel } from "../../../interfaces/parcels/IParcel";
import { ParcelPrint } from "../../../utils/parcelPrint/printTemplates";
import { useReactToPrint } from "react-to-print";
import { isMobile } from "../../../utils/isMobile";
import { PrinterTwoTone } from "@ant-design/icons";
import { checkPermission } from "../../../hooks/useAuth";

interface IPrintModalProps {
  data: IParcel;
}

export const PrintModal = (props: IPrintModalProps) => {
  const doublePrint = checkPermission("print_4_parcels");
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
          size="large"
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
          <Button size="large" key="back" onClick={handleClose}>
            Отмена
          </Button>,
          <Button
            size="large"
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
        <ParcelPrint doublePrint={doublePrint} data={data} ref={componentRef} />
      </Modal>
    </>
  );
};
