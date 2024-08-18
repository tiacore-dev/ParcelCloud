import * as React from "react";
import { IParcel } from "../../interfaces/parcels/IParcel";
import { parcelTable } from "./parcelTable";

interface IParcelPrintProps {
  data: IParcel;
  doublePrint?: boolean;
}

export const ParcelPrint = React.forwardRef(
  (props: IParcelPrintProps, ref: React.ForwardedRef<undefined>) => {
    const { data, doublePrint } = props;

    let temperature: string;

    if (data && (data.tMax !== 0 || data.tMin !== 0)) {
      temperature = `${data.tMin > 0 && "+"}${data.tMin} ${
        data.tMax > 0 && "+"
      }${data.tMax}`;
    } else {
      temperature = "Отсутствует";
    }

    const pod = data.status
      ? data.history.find((el) => el.type === "Доставлено")
      : undefined;

    const table = parcelTable({data, temperature, pod})

    const page = (
      <div className="parcel_wrapper">
        {table}
        <div className="parcel_data">
          {" "}
          Я подтверждаю, что отправления не содержат предметы, запрещенные к
          пересылке.
        </div>
        <div className="parcel_data">
          С условиями пересылки согласен. С регламентом компании ознакомлен.
          Подпись отправителя:
        </div>

        <p> </p>
        {table}
        <div className="parcel_data">
          {" "}
          Я подтверждаю, что отправления не содержат предметы, запрещенные к
          пересылке.
        </div>
        <div className="parcel_data">
          С условиями пересылки согласен. С регламентом компании ознакомлен.
          Подпись отправителя:
        </div>
      </div>
    );
    return (
      <div ref={ref}>
        {page}
        {doublePrint && page}
      </div>
    );
  },
);
