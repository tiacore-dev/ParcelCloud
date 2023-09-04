import * as React from "react";
import { IParcelsCovertedData } from "./parcels";
import { dateToLocalString } from "../../utils/dateConverter";
import { IParcelsList } from "../../interfaces/parcels/IParcelsList";

export const convertParcelsData = (
  data: IParcelsList[],
): IParcelsCovertedData[] => {
  if (!data) {
    return [];
  }

  return data.map((parcel) => {
    const number = (
      <>
        <div>{parcel.number}</div>
        <div>от {dateToLocalString(parcel.date)}</div>
      </>
    );
    const rec = (
      <>
        <div>{parcel.recCity}</div>
        <div>{parcel.recAddress}</div>
        <div style={{ fontWeight: 500 }}>{parcel.recCompany}</div>
      </>
    );
    const send = (
      <>
        <div>{parcel.sendCity}</div>
        <div>{parcel.sendAddress}</div>
        <div style={{ fontWeight: 500 }}>{parcel.sendCompany}</div>
      </>
    );
    const items = (
      <>
        <div>Мест: {parcel.qt}</div>
        <div>Вес: {parcel.weight}</div>
        <div>Об. вес: {parcel.volume}</div>
      </>
    );
    const status = (
      <>
        <div>{parcel.statusType}</div>
        <div>{parcel.statusValue}</div>
        <div>{dateToLocalString(parcel.statusDate)}</div>
      </>
    );

    return {
      key: parcel.id,
      number,
      rec,
      send,
      items,
      status,
    };
  });
};
