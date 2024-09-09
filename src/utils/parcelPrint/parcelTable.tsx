import React from "react";
import QRCode from "qrcode.react";
import Barcode from "react-barcode";
import { IParcel, IParcelHistory } from "../../interfaces/parcels/IParcel";
import logo from "./static/logo.png";
import { dateToLocalString, timeToLocalString } from "../dateConverter";
import "./parcelPrint.less";

interface ICell {
  content: React.ReactNode; // Содержимое ячейки, которое будет рендериться внутри <td>
  colSpan?: number; // Количество столбцов, которые должна занимать ячейка
  rowSpan?: number; // Количество строк, которые должна занимать ячейка (если нужно)
  className?: string;
  style?: React.CSSProperties; // Дополнительные стили для <td>
}

export const parcelTable = ({
  data,
  temperature,
  pod,
}: {
  data: IParcel;
  temperature: string;
  pod: IParcelHistory;
}) => {
  const renderRow = (cells: ICell[]) => (
    <tr>
      {cells.map((cell, index) => (
        <td
          key={index}
          className={cell.className} // Использование className
          colSpan={cell.colSpan || 1}
          rowSpan={cell.rowSpan || 1}
          style={cell.style} // Поддержка инлайн-стилей
        >
          {cell.content}
        </td>
      ))}
    </tr>
  );

  return (
    <table className="parceltable">
      <thead>
        <tr>
          <td style={{ width: "32mm" }}></td>
          <td style={{ width: "17mm" }}></td>
          <td style={{ width: "17mm" }}></td>
          <td style={{ width: "32mm" }}></td>
          <td style={{ width: "25mm" }}></td>
          <td style={{ width: "20mm" }}></td>
          <td style={{ width: "25mm" }}></td>
          <td style={{ width: "20mm" }}></td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowSpan={2}>
            <QRCode value={data.number} size={64} />
          </td>
          <td colSpan={2} rowSpan={2}>
            <div className="parcel_num">{data.number}</div>
          </td>
          <td rowSpan={2} className="parceltdcontact">
            <p className="p_contact">+7 (383) 212-41-97</p>
            <p className="p_contact">+7 (383) 212-41-98</p>
            <p className="p_contact">www.svs-logistik.ru</p>
          </td>
          <td className="parcel_logo" colSpan={2} rowSpan={2}>
            <img src={logo} alt="Logo" />
          </td>
          <td className="qrcodeelement" colSpan={2} rowSpan={2}>
            <div className="barcode">
              <Barcode
                value={data.number}
                format="CODE39"
                width={1}
                height={30}
                displayValue={false}
              />
            </div>
          </td>
        </tr>
        <tr></tr>
        {renderRow([
          {
            content: "ОТ КОГО (ОТПРАВИТЕЛЬ)",
            colSpan: 4,
            className: "parcelth",
          },
          {
            content: "СТРАХОВАНИЕ ОТПРАВЛЕНИЯ",
            colSpan: 2,
            className: "parcelth",
          },
          { content: "СРОЧНОСТЬ", colSpan: 2, className: "parcelth" },
        ])}
        {renderRow([
          { content: "Название организации", className: "parceltd" },
          { content: data.sendCompany, colSpan: 3, className: "parceltd" },
          { content: "Страховая сумма", className: "parceltd" },
          { content: data.insureValue, className: "parceltd" },
          {
            content: <b>{data.delType}</b>,
            colSpan: 2,
            className: "parceltd size10pt",
          },
        ])}
        {renderRow([
          { content: "ФИО Отправителя", className: "parceltd" },
          { content: data.sendPerson, colSpan: 3, className: "parceltd" },
          {
            content: "ДОПОЛНИТЕЛЬНЫЕ УСЛУГИ",
            colSpan: 4,
            className: "parcelth",
          },
        ])}
        {renderRow([
          { content: "Город", className: "parceltd" },
          { content: data.sendCity, colSpan: 3, className: "parceltd" },
          { content: "Терморежим", className: "parceltd" },
          { content: temperature, className: "parceltd" },
          { content: "Аренда ТК", className: "parceltd" },
          { content: data.containerRent ? "Да" : "Нет", className: "parceltd" },
        ])}
        {renderRow([
          { content: "Адрес", className: "parceltd" },
          { content: data.sendAddress, colSpan: 3, className: "parceltd" },
          { content: "СВЕДЕНИЯ ОБ ОПЛАТЕ", colSpan: 2, className: "parcelth" },
          { content: "СТОИМОСТЬ ДОСТАВКИ", colSpan: 2, className: "parcelth" },
        ])}
        {renderRow([
          { content: "Телефон", className: "parceltd" },
          { content: data.sendPhone, colSpan: 3, className: "parceltd" },
          { content: <b>{data.payType}</b>, colSpan: 2, className: "parceltd" },
          { content: data.cost, colSpan: 2, className: "parceltd" },
        ])}
        {renderRow([
          { content: "Примечание", className: "parceltd" },
          { content: data.sendAddInfo, colSpan: 3, className: "parceltd" },
          { content: "ОПИСАНИЕ ВЛОЖИМОГО", colSpan: 4, className: "parcelth" },
        ])}

        {data.description ? (
          <>
            {renderRow([
              {
                content: "2. КОМУ (ПОЛУЧАТЕЛЬ)",
                colSpan: 4,
                className: "parcelth",
              },
              {
                content: data.description,
                colSpan: 4,
                rowSpan: 5,
                className: "parceltd",
              },
            ])}
            {renderRow([
              { content: "Название организации", className: "parceltd" },
              { content: data.recCompany, colSpan: 3, className: "parceltd" },
            ])}
            {renderRow([
              { content: "ФИО Получателя", className: "parceltd" },
              { content: data.recPerson, colSpan: 3, className: "parceltd" },
            ])}
            {renderRow([
              { content: "Город", className: "parceltd" },
              { content: data.recCity, colSpan: 3, className: "parceltd" },
            ])}
            {renderRow([
              { content: "Адрес", className: "parceltd" },
              { content: data.recAddress, colSpan: 3, className: "parceltd" },
            ])}
          </>
        ) : (
          <>
            {renderRow([
              {
                content: "КОМУ (ПОЛУЧАТЕЛЬ)",
                colSpan: 4,
                className: "parcelth",
              },
              { content: "Общее описание", className: "parceltd" },
              { content: "Кол-во мест", className: "parceltd" },
              { content: "Вес (кг)", className: "parceltd" },
              { content: "Габариты (см)", className: "parceltd" },
            ])}
            {renderRow([
              { content: "Название организации", className: "parceltd" },
              { content: data.recCompany, colSpan: 3, className: "parceltd" },
              { content: "", className: "parceltd" },
              { content: "", className: "parceltd" },
              { content: "", className: "parceltd" },
              { content: "", className: "parceltd" },
            ])}
            {renderRow([
              { content: "ФИО Получателя", className: "parceltd" },
              { content: data.recPerson, colSpan: 3, className: "parceltd" },
              { content: "", className: "parceltd" },
              { content: "", className: "parceltd" },
              { content: "", className: "parceltd" },
              { content: "", className: "parceltd" },
            ])}
            {renderRow([
              { content: "Город", className: "parceltd" },
              { content: data.recCity, colSpan: 3, className: "parceltd" },
              { content: "", className: "parceltd" },
              { content: "", className: "parceltd" },
              { content: "", className: "parceltd" },
              { content: "", className: "parceltd" },
            ])}
            {renderRow([
              { content: "Адрес", className: "parceltd" },
              { content: data.recAddress, colSpan: 3, className: "parceltd" },
              { content: "", className: "parceltd" },
              { content: "", className: "parceltd" },
              { content: "", className: "parceltd" },
              { content: "", className: "parceltd" },
            ])}
          </>
        )}

        {renderRow([
          { content: "Телефон", className: "parceltd" },
          { content: data.recPhone, colSpan: 3, className: "parceltd" },
          {
            content: "ПРИЕМ ОТПРАВЛЕНИЯ",
            colSpan: 4,
            className: "parcelth",
          },
        ])}
        {renderRow([
          {
            content: "ИНФОРМАЦИЯ О ДОСТАВКЕ",
            colSpan: 4,
            className: "parcelth",
          },
          // { content: data.recAddInfo, colSpan: 3, className: "parceltd" },
          {
            content: "Дата _____._____ 20_____г.",
            colSpan: 2,
            className: "parceltd",
          },
          {
            content: "Время _______:_______",
            colSpan: 2,
            className: "parceltd",
          },
        ])}

        {renderRow([
          {
            content: data.recAddInfo,
            colSpan: 4,
            rowSpan: 5,
            className: "parceltd",
          },
          { content: "ФИО Сотрудника", colSpan: 2, className: "parceltd" },
          { content: "Подпись Сотрудника", colSpan: 2, className: "parceltd" },
        ])}
        {renderRow([
          {
            content: "ИНФОРМАЦИЯ О ВРУЧЕНИИ ОТПРАВЛЕНИЯ",
            colSpan: 4,
            className: "parcelth",
          },
        ])}
        {renderRow([
          {
            content: pod
              ? `Дата: ${dateToLocalString(pod.date)}`
              : "Дата _____._____ 20_____г.",
            colSpan: 2,
            className: "parceltd",
          },
          {
            content: pod
              ? `Время: ${timeToLocalString(pod.date)}`
              : " Время _______:_______",
            colSpan: 2,
            className: "parceltd",
          },
        ])}

        {renderRow([
          {
            content: `ФИО Получателя ${pod ? `: ${pod.comment}` : ""}`,
            colSpan: 4,
            className: "parceltd",
            style: { verticalAlign: "top", height: "36px" },
          },
        ])}

        {renderRow([
          { content: "Подпись Получателя", colSpan: 2, className: "parceltd" },
          { content: "Должность", colSpan: 2, className: "parceltd" },
        ])}

        {renderRow([
          { content: "", className: "parceltd" },
          { content: `Всего ${data.qt}`, className: "parceltd" },
          { content: `Всего ${data.weight}`, className: "parceltd" },
          { content: `Объемный вес ${data.volume}`, className: "parceltd" },
          {
            content: "ФИО Сотрудника Исполнителя",
            colSpan: 4,
            className: "parceltd",
          },
        ])}
      </tbody>
    </table>
  );
};
