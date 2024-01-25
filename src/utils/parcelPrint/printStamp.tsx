import * as React from "react";
import { IParcel } from "../../interfaces/parcels/IParcel";
import "./parcelPrint.less";
import Barcode from "react-barcode";

interface IParcelPrintProps {
  data: IParcel;
}

export const ParcelStampPrint = React.forwardRef(
  (props: IParcelPrintProps, ref: React.ForwardedRef<undefined>) => {
    const { data } = props;

    const table = (itemNumber: number) => (
      <table className="stamptable">
        <tr>
          <td style={{ width: "40%" }}></td>
          <td style={{ width: "20%" }}></td>
          <td style={{ width: "40%" }}></td>
        </tr>

        <tr>
          <td className="stampheader" colSpan={3}>
            {data.recCity}
          </td>
        </tr>

        <tr>
          <td className="stamptd">{itemNumber + 1}</td>
          <td className="stamptd">/</td>
          <td className="stamptd">{data.qt}</td>
        </tr>

        <tr>
          <td className="qrcodeelement" colSpan={3}>
            <div className="barcode">
              <Barcode
                value={data.number}
                format="CODE39"
                width={1}
                height={40}
              />
            </div>
          </td>
        </tr>
      </table>
    );

    const stamp: React.JSX.Element[] = [];

    for (let index = 0; index < data.qt; index++) {
      stamp.push(table(index));
    }

    return (
      <>
        <div className="stamp_wrapper" ref={ref}>
          {stamp}
        </div>
      </>
    );
  },
);
