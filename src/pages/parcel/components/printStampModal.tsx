import { Button, Modal } from "antd";
import * as React from "react";
import { IParcel } from "../../../interfaces/parcels/IParcel";
import { useReactToPrint } from "react-to-print";
import { isMobile } from "../../../utils/isMobile";
import { AppstoreTwoTone } from "@ant-design/icons";
import { ParcelStampPrint } from "../../../utils/parcelPrint/printStamp";

interface IPrintModalProps {
  data: IParcel;
}

export const PrintStampModal = (props: IPrintModalProps) => {
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
          icon={<AppstoreTwoTone twoToneColor="#ff1616" />}
          onClick={showModal}
        ></Button>
      )}
      <Modal
        open={open}
        title={data.number}
        width={"1000px"}
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
        <ParcelStampPrint data={data} ref={componentRef} />
      </Modal>
    </>
  );
};
