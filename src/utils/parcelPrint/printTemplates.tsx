import * as React from "react";
import { IParcel } from "../../interfaces/parcels/IParcel";
import "./parcelPrint.less";
import logo from "./static/logo.png";
import QRCode from "qrcode.react";
import Barcode from "react-barcode";

interface IParcelPrintProps {
  data: IParcel;
}

export const ParcelPrint = React.forwardRef(
  (props: IParcelPrintProps, ref: React.ForwardedRef<undefined>) => {
    const { data } = props;

    let temperature: string;

    if (data && (data.tMax !== 0 || data.tMin !== 0)) {
      temperature = `${data.tMin > 0 && "+"}${data.tMin} ${
        data.tMax > 0 && "+"
      }${data.tMax}`;
    } else {
      temperature = "Отсутствует";
    }

    const table = (
      <table className="parceltable">
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
        <tr>
          <td colSpan={3} rowSpan={2}>
            <QRCode value={data.number} size={64} />
          </td>
          <td rowSpan={2} className="parceltdcontact">
            <p className="p_contact">+7 (383) 212-41-97</p>
            <p className="p_contact">+7 (383) 212-41-98</p>
            <p className="p_contact">www.svs-logistik.ru/</p>
          </td>
          <td className="parcel_logo" colSpan={2} rowSpan={2}>
            <img src={logo} />
          </td>

          <td
            className="qrcodeelement"
            id="placeHolder"
            colSpan={2}
            rowSpan={2}
          >
            <div className="barcode">
              <Barcode
                value={data.number}
                format="CODE39"
                width={1}
                height={30}
              />
            </div>
          </td>
        </tr>
        <tr>
          {/* <!-- <td className="parceltd" colSpan={2}>Номер заказа:</td> --> */}
        </tr>
        <tr>
          <td className="parcelth" colSpan={4}>
            1. ОТ КОГО (ОТПРАВИТЕЛЬ)
          </td>
          <td className="parcelth" colSpan={2}>
            4. СТРАХОВАНИЕ ОТПРАВЛЕНИЯ
          </td>
          <td className="parcelth" colSpan={2}>
            5. СРОЧНОСТЬ{" "}
          </td>
        </tr>
        <tr>
          <td className="parceltd"> Название организации </td>
          <td className="parceltd" colSpan={3}>
            {data.sendCompany}
          </td>
          <td className="parceltd">Страховая сумма</td>
          <td className="parceltd">{data.insureValue}</td>
          <td className="parceltd size10pt" colSpan={2} rowSpan={2}>
            <b>{data.delType}</b>
          </td>
        </tr>
        <tr>
          <td className="parceltd">ФИО Отправителя</td>
          <td className="parceltd" colSpan={3}>
            {data.sendPerson}
          </td>
          <td className="parceltd">Страховой взнос</td>
          <td className="parceltd"></td>
        </tr>
        <tr>
          <td className="parceltd">Город</td>
          <td className="parceltd" colSpan={3}>
            {data.sendCity}
          </td>
          <td className="parcelth" colSpan={4}>
            7. ДОПОЛНИТЕЛЬНЫЕ УСЛУГИ
          </td>
        </tr>
        <tr>
          <td className="parceltd">Адрес</td>
          <td className="parceltd" colSpan={3}>
            {data.sendAddress}
          </td>
          <td className="parceltd">Терморежим</td>
          <td className="parceltd parcel_check">{temperature}</td>
          <td className="parceltd">Опасный груз</td>
          <td className="parceltd parcel_check">{}</td>
        </tr>
        <tr>
          <td className="parceltd">Телефон</td>
          <td className="parceltd" colSpan={3}>
            {data.sendPhone}
          </td>
          <td className="parceltd">Скан накладной</td>
          <td className="parceltd parcel_check">{}</td>
          <td className="parceltd">Возврат подписанных</td>
          <td className="parceltd parcel_check">{}</td>
        </tr>
        <tr>
          <td className="parceltd">Примечание</td>
          <td className="parceltd" colSpan={3}>
            {data.sendAddInfo}
          </td>
          <td className="parcelth" colSpan={2}>
            СВЕДЕНИЯ ОБ ОПЛАТЕ
          </td>
          <td className="parcelth" colSpan={2}>
            СТОИМОСТЬ ДОСТАВКИ
          </td>
        </tr>
        <tr>
          <td className="parcelth" colSpan={4}>
            2. КОМУ (ПОЛУЧАТЕЛЬ)
          </td>
          <td className="parceltd" colSpan={2}>
            <b>{data.payType}</b>
          </td>
          <td className="parceltd" colSpan={2}>
            {data.cost}
          </td>
        </tr>
        <tr>
          <td className="parceltd">Название организации</td>
          <td className="parceltd" colSpan={3}>
            {data.recCompany}
          </td>
          <td className="parcelth" colSpan={4}>
            8. ПРИМЕЧАНИЕ
          </td>
        </tr>
        <tr>
          <td className="parceltd">ФИО Получателя</td>
          <td className="parceltd" colSpan={3}>
            {data.recPerson}
          </td>
          <td className="parceltd" colSpan={4}></td>
        </tr>
        <tr>
          <td className="parceltd">Город</td>
          <td className="parceltd" colSpan={3}>
            {data.recCity}
          </td>
          <td className="parceltd" colSpan={4}></td>
        </tr>
        <tr>
          <td className="parceltd">Адрес</td>
          <td className="parceltd" colSpan={3}>
            {data.recAddress}
          </td>
          <td className="parceltd" colSpan={4}></td>
        </tr>
        <tr>
          <td className="parceltd">Телефон</td>
          <td className="parceltd" colSpan={3}>
            {data.recPhone}
          </td>
          <td className="parcelth" colSpan={4}>
            9. ПРИЕМ ОТПРАВЛЕНИЯ
          </td>
        </tr>
        <tr>
          <td className="parceltd">Примечание</td>
          <td className="parceltd" colSpan={3}>
            {data.recAddInfo}
          </td>
          <td className="parceltd" colSpan={2}>
            Дата _____._____ 20_____г.
          </td>
          <td className="parceltd" colSpan={2}>
            Время _______:_______
          </td>
        </tr>
        <tr>
          <td className="parcelth" colSpan={4}>
            3. ОПИСАНИЕ ВЛОЖИМОГО
          </td>
          <td className="parceltd" colSpan={2}>
            ФИО Сотрудника
          </td>
          <td className="parceltd" colSpan={2}>
            Подпись Сотрудника
          </td>
        </tr>
        {!data.description ? (
          <tr>
            {/* <% if(data.parcelInfo == "") {%> */}
            <td className="parceltd">Общее описание</td>
            <td className="parceltd">Кол-во мест</td>
            <td className="parceltd">Вес (кг)</td>
            <td className="parceltd">Габариты (см)</td>
            {/* <%} else {%>
        <td className="parceltd" colSpan={4} rowSpan={5}>{data.parcelInfo}</td>
        <%}%>
        <!-- <td className="parceltd">Общее описание</td>
        <td className="parceltd">Кол-во мест</td>
        <td className="parceltd">Вес (кг)</td>
        <td className="parceltd">Габариты (см)</td> --> */}
            <td className="parcelth" colSpan={4}>
              10. ИНФОРМАЦИЯ О ВРУЧЕНИИ ОТПРАВЛЕНИЯ
            </td>
          </tr>
        ) : (
          <tr>
            <td className="parceltd" colSpan={4} rowSpan={5}>
              {data.description}
            </td>
            <td className="parcelth" colSpan={4}>
              10. ИНФОРМАЦИЯ О ВРУЧЕНИИ ОТПРАВЛЕНИЯ
            </td>
          </tr>
        )}
        <tr>
          {/* <% if(data.parcelInfo == "") {%> */}
          {!data.description && <td className="parceltd"></td>}
          {!data.description && <td className="parceltd"></td>}
          {!data.description && <td className="parceltd"></td>}
          {!data.description && <td className="parceltd"></td>}
          {/* <%}%> */}
          <td className="parceltd" colSpan={2}>
            Дата _____._____ 20_____г.
          </td>
          <td className="parceltd" colSpan={2}>
            Время _______:_______
          </td>
        </tr>
        <tr>
          {/* <% if(data.parcelInfo == "") {%> */}
          {!data.description && <td className="parceltd"></td>}
          {!data.description && <td className="parceltd"></td>}
          {!data.description && <td className="parceltd"></td>}
          {!data.description && <td className="parceltd"></td>}
          {/* <%}%> */}
          <td
            className="parceltd"
            colSpan={4}
            rowSpan={2}
            style={{ verticalAlign: "top" }}
          >
            ФИО Получателя
          </td>
        </tr>
        <tr>
          {/* <% if(data.parcelInfo == "") {%> */}
          {!data.description && <td className="parceltd"></td>}
          {!data.description && <td className="parceltd"></td>}
          {!data.description && <td className="parceltd"></td>}
          {!data.description && <td className="parceltd"></td>}
          {/* <%}%> */}
        </tr>
        <tr>
          {/* <% if(data.parcelInfo == "") {%> */}
          {!data.description && <td className="parceltd"></td>}
          {!data.description && <td className="parceltd"></td>}
          {!data.description && <td className="parceltd"></td>}
          {!data.description && <td className="parceltd"></td>}
          {/* <%}%> */}
          <td className="parceltd" colSpan={2}>
            Подпись Получателя
          </td>
          <td className="parceltd" colSpan={2}>
            Должность
          </td>
        </tr>
        <tr>
          <td className="parceltd"></td>

          <td className="parceltd">Всего {data.qt}</td>
          <td className="parceltd">Всего {data.weight}</td>
          <td className="parceltd">Объемный вес {data.volume}</td>
          <td className="parceltd" colSpan={4}>
            ФИО Сотрудника Исполнителя
          </td>
        </tr>
      </table>
    );
    return (
      <>
        <div className="parcel_wrapper" ref={ref}>
          {table}
          {table}
          <p className="parcel_data">
            {" "}
            Я подтверждаю, что отправления не содержат предметы, запрещенные к
            пересылке. С условиями пересылки согласен. С регламентом компании
            ознакомлен. Подпись отправителя:
          </p>
        </div>
      </>
    );
  },
);
