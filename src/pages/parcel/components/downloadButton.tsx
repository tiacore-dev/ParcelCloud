import { Button, Modal } from "antd";
import * as React from "react";
import { IParcel } from "../../../interfaces/parcels/IParcel";
import { ParcelPrint } from "../../../utils/parcelPrint/printTemplates";
import { DownloadOutlined } from "@ant-design/icons";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface IDownloadButtonProps {
  data: IParcel;
}

export const DownloadButton = (props: IDownloadButtonProps) => {
  const { data } = props;
  const componentRef = React.useRef();
  const [open, setOpen] = React.useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const dowload = async () => {
    const element = componentRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pageWidth = 535;
    const pageHeight = 782;

    const elementWidth = canvas.width;
    const elementHeight = canvas.height;

    const ratio = Math.min(
      pageWidth / elementWidth,
      pageHeight / elementHeight,
      1,
    );

    const canvasWidth = elementWidth * ratio;
    const canvasHeight = elementHeight * ratio;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });
    pdf.addImage(imgData, "PNG", 30, 30, canvasWidth, canvasHeight);
    pdf.save(`${data.number}.pdf`);
  };

  return (
    <>
      <Button
        className="parcel__actions__button"
        size="large"
        icon={<DownloadOutlined style={{ color: "#ff1616" }} />}
        onClick={showModal}
      ></Button>
      <Modal
        open={open}
        title={data.number}
        styles={{ content: { width: "210mm" } }}
        onOk={dowload}
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
              dowload();
            }}
          >
            Скачать
          </Button>,
        ]}
      >
        <ParcelPrint data={data} ref={componentRef} />
      </Modal>
    </>
  );
};
